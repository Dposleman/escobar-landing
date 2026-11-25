import { useEffect, useRef } from "react";

/**
 * The Escobar sign, hung from two chains that start at the very top of the page.
 *
 * Physics: a small Verlet simulation. Each chain is a rope of nodes pinned to the ceiling and the sign is a
 * rigid body of four particles, so the sign swings, twists in-plane and settles like a real board on chains.
 * On top of that, yaw (twist around the vertical axis) and pitch (tipping toward/away from you) are two
 * damped springs that are drawn with CSS 3D, so a tap on a corner feels like a real knock.
 *
 * Input:
 *  - mouse: moving across the sign nudges it, click/tap hits it where you touch it, dragging pulls it.
 *  - phones: the accelerometer drives the "gravity" vector, so tilting makes it swing to the low side and
 *    shaking throws it around for real (iOS asks for motion permission the first time the sign is tapped).
 */

type Particle = { x: number; y: number; px: number; py: number; inv: number };

const SIGN_RATIO = 294 / 1500;
const STEP = 1 / 120;
const GRAVITY = 4200; // px/s^2 at rest (about 0.9s period for these chains)
const LINK_LEN = 64; // length of the link sprites, in sprite pixels
const FACE = { w: 50, h: 72 };
const EDGE = { w: 29, h: 72 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function pageOffsetTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

type MotionPermission = { requestPermission?: () => Promise<string> };

export function HangingSign() {
  const hangRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hang = hangRef.current;
    const sign = signRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!hang || !sign || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const face = new Image();
    const edge = new Image();
    face.src = "/assets/branding/chain-link-face.png";
    edge.src = "/assets/branding/chain-link-edge.png";

    // ---- state ------------------------------------------------------------------------------------------
    let signW = 0;
    let signH = 0;
    let canvasW = 0;
    let canvasH = 0;
    let dpr = 1;
    let restX = 0;
    let restY = 0;
    let ax = 0;
    let linkScale = 0.45;
    let particles: Particle[] = []; // sign: 0 TL eye, 1 TR eye, 2 BR, 3 BL
    let ropes: Particle[][] = []; // [left, right]: ceiling anchor ... sign eye
    let ropeRest: number[] = [];

    let yaw = 0;
    let yawVel = 0;
    let pitch = 0;
    let pitchVel = 0;
    let gx = 0;
    let gy = GRAVITY;
    const restGx = 0;
    const restGy = GRAVITY;

    let raf = 0;
    let running = false;
    let visible = true;
    let calmFrames = 0;
    let last = 0;
    let acc = 0;

    let grabbed: { index: number; offX: number; offY: number } | null = null;
    let dragTarget: { x: number; y: number } | null = null;
    let downAt = { x: 0, y: 0, t: 0 };
    let moved = false;
    let lastMove = { x: 0, y: 0, t: 0 };

    // ---- geometry ---------------------------------------------------------------------------------------
    const build = () => {
      const cw = hang.clientWidth;
      if (!cw) return;
      signW = cw;
      signH = cw * SIGN_RATIO;
      const chain = parseFloat(getComputedStyle(hang).paddingTop) || 56;
      const docTop = pageOffsetTop(hang);

      canvasW = Math.min(window.innerWidth, Math.round(cw * 1.5));
      canvasH = Math.round(docTop + chain + signH * 2.4);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.left = `${(cw - canvasW) / 2}px`;
      canvas.style.top = `${-docTop}px`;
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;
      canvas.width = Math.round(canvasW * dpr);
      canvas.height = Math.round(canvasH * dpr);

      linkScale = clamp(cw / 22 / LINK_LEN, 0.3, 0.52) * (LINK_LEN / 64);
      const cx = canvasW / 2;
      restX = cx;
      restY = docTop + chain + signH / 2;
      ax = signW / 2 - signW * 0.06;
      const eyeY = restY - signH / 2 + 6;
      const bottom = restY + signH / 2 - 4;

      const mk = (x: number, y: number, inv: number): Particle => ({ x, y, px: x, py: y, inv });
      particles = [mk(cx - ax, eyeY, 0.25), mk(cx + ax, eyeY, 0.25), mk(cx + ax, bottom, 0.25), mk(cx - ax, bottom, 0.25)];

      const segments = Math.max(5, Math.round(eyeY / 20));
      ropes = [-1, 1].map((side) => {
        const x = cx + side * ax;
        const nodes: Particle[] = [mk(x, 0, 0)];
        for (let i = 1; i < segments; i += 1) nodes.push(mk(x, (eyeY * i) / segments, 1));
        nodes.push(particles[side === -1 ? 0 : 1]);
        return nodes;
      });
      ropeRest = [eyeY / segments, eyeY / segments];

      yaw = yawVel = pitch = pitchVel = 0;
      applyTransform();
    };

    // ---- simulation -------------------------------------------------------------------------------------
    const solve = (a: Particle, b: Particle, len: number, oneSided: boolean) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1e-6;
      if (oneSided && d <= len) return;
      const w = a.inv + b.inv;
      if (!w) return;
      const k = (d - len) / d / w;
      a.x += dx * k * a.inv;
      a.y += dy * k * a.inv;
      b.x -= dx * k * b.inv;
      b.y -= dy * k * b.inv;
    };

    const integrate = (p: Particle, damp: number) => {
      if (!p.inv) return;
      let vx = (p.x - p.px) * damp;
      let vy = (p.y - p.py) * damp;
      const sp = Math.hypot(vx, vy);
      if (sp > 40) {
        vx = (vx / sp) * 40;
        vy = (vy / sp) * 40;
      }
      p.px = p.x;
      p.py = p.y;
      p.x += vx + gx * STEP * STEP;
      p.y += vy + gy * STEP * STEP;
    };

    const step = () => {
      for (const p of particles) integrate(p, 0.9986);
      for (const rope of ropes) for (let i = 1; i < rope.length - 1; i += 1) integrate(rope[i], 0.9972);

      // 3D springs: twist (yaw) and tip (pitch) with their own damping
      yawVel += (-21 * yaw - 1.5 * yawVel) * STEP;
      yaw += yawVel * STEP;
      pitchVel += (-27 * pitch - 1.7 * pitchVel) * STEP;
      pitch += pitchVel * STEP;
      yaw = clamp(yaw, -0.75, 0.75);
      pitch = clamp(pitch, -0.6, 0.6);

      const w = 2 * ax * Math.cos(yaw);
      const h = signH - 10;
      const diag = Math.hypot(w, h);

      for (let it = 0; it < 14; it += 1) {
        if (grabbed && dragTarget) {
          const p = particles[grabbed.index];
          const tx = dragTarget.x - grabbed.offX;
          const ty = dragTarget.y - grabbed.offY;
          p.x += (tx - p.x) * 0.3;
          p.y += (ty - p.y) * 0.3;
        }
        ropes.forEach((rope, r) => {
          for (let i = 0; i < rope.length - 1; i += 1) solve(rope[i], rope[i + 1], ropeRest[r], true);
        });
        solve(particles[0], particles[1], w, false);
        solve(particles[3], particles[2], w, false);
        solve(particles[0], particles[3], h, false);
        solve(particles[1], particles[2], h, false);
        solve(particles[0], particles[2], diag, false);
        solve(particles[1], particles[3], diag, false);
      }
    };

    // ---- drawing ----------------------------------------------------------------------------------------
    const pose = () => {
      const cx = (particles[0].x + particles[1].x + particles[2].x + particles[3].x) / 4;
      const cy = (particles[0].y + particles[1].y + particles[2].y + particles[3].y) / 4;
      const angle = Math.atan2(particles[1].y - particles[0].y, particles[1].x - particles[0].x);
      return { cx, cy, angle };
    };

    function applyTransform() {
      if (!particles.length) return;
      const { cx, cy, angle } = pose();
      // the rest centre of the image sits 2px above the particle mean (eyes are inset from the top edge)
      sign.style.transform =
        `perspective(1100px) translate(${(cx - restX).toFixed(2)}px, ${(cy - restY - 2).toFixed(2)}px) ` +
        `rotate(${angle.toFixed(4)}rad) rotateY(${yaw.toFixed(4)}rad) rotateX(${pitch.toFixed(4)}rad)`;
    }

    const drawChain = (nodes: Particle[]) => {
      const pts = nodes.map((n) => ({ x: n.x, y: n.y }));
      const cum = [0];
      for (let i = 1; i < pts.length; i += 1) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
      const total = cum[cum.length - 1];
      const linkLen = LINK_LEN * linkScale;
      const count = Math.max(2, Math.round(total / (linkLen * 0.62)));
      let seg = 0;
      for (let i = 0; i < count; i += 1) {
        const s = ((i + 0.5) / count) * total;
        while (seg < cum.length - 2 && cum[seg + 1] < s) seg += 1;
        const span = cum[seg + 1] - cum[seg] || 1;
        const t = (s - cum[seg]) / span;
        const x = pts[seg].x + (pts[seg + 1].x - pts[seg].x) * t;
        const y = pts[seg].y + (pts[seg + 1].y - pts[seg].y) * t;
        const theta = Math.atan2(-(pts[seg + 1].x - pts[seg].x), pts[seg + 1].y - pts[seg].y);
        const isFace = i % 2 === 0;
        const img = isFace ? face : edge;
        const dim = isFace ? FACE : EDGE;
        if (!img.complete || !img.naturalWidth) continue;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(theta);
        ctx.drawImage(img, (-dim.w * linkScale) / 2, (-dim.h * linkScale) / 2, dim.w * linkScale, dim.h * linkScale);
        ctx.restore();
      }
    };

    const drawBolt = (x: number, y: number, r: number) => {
      const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
      g.addColorStop(0, "#c9b8a6");
      g.addColorStop(0.55, "#6c5546");
      g.addColorStop(1, "#1c120d");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      ctx.stroke();
    };

    const drawPlate = (x: number) => {
      const w = 34;
      const h = 14;
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#7d6a5b");
      g.addColorStop(0.5, "#3c2b21");
      g.addColorStop(1, "#1a110c");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect(x - w / 2, 0, w, h, 3);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.75)";
      ctx.stroke();
      drawBolt(x - 10, 7, 2.6);
      drawBolt(x + 10, 7, 2.6);
    };

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvasW, canvasH);
      for (const rope of ropes) {
        drawChain(rope);
        drawPlate(rope[0].x);
        const eye = rope[rope.length - 1];
        drawBolt(eye.x, eye.y, 4.6);
      }
      applyTransform();
    };

    // ---- loop -------------------------------------------------------------------------------------------
    const energy = () => {
      let e = 0;
      for (const p of particles) e += Math.abs(p.x - p.px) + Math.abs(p.y - p.py);
      return e + Math.abs(yawVel) * 0.5 + Math.abs(pitchVel) * 0.5 + Math.abs(yaw) + Math.abs(pitch);
    };

    const frame = (now: number) => {
      if (!running) return;
      acc += Math.min(0.05, (now - last) / 1000);
      last = now;
      let guard = 0;
      while (acc >= STEP && guard < 8) {
        step();
        acc -= STEP;
        guard += 1;
      }
      render();

      const calm = !grabbed && energy() < 0.06 && Math.abs(gx - restGx) + Math.abs(gy - restGy) < 1;
      calmFrames = calm ? calmFrames + 1 : 0;
      if (calmFrames > 90) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      calmFrames = 0;
      if (reduced || running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      acc = 0;
      raf = requestAnimationFrame(frame);
    };

    // ---- impulses ---------------------------------------------------------------------------------------
    const kick = (x: number, y: number, vx: number, vy: number) => {
      for (const p of particles) {
        const d = Math.hypot(p.x - x, p.y - y);
        const w = 1 / (1 + (d / 130) ** 2);
        p.px -= vx * w * STEP;
        p.py -= vy * w * STEP;
      }
    };

    const canvasPoint = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const localUV = (x: number, y: number) => {
      const { cx, cy, angle } = pose();
      const dx = x - cx;
      const dy = y - cy;
      const c = Math.cos(-angle);
      const s = Math.sin(-angle);
      return {
        u: clamp((dx * c - dy * s) / (signW / 2), -1, 1),
        v: clamp((dx * s + dy * c) / (signH / 2), -1, 1),
      };
    };

    const requestMotion = () => {
      const ctor = window.DeviceMotionEvent as unknown as MotionPermission | undefined;
      if (ctor && typeof ctor.requestPermission === "function" && !motionOn) {
        ctor
          .requestPermission()
          .then((state) => {
            if (state === "granted") startMotion();
          })
          .catch(() => undefined);
      }
    };

    const onDown = (e: PointerEvent) => {
      const p = canvasPoint(e);
      sign.setPointerCapture(e.pointerId);
      downAt = { x: p.x, y: p.y, t: performance.now() };
      moved = false;
      lastMove = { ...downAt };
      let best = 0;
      let bestD = Infinity;
      particles.forEach((q, i) => {
        const d = Math.hypot(q.x - p.x, q.y - p.y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      grabbed = { index: best, offX: p.x - particles[best].x, offY: p.y - particles[best].y };
      dragTarget = null;
      sign.classList.add("is-grabbed");
      wake();
    };

    const onMove = (e: PointerEvent) => {
      const p = canvasPoint(e);
      const now = performance.now();
      if (grabbed) {
        if (!moved && Math.hypot(p.x - downAt.x, p.y - downAt.y) > 6) moved = true;
        if (moved) {
          dragTarget = p;
          // limit how far a hand can pull it
          const q = particles[grabbed.index];
          const d = Math.hypot(p.x - grabbed.offX - q.x, p.y - grabbed.offY - q.y);
          if (d > 260) dragTarget = { x: q.x + ((p.x - q.x) / d) * 260, y: q.y + ((p.y - q.y) / d) * 260 };
        }
      } else if (e.pointerType === "mouse") {
        // sweeping the cursor across the sign pushes it
        const dt = Math.max(1, now - lastMove.t);
        const vx = ((p.x - lastMove.x) / dt) * 1000;
        const vy = ((p.y - lastMove.y) / dt) * 1000;
        const speed = Math.hypot(vx, vy);
        if (speed > 250) {
          const k = clamp(0.1, 0, 1);
          kick(p.x, p.y, clamp(vx * k, -240, 240), clamp(vy * k * 0.5, -120, 120));
          yawVel += clamp(vx / 3000, -0.5, 0.5);
          wake();
        }
      }
      lastMove = { x: p.x, y: p.y, t: now };
    };

    const onUp = (e: PointerEvent) => {
      sign.classList.remove("is-grabbed");
      if (sign.hasPointerCapture(e.pointerId)) sign.releasePointerCapture(e.pointerId);
      const wasTap = grabbed && !moved && performance.now() - downAt.t < 450;
      grabbed = null;
      dragTarget = null;
      if (wasTap) {
        const { u, v } = localUV(downAt.x, downAt.y);
        const centre = 1 - Math.min(1, Math.hypot(u, v * 1.6));
        // a knock: a push away from the side you hit, a twist, and a tip toward/away from you
        kick(downAt.x, downAt.y, -u * 520 + (Math.random() - 0.5) * 60, -v * 230);
        yawVel += u * 2.1 + (Math.random() - 0.5) * 0.2;
        pitchVel += -v * 1.7 - centre * 0.9;
        requestMotion();
      }
      wake();
    };

    const onCancel = () => {
      sign.classList.remove("is-grabbed");
      grabbed = null;
      dragTarget = null;
    };

    // ---- phone motion -----------------------------------------------------------------------------------
    const flip =
      /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    let motionOn = false;
    let lpx = 0;
    let lpy = 0;
    let seeded = false;

    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x == null || a.y == null) return;
      let rx = a.x;
      let ry = a.y;
      if (flip) {
        rx = -rx;
        ry = -ry;
      }
      const angle = (screen.orientation && screen.orientation.angle) || 0;
      let sx: number;
      let sy: number;
      switch (angle) {
        case 90:
          sx = ry;
          sy = rx;
          break;
        case 180:
          sx = rx;
          sy = -ry;
          break;
        case 270:
        case -90:
          sx = -ry;
          sy = -rx;
          break;
        default:
          sx = -rx;
          sy = ry;
      }
      if (!seeded) {
        lpx = sx;
        lpy = sy;
        seeded = true;
      }
      // what is left after removing the slow part is the shake
      lpx += (sx - lpx) * 0.12;
      lpy += (sy - lpy) * 0.12;
      const hx = sx - lpx;
      const hy = sy - lpy;
      if (Math.hypot(hx, hy) > 6) {
        yawVel += clamp(hx * 0.1, -2.4, 2.4);
        pitchVel += clamp(hy * 0.09, -2.2, 2.2);
      }

      const k = GRAVITY / 9.81;
      let nx = sx * k;
      let ny = sy * k;
      const mag = Math.hypot(nx, ny);
      const maxMag = GRAVITY * 4.5;
      if (mag > maxMag) {
        nx = (nx / mag) * maxMag;
        ny = (ny / mag) * maxMag;
      }
      // keep gravity pointing mostly down so the sign never lies on its side when the phone lies flat
      if (ny < GRAVITY * 0.35 && mag < GRAVITY * 1.5) ny = GRAVITY * 0.35 + (ny - GRAVITY * 0.35) * 0.2;
      gx = nx;
      gy = ny;
      if (Math.abs(gx - restGx) + Math.abs(gy - restGy) > GRAVITY * 0.02) wake();
    };

    function startMotion() {
      if (motionOn || reduced) return;
      motionOn = true;
      window.addEventListener("devicemotion", onMotion);
    }

    // ---- boot -------------------------------------------------------------------------------------------
    const mql = window.matchMedia("(pointer: coarse)");
    const needsPermission =
      typeof (window.DeviceMotionEvent as unknown as MotionPermission | undefined)?.requestPermission === "function";
    if (!needsPermission && mql.matches && "DeviceMotionEvent" in window) startMotion();

    build();
    render();
    face.onload = render;
    edge.onload = render;

    let lastWidth = hang.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(hang.clientWidth - lastWidth) < 1) return;
      lastWidth = hang.clientWidth;
      build();
      render();
    });
    ro.observe(hang);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(hang);

    const onVisibility = () => {
      if (!document.hidden) wake();
    };
    document.addEventListener("visibilitychange", onVisibility);

    sign.addEventListener("pointerdown", onDown);
    sign.addEventListener("pointermove", onMove);
    sign.addEventListener("pointerup", onUp);
    sign.addEventListener("pointercancel", onCancel);

    // a small welcome swing so people notice it is alive
    const intro = window.setTimeout(() => {
      kick(restX, restY, 170, 0);
      yawVel += 0.7;
      wake();
    }, 1200);

    return () => {
      window.clearTimeout(intro);
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("devicemotion", onMotion);
      sign.removeEventListener("pointerdown", onDown);
      sign.removeEventListener("pointermove", onMove);
      sign.removeEventListener("pointerup", onUp);
      sign.removeEventListener("pointercancel", onCancel);
    };
  }, []);

  return (
    <div className="esc-hang" ref={hangRef}>
      <h1 className="esc-hang__sign" ref={signRef}>
        <img
          src="/assets/branding/escobar-sign.webp"
          width={1500}
          height={294}
          alt="Escobar"
          decoding="async"
          draggable={false}
        />
      </h1>
      <canvas className="esc-hang__chains" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
