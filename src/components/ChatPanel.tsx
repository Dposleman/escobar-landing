import { useState } from "react";
import type { AuthSession, ChatMessage } from "../types";

type ChatPanelProps = {
  session: AuthSession;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
};

export function ChatPanel({ session, messages, onSendMessage }: ChatPanelProps) {
  const [message, setMessage] = useState("");

  const isWriterEnabled = session.isAuthenticated;

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

        <div className="chat-compose-shell">
          {isWriterEnabled ? (
            <form
              className="chat-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (!message.trim()) {
                  return;
                }
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
            <div className="chat-lock-state chat-lock-state-inline">
              <textarea disabled value="" placeholder="Log in to write into the signal..." />
              <strong>READ ONLY MODE</strong>
              <p>Guests can read the live chat, but only logged-in members can post messages.</p>
              <a className="auth-solid-button chat-cta-link" href="#auth">
                REGISTER / LOGIN
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}