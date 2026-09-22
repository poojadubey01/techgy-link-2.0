"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "@/app/components/ui/internal-link";
import { X } from "@/app/components/ui/icons";
import { MessageCircle, Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import {
  respond,
  initialState,
  openingReply,
  type ChatState,
  type ChatLink,
  type LeadDraft,
} from "@/lib/chatbot";

type Bubble = {
  id: number;
  role: "bot" | "user";
  text: string;
  links?: ChatLink[];
  whatsapp?: boolean;
};

let bubbleId = 0;
const nextId = () => ++bubbleId;

const TYPING_MIN = 500;
const TYPING_MAX = 1000;
const typingDelay = (text: string) =>
  Math.min(TYPING_MAX, Math.max(TYPING_MIN, text.length * 16));

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [chatState, setChatState] = useState<ChatState>(initialState);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    if (open && !seeded) {
      setSeeded(true);
      deliver(openingReply.messages, openingReply.quickReplies, []);
    }
  }, [open, seeded]);

  useEffect(() => {
    if (open && panelRef.current)
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
      );
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    const last = el.lastElementChild as HTMLElement | null;
    if (last)
      gsap.fromTo(
        last,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
  }, [bubbles, typing]);

  async function deliver(
    messages: string[],
    replies: string[],
    links: ChatLink[],
    whatsapp?: boolean,
  ) {
    setQuickReplies([]);
    for (let i = 0; i < messages.length; i++) {
      setTyping(true);
      await new Promise((r) => setTimeout(r, typingDelay(messages[i])));
      setTyping(false);
      const isLast = i === messages.length - 1;
      setBubbles((b) => [
        ...b,
        {
          id: nextId(),
          role: "bot",
          text: messages[i],
          links: isLast ? links : undefined,
          whatsapp: isLast ? whatsapp : undefined,
        },
      ]);
    }
    setQuickReplies(replies);
  }

  async function submitLead(lead: LeadDraft) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message: lead.message,
          services: [chatState.lastService ? chatState.lastService : "Chat enquiry"],
          source: "Website chatbot",
        }),
      });
      const result = await res.json();
      if (!res.ok || result.ok !== true) {
        await deliver(
          [
            result.error ||
              "I couldn’t send that through — please email or call us using the details below.",
          ],
          ["What services do you offer?", "Chat on WhatsApp"],
          [],
        );
        return;
      }
      await deliver(
        [
          result.preview
            ? "This is a local preview, so nothing was actually sent — but the form works end to end."
            : `Thanks, ${lead.name.split(/\s+/)[0]}! That’s with the team now — we’ll be in touch shortly.`,
        ],
        ["What services do you offer?", "Show me your work"],
        [],
      );
    } catch {
      await deliver(
        [
          "I couldn’t send that through — please email or call us using the details below.",
        ],
        ["Chat on WhatsApp"],
        [],
      );
    } finally {
      setChatState((s) => ({ ...s, stage: "chat" }));
    }
  }

  async function send(text: string) {
    const value = text.trim();
    if (!value || busyRef.current) return;
    busyRef.current = true;
    setBubbles((b) => [...b, { id: nextId(), role: "user", text: value }]);
    setInput("");
    setQuickReplies([]);
    const result = respond(value, chatState);
    setChatState(result.state);
    await deliver(
      result.messages,
      result.quickReplies,
      result.links,
      result.handoff === "whatsapp",
    );
    if (result.submit) await submitLead(result.submit);
    busyRef.current = false;
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with TechGy Link"}
        aria-expanded={open}
        className="fixed z-40 grid place-items-center h-14 w-14 max-[767px]:h-12 max-[767px]:w-12 rounded-full bg-brand text-white shadow-[0_18px_30px_#0022ff40] transition-transform hover:scale-105 right-5 bottom-[92px] max-[767px]:right-4 max-[767px]:bottom-[76px]"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && (
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-[#25D366] border-2 border-white" />
        )}
      </button>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="TechGy Link chat assistant"
          className="fixed z-40 flex flex-col bg-white border border-rule shadow-[0_35px_60px_#1116251a] right-5 bottom-[164px] w-[380px] h-[560px] max-h-[70vh] rounded-2xl overflow-hidden max-[767px]:right-0 max-[767px]:bottom-0 max-[767px]:left-0 max-[767px]:w-full max-[767px]:h-[85svh] max-[767px]:max-h-[85svh] max-[767px]:rounded-t-2xl max-[767px]:rounded-b-none"
        >
          <div className="flex items-center gap-3 bg-brand text-white px-5 py-4 shrink-0">
            <div className="grid place-items-center h-10 w-10 rounded-full bg-white/15 font-display text-[15px]">
              TG
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-medium leading-tight">TechGy Link</p>
              <p className="text-[12px] text-white/80 leading-tight">
                Usually replies in a few minutes
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto p-1.5 hover:bg-white/10 rounded-full"
            >
              <X size={18} />
            </button>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-paper"
          >
            {bubbles.map((b) => (
              <div
                key={b.id}
                className={
                  "max-w-[85%] text-[14px] leading-[1.55] " +
                  (b.role === "user" ? "self-end" : "self-start")
                }
              >
                <div
                  className={
                    "px-4 py-2.5 " +
                    (b.role === "user"
                      ? "bg-brand text-white rounded-2xl rounded-br-sm"
                      : "bg-white text-ink border border-rule rounded-2xl rounded-bl-sm")
                  }
                >
                  {b.text}
                </div>
                {b.links && b.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {b.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] rounded-full border border-rule bg-white hover:border-brand hover:text-brand"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
                {b.whatsapp && (
                  <div className="mt-2">
                    <a
                      href={whatsappLink(
                        "Hello TechGy Link, I was chatting with your assistant and would like to continue here.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] rounded-full border border-[#25D366] text-[#128C4A] hover:bg-[#25D366] hover:text-white"
                    >
                      Continue on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="self-start bg-white border border-rule rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
              </div>
            )}
          </div>
          {quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2 pt-1 shrink-0 bg-paper">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-3 py-1.5 text-[12.5px] rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form
            className="flex items-center gap-2 border-t border-rule px-3 py-3 shrink-0 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              className="flex-1 min-w-0 h-11 px-3.5 text-[14px] bg-paper border border-rule rounded-full placeholder:text-[#94a3b8]"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              aria-label="Message"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
              className="grid place-items-center h-11 w-11 shrink-0 rounded-full bg-brand text-white disabled:opacity-40"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
