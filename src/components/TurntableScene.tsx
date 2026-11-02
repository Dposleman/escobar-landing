import { useEffect, useRef, type RefObject } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
  type Object3D,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Props = {
  isPlaying: boolean;
  /** Flat HTML label (the cover art) that gets pinned onto the 3D record. */
  labelRef: RefObject<HTMLDivElement | null>;
  onUnsupported: () => void;
};

const RECORD_CENTER = new Vector3(-2.6, 1.98, 0.2);
const LABEL_RADIUS = 1.0;
const ARM_PLAY = 0.4;
const ARM_PARK = 0.98;

function makeCanvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, size);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Soft round glow used for the lamp halos. */
function glowTexture() {
  return makeCanvasTexture(128, (ctx, size) => {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,225,170,1)");
    g.addColorStop(0.25, "rgba(255,150,60,0.75)");
    g.addColorStop(0.6, "rgba(255,90,20,0.2)");
    g.addColorStop(1, "rgba(255,60,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  });
}

/** Black vinyl: tight concentric grooves with a few brighter bands. */
function grooveTexture() {
  return makeCanvasTexture(1024, (ctx, size) => {
    const c = size / 2;
    ctx.fillStyle = "#0b0b0a";
    ctx.fillRect(0, 0, size, size);
    for (let r = 120; r < c - 6; r += 2.2) {
      const bright = Math.random() < 0.08 ? 0.16 : 0.03 + Math.random() * 0.05;
      ctx.strokeStyle = `rgba(255,235,210,${bright})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(0,0,0,0.9)";
    ctx.lineWidth = 6;
    [212, 318, 392].forEach((r) => {
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    });
  });
}

/** Strobe dots running around the platter rim. */
function strobeTexture() {
  const texture = makeCanvasTexture(1024, (ctx, size) => {
    ctx.fillStyle = "#3b2414";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#e8c79a";
    const count = 150;
    for (let i = 0; i < count; i += 1) {
      const x = (i / count) * size;
      ctx.fillRect(x, size * 0.3, size / count / 2.2, size * 0.4);
    }
  });
  texture.wrapS = RepeatWrapping;
  return texture;
}

function loadTexture(loader: TextureLoader, url: string, repeatX: number, repeatY: number, srgb: boolean) {
  const texture = loader.load(url);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  if (srgb) texture.colorSpace = SRGBColorSpace;
  return texture;
}

type Lamp = { light: PointLight; sprite: Sprite; base: number; phase: number };

export default function TurntableScene({ isPlaying, labelRef, onUnsupported }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playingRef = useRef(isPlaying);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      onUnsupported();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = SRGBColorSpace;

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1.6, 0.1, 80);
    camera.position.set(0.3, 9.6, 15.0);
    camera.lookAt(0, 0.8, 0.5);
    camera.updateMatrixWorld();

    const pmrem = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.65;

    /* ---- lights: dark warm room, one key, orange rim --------------------- */
    scene.add(new AmbientLight(0x4a2a16, 0.9));
    scene.add(new HemisphereLight(0x9a6a44, 0x140a05, 0.55));
    const key = new DirectionalLight(0xffc690, 2.1);
    key.position.set(-7, 11, 8);
    scene.add(key);
    const rim = new PointLight(0xff6a1e, 40, 24, 2);
    rim.position.set(6, 5, -7);
    scene.add(rim);

    /* ---- materials ------------------------------------------------------- */
    const loader = new TextureLoader();
    const metalMap = loadTexture(loader, "/textures/deck-metal.jpg", 2.2, 1.4, true);
    const metalBump = loadTexture(loader, "/textures/deck-bump.jpg", 2.2, 1.4, false);
    const topMap = loadTexture(loader, "/textures/deck-metal.jpg", 1.6, 1, true);
    const topBump = loadTexture(loader, "/textures/deck-bump.jpg", 1.6, 1, false);
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    [metalMap, metalBump, topMap, topBump].forEach((t) => {
      t.anisotropy = maxAniso;
    });

    const bodyMat = new MeshStandardMaterial({
      map: metalMap,
      bumpMap: metalBump,
      bumpScale: 5,
      color: new Color(0xb89880),
      roughness: 0.72,
      metalness: 0.5,
    });
    const topMat = new MeshStandardMaterial({
      map: topMap,
      bumpMap: topBump,
      bumpScale: 4,
      color: new Color(0xa88a74),
      roughness: 0.66,
      metalness: 0.55,
    });
    const copperMat = new MeshStandardMaterial({ color: 0xc27a3e, metalness: 0.95, roughness: 0.36 });
    const darkSteel = new MeshStandardMaterial({ color: 0x2b2622, metalness: 0.85, roughness: 0.45 });
    const brightSteel = new MeshStandardMaterial({ color: 0xd8cdbb, metalness: 1, roughness: 0.28 });
    const chainMat = new MeshStandardMaterial({ color: 0x8a5a38, metalness: 0.9, roughness: 0.5 });

    const grooves = grooveTexture();
    const strobe = strobeTexture();
    const glow = glowTexture();

    const world = new Group();
    scene.add(world);

    /* ---- slab ------------------------------------------------------------ */
    const slab = new Mesh(new RoundedBoxGeometry(13, 1.5, 8, 4, 0.16), bodyMat);
    slab.position.set(0, 0.75, 0);
    world.add(slab);

    const topPlate = new Mesh(new RoundedBoxGeometry(12.2, 0.14, 7.2, 3, 0.05), topMat);
    topPlate.position.set(0, 1.55, 0);
    world.add(topPlate);

    // copper trim running around the top edge
    const trimLong = new BoxGeometry(12.6, 0.1, 0.12);
    const trimShort = new BoxGeometry(0.12, 0.1, 7.6);
    [
      [0, 1.53, 3.82, trimLong],
      [0, 1.53, -3.82, trimLong],
      [-6.32, 1.53, 0, trimShort],
      [6.32, 1.53, 0, trimShort],
    ].forEach(([x, y, z, geo]) => {
      const bar = new Mesh(geo as BoxGeometry, copperMat);
      bar.position.set(x as number, y as number, z as number);
      world.add(bar);
    });

    // rivets along the front face and the top rim
    const rivetGeo = new SphereGeometry(0.075, 10, 8);
    const rivets = new InstancedMesh(rivetGeo, darkSteel, 56);
    const m = new Matrix4();
    let ri = 0;
    for (let i = 0; i < 22; i += 1) {
      const x = -6.0 + (i / 21) * 12.0;
      m.setPosition(x, 0.32, 4.02);
      rivets.setMatrixAt(ri++, m);
      m.setPosition(x, 1.18, 4.02);
      rivets.setMatrixAt(ri++, m);
    }
    for (let i = 0; i < 6; i += 1) {
      const z = -3.2 + (i / 5) * 6.4;
      m.setPosition(-6.52, 0.75, z);
      rivets.setMatrixAt(ri++, m);
      m.setPosition(6.52, 0.75, z);
      rivets.setMatrixAt(ri++, m);
    }
    rivets.count = ri;
    world.add(rivets);

    // front plate with an engraved copper frame
    const frontPlate = new Mesh(new BoxGeometry(11.2, 0.62, 0.06), darkSteel);
    frontPlate.position.set(0, 0.75, 4.03);
    world.add(frontPlate);
    const frontFrame = new Mesh(new BoxGeometry(11.4, 0.7, 0.04), copperMat);
    frontFrame.position.set(0, 0.75, 4.01);
    world.add(frontFrame);

    // feet
    [-5.7, 5.7].forEach((x) => {
      [-3.3, 3.3].forEach((z) => {
        const foot = new Mesh(new CylinderGeometry(0.34, 0.4, 0.28, 16), darkSteel);
        foot.position.set(x, -0.1, z);
        world.add(foot);
      });
    });

    /* ---- platter + record ------------------------------------------------ */
    const platterRim = new Mesh(new CylinderGeometry(3.08, 3.08, 0.34, 72, 1, true), new MeshStandardMaterial({ map: strobe, metalness: 0.7, roughness: 0.4, color: 0xffd9a8 }));
    platterRim.position.set(RECORD_CENTER.x, 1.82, RECORD_CENTER.z);
    world.add(platterRim);
    const platterTop = new Mesh(new CylinderGeometry(3.08, 3.08, 0.04, 72), copperMat);
    platterTop.position.set(RECORD_CENTER.x, 1.99 - 0.04, RECORD_CENTER.z);
    world.add(platterTop);
    const platterRing = new Mesh(new CylinderGeometry(3.14, 3.14, 0.08, 72), copperMat);
    platterRing.position.set(RECORD_CENTER.x, 1.66, RECORD_CENTER.z);
    world.add(platterRing);

    const recordMat = new MeshStandardMaterial({ map: grooves, color: 0xffffff, roughness: 0.5, metalness: 0.2, envMapIntensity: 0 });
    const record = new Group();
    record.position.set(RECORD_CENTER.x, 2.0, RECORD_CENTER.z);
    const disc = new Mesh(new CylinderGeometry(2.86, 2.86, 0.06, 96), [new MeshStandardMaterial({ color: 0x050505, roughness: 0.4 }), recordMat, new MeshStandardMaterial({ color: 0x050505 })]);
    record.add(disc);
    const labelBase = new Mesh(new CylinderGeometry(LABEL_RADIUS, LABEL_RADIUS, 0.075, 48), new MeshStandardMaterial({ color: 0x1b140f, roughness: 0.6 }));
    record.add(labelBase);
    world.add(record);

    const spindle = new Mesh(new CylinderGeometry(0.07, 0.07, 0.3, 12), brightSteel);
    spindle.position.set(RECORD_CENTER.x, 2.12, RECORD_CENTER.z);
    world.add(spindle);

    /* ---- tonearm --------------------------------------------------------- */
    const armPivot = new Vector3(4.2, 1.62, -2.4);
    const armBase = new Mesh(new CylinderGeometry(0.62, 0.7, 0.55, 32), copperMat);
    armBase.position.set(armPivot.x, armPivot.y + 0.27, armPivot.z);
    world.add(armBase);
    const armCap = new Mesh(new CylinderGeometry(0.4, 0.4, 0.18, 24), brightSteel);
    armCap.position.set(armPivot.x, armPivot.y + 0.62, armPivot.z);
    world.add(armCap);

    const arm = new Group();
    arm.position.set(armPivot.x, armPivot.y + 0.82, armPivot.z);
    const tube = new Mesh(new CylinderGeometry(0.075, 0.075, 5.1, 12), brightSteel);
    tube.rotation.z = Math.PI / 2;
    tube.position.set(-2.55, 0, 0);
    arm.add(tube);
    const weight = new Mesh(new CylinderGeometry(0.34, 0.34, 0.9, 20), copperMat);
    weight.rotation.z = Math.PI / 2;
    weight.position.set(1.0, 0, 0);
    arm.add(weight);
    const stub = new Mesh(new CylinderGeometry(0.1, 0.1, 1.0, 10), brightSteel);
    stub.rotation.z = Math.PI / 2;
    stub.position.set(0.35, 0, 0);
    arm.add(stub);
    const headshell = new Mesh(new BoxGeometry(0.95, 0.12, 0.34), darkSteel);
    headshell.position.set(-5.5, -0.08, 0.08);
    headshell.rotation.y = 0.28;
    arm.add(headshell);
    const cartridge = new Mesh(new BoxGeometry(0.5, 0.2, 0.26), copperMat);
    cartridge.position.set(-5.62, -0.26, 0.12);
    cartridge.rotation.y = 0.28;
    arm.add(cartridge);
    world.add(arm);

    /* ---- knobs and buttons ----------------------------------------------- */
    [
      [3.2, 2.9],
      [4.6, 2.9],
      [5.6, 1.6],
    ].forEach(([x, z], index) => {
      const knob = new Mesh(new CylinderGeometry(0.34, 0.4, 0.3, 24), index === 2 ? copperMat : brightSteel);
      knob.position.set(x, 1.78, z);
      world.add(knob);
      const notch = new Mesh(new BoxGeometry(0.06, 0.05, 0.26), new MeshBasicMaterial({ color: 0xff8a2a }));
      notch.position.set(x, 1.95, z - 0.1);
      world.add(notch);
    });

    /* ---- lamps ----------------------------------------------------------- */
    const lamps: Lamp[] = [];
    const lampSpots: Array<[number, number, number]> = [
      [-5.8, 1.62, 3.3],
      [-5.8, 1.62, -3.3],
      [5.9, 1.62, 3.3],
    ];
    lampSpots.forEach(([x, y, z], index) => {
      const foot = new Mesh(new CylinderGeometry(0.26, 0.3, 0.22, 16), darkSteel);
      foot.position.set(x, y + 0.11, z);
      world.add(foot);
      const bulb = new Mesh(new SphereGeometry(0.26, 18, 14), new MeshBasicMaterial({ color: 0xffb35a }));
      bulb.position.set(x, y + 0.45, z);
      world.add(bulb);
      const light = new PointLight(0xff7a22, 12, 9, 2);
      light.position.set(x, y + 0.7, z);
      world.add(light);
      const sprite = new Sprite(new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }));
      sprite.scale.set(2.6, 2.6, 1);
      sprite.position.set(x, y + 0.5, z);
      world.add(sprite);
      lamps.push({ light, sprite, base: 12, phase: index * 1.7 });
    });

    /* ---- chain draped over the front edge ---------------------------------- */
    const chain = new Group();
    const linkGeo = new TorusGeometry(0.2, 0.052, 8, 18);
    const links = 26;
    for (let i = 0; i < links; i += 1) {
      const t = i / (links - 1);
      const link = new Mesh(linkGeo, chainMat);
      link.scale.set(1.45, 1, 1);
      const x = -5.2 + t * 10.4;
      const sag = Math.sin(Math.PI * t);
      link.position.set(x, 1.05 - sag * 0.55, 4.28 + sag * 0.22);
      const slope = Math.cos(Math.PI * t) * 0.55;
      link.rotation.z = Math.atan(-slope * 0.5);
      link.rotation.x = i % 2 === 0 ? 0 : Math.PI / 2;
      chain.add(link);
    }
    world.add(chain);

    /* ---- ground shadow ----------------------------------------------------- */
    const shadowTex = makeCanvasTexture(256, (ctx, size) => {
      const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.15, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(0,0,0,0.85)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    });
    const shadow = new Mesh(new PlaneGeometry(18, 11), new MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -0.38, 0.4);
    scene.add(shadow);

    /* ---- sizing + pinning the cover label ------------------------------------ */
    let width = 1;
    let height = 1;

    const project = (point: Vector3): [number, number] => {
      const p = point.clone().project(camera);
      return [(p.x * 0.5 + 0.5) * width, (1 - (p.y * 0.5 + 0.5)) * height];
    };

    const placeLabel = () => {
      const el = labelRef.current;
      if (!el) return;
      camera.updateMatrixWorld();
      const [cx, cy] = project(RECORD_CENTER);
      const [rx, ry] = project(RECORD_CENTER.clone().add(new Vector3(LABEL_RADIUS * 0.94, 0, 0)));
      const [zx, zy] = project(RECORD_CENTER.clone().add(new Vector3(0, 0, LABEL_RADIUS * 0.94)));
      const k = 1 / 100;
      const a = (rx - cx) * k;
      const b = (ry - cy) * k;
      const c = (zx - cx) * k;
      const d = (zy - cy) * k;
      el.style.transform = `matrix(${a}, ${b}, ${c}, ${d}, ${cx - 100 * a - 100 * c}, ${cy - 100 * b - 100 * d})`;
      el.style.opacity = "1";
    };

    const resize = () => {
      width = Math.max(1, host.clientWidth);
      height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // keep the whole deck in frame on narrow screens
      camera.fov = camera.aspect < 1.5 ? 31 + (1.5 - camera.aspect) * 20 : 31;
      camera.updateProjectionMatrix();
      placeLabel();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    /* ---- loop ------------------------------------------------------------------ */
    let raf = 0;
    let last = performance.now();
    let t = 0;
    let armAngle = ARM_PARK;
    let visible = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const playing = playingRef.current;

      if (playing && !reduced) record.rotation.y -= dt * 3.49;

      armAngle += ((playing ? ARM_PLAY : ARM_PARK) - armAngle) * (1 - Math.exp(-dt * 2.2));
      arm.position.set(armPivot.x, armPivot.y + 0.82, armPivot.z);
      arm.rotation.y = armAngle + (playing ? Math.sin(t * 1.7) * 0.004 : 0);
      arm.position.y = armPivot.y + 0.82 - (playing ? Math.max(0, 1 - Math.abs(armAngle - ARM_PLAY) * 6) * 0.16 : 0);

      lamps.forEach((lamp) => {
        const f = reduced ? 1 : 0.78 + 0.22 * Math.sin(t * (6 + lamp.phase) + lamp.phase * 5) * Math.sin(t * 2.3 + lamp.phase);
        lamp.light.intensity = lamp.base * f * (playing ? 1.3 : 1);
        lamp.sprite.material.opacity = Math.min(1, 0.55 * f + (playing ? 0.25 : 0.05));
      });
      rim.intensity = 36 + (playing ? 14 : 0) + (reduced ? 0 : Math.sin(t * 3.1) * 4);

      if (!reduced) chain.rotation.z = Math.sin(t * 0.9) * 0.006;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    };
    const stop = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);

      const textures = new Set<Texture>([metalMap, metalBump, topMap, topBump, grooves, strobe, glow, shadowTex, envTexture]);
      scene.traverse((object: Object3D) => {
        const mesh = object as Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material;
        (Array.isArray(material) ? material : material ? [material] : []).forEach((mat) => mat.dispose());
      });
      textures.forEach((texture) => texture.dispose());
      pmrem.dispose();
      renderer.dispose();
    };
  }, [labelRef, onUnsupported]);

  return <canvas ref={canvasRef} className="esc-deck__canvas" aria-hidden="true" />;
}
