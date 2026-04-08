import { useState } from "react";
import type { AuthSession, ChatMessage } from "../types";

type ChatPanelProps = {
  session: AuthSession;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
};

export function ChatPanel({ session, messages, onSendMessage }: ChatPanelProps) {
  const [message, setMessage] = useState("");

  return (
    <section className="chat-panel metal-panel battered-panel js-reveal" id="chat">
      <div className="section-title">
        <span />
        <h3>LIVE CHAT</h3>
        <span />
      </div>

      <div className="chat-shell">
        <div className="chat-log">
          {messages.map((item) => (
            <article className="chat-message" key={item.id}>
              <div className="chat-message-meta">
                <strong>{item.displayName}</strong>
                <span>{item.role.toUpperCase()}</span>
                <time>{new Date(item.sentAt).toLocaleString()}</time>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        {session.isAuthenticated ? (
          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              onSendMessage(message);
              setMessage("");
            }}
          >
            <textarea
              value={message}
              placeholder="Write into the signal..."
              onChange={(event) => setMessage(event.target.value)}
            />
            <button className="auth-solid-button" type="submit">
              SEND MESSAGE
            </button>
          </form>
        ) : (
          <div className="chat-lock-state">
            <strong>CHAT LOCKED</strong>
            <p>Only registered COMMON, VIP or ADMIN users can write in live chat.</p>
            <a className="auth-solid-button chat-cta-link" href="#auth">
              REGISTER / LOGIN
            </a>
          </div>
        )}
      </div>
    </section>
  );
}