import { useState } from "react";
import type { AuthSession, LoginPayload, RegisterPayload } from "../types";

type AuthPanelProps = {
  session: AuthSession;
  onLogin: (payload: LoginPayload) => void;
  onRegister: (payload: RegisterPayload) => void;
  onLogout: () => void;
};

export function AuthPanel({ session, onLogin, onRegister, onLogout }: AuthPanelProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState<LoginPayload>({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState<RegisterPayload>({
    email: "",
    username: "",
    displayName: "",
    password: "",
    role: "common",
  });

  if (session.isAuthenticated && session.user) {
    return (
      <section className="auth-panel metal-panel battered-panel js-reveal" id="auth">
        <div className="section-title"><span /><h3>MEMBER ACCESS</h3><span /></div>
        <div className="auth-session-card auth-session-card-centered">
          <div className="auth-session-copy">
            <strong>{session.user.displayName}</strong><p>@{session.user.username}</p><span>{session.user.role.toUpperCase()}</span>
          </div>
          <div className="auth-session-actions auth-session-actions-centered">
            <a className="auth-ghost-button cinematic-button cinematic-button--small" href="#chat"><span>OPEN CHAT</span></a>
            <button className="auth-solid-button cinematic-button cinematic-button--small" type="button" onClick={onLogout}><span>LOG OUT</span></button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-panel metal-panel battered-panel js-reveal" id="auth">
      <div className="section-title"><span /><h3>MEMBER ACCESS</h3><span /></div>
      <div className="auth-switch">
        <button className={`cinematic-button cinematic-button--small${mode === "login" ? " is-active" : ""}`} type="button" onClick={() => setMode("login")}><span>LOGIN</span></button>
        <button className={`cinematic-button cinematic-button--small${mode === "register" ? " is-active" : ""}`} type="button" onClick={() => setMode("register")}><span>REGISTER</span></button>
      </div>
      {mode === "login" ? (
        <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onLogin(loginForm); }}>
          <label className="auth-field"><span>EMAIL</span><input type="email" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} /></label>
          <label className="auth-field"><span>PASSWORD</span><input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} /></label>
          <button className="auth-solid-button cinematic-button" type="submit"><span>ENTER SIGNAL</span></button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onRegister(registerForm); }}>
          <label className="auth-field"><span>DISPLAY NAME</span><input type="text" value={registerForm.displayName} onChange={(event) => setRegisterForm({ ...registerForm, displayName: event.target.value })} /></label>
          <label className="auth-field"><span>USERNAME</span><input type="text" value={registerForm.username} onChange={(event) => setRegisterForm({ ...registerForm, username: event.target.value })} /></label>
          <label className="auth-field"><span>EMAIL</span><input type="email" value={registerForm.email} onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })} /></label>
          <label className="auth-field"><span>PASSWORD</span><input type="password" value={registerForm.password} onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })} /></label>
          <label className="auth-field"><span>ROLE</span><select value={registerForm.role} onChange={(event) => setRegisterForm({ ...registerForm, role: event.target.value as "vip" | "common" })}><option value="common">COMMON</option><option value="vip">VIP</option></select></label>
          <button className="auth-solid-button cinematic-button" type="submit"><span>CREATE ACCOUNT</span></button>
        </form>
      )}
    </section>
  );
}
