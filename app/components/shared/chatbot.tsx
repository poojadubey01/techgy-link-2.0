"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "@/app/components/ui/internal-link";
import { ChevronDown, X } from "@/app/components/ui/icons";
import { MessageCircle, Send, RefreshCw, Loader2 } from "lucide-react";
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { whatsappLink } from "@/lib/site";

const CHAT_API_URL = "/api/chat";
const REGISTER_API_URL = "/api/chat-register";
const SESSION_KEY = "techgy_chat_session";
// The backend appends this once a conversation is naturally wrapped up. We
// strip it before display and use it as the signal to offer "start a new
// conversation" instead of the message box.
const CHAT_END_MARKER = "[[END_OF_CHAT]]";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
  unreachable?: boolean;
};

// Real project names the backend may name, mapped to where they actually
// live on this site. Kept in sync with data/content.ts and app/products.
const PROJECT_LINKS: Record<string, string> = {
  "eco world": "/work/eco-world",
  "lending bridge": "/work/lending-bridge",
  quickbooks: "/work/quickbooks-integration",
  "sales crm": "/products/sales-crm",
  "office tracker hrms": "/products/office-tracker-hrms",
};

function getProjectLink(s: string): string | null {
  const trimmed = s.trim();
  const lower = trimmed.toLowerCase();
  // Parting phrases, pleasantries, or normal suggestions must NEVER be treated as project links
  if (
    lower.includes("you soon") ||
    lower.includes("later") ||
    lower.includes("goodbye") ||
    lower.includes("bye") ||
    lower.includes("thanks") ||
    lower.includes("thank you")
  ) {
    return null;
  }
  const stripped = lower.replace(/^(see|view|explore)\s+/i, "").trim();
  if (PROJECT_LINKS[stripped]) {
    return PROJECT_LINKS[stripped];
  }
  if (stripped === "our work" || stripped === "work" || stripped === "portfolio" || stripped === "case studies") {
    return "/work";
  }
  return null;
}

type Lead = { name: string; email: string; phone: string; availableTiming: string };
type ChatState = "ASK_NAME" | "ASK_EMAIL" | "ASK_PHONE" | "ASK_TIMING" | "CHAT";
type HistoryMessage = { role: "user" | "assistant"; content: string };
type ChatSession = {
  chatState: ChatState;
  lead: { name: string; email: string; phone: string; available_timing: string };
  phoneCountry?: CountryCode;
  phoneNational?: string;
  registered: boolean;
  history: HistoryMessage[];
  stage: string | null;
  stageTurns: number;
  suggestions: string[];
  conversationEnded?: boolean;
};

const emptySession = (): ChatSession => ({
  chatState: "ASK_NAME",
  lead: { name: "", email: "", phone: "", available_timing: "" },
  registered: false,
  history: [],
  stage: null,
  stageTurns: 0,
  suggestions: [],
});

function loadSession(): ChatSession | null {
  try {
    const value = sessionStorage.getItem(SESSION_KEY);
    if (!value) return null;
    const saved = JSON.parse(value) as ChatSession;
    if (!saved || !saved.lead || !Array.isArray(saved.history) ||
        !["ASK_NAME", "ASK_EMAIL", "ASK_PHONE", "ASK_TIMING", "CHAT"].includes(saved.chatState)) return null;
    return saved;
  } catch {
    return null;
  }
}

const TIME_SLOTS = [
  "Morning (9 AM to 12 PM)",
  "Afternoon (12 PM to 4 PM)",
  "Evening (4 PM to 7 PM)",
  "Anytime",
];

const TYPE_CHARS_PER_TICK = 3;
const TYPE_TICK_MS = 20;

let messageCounter = 0;
const nextId = () => `${Date.now()}-${messageCounter++}`;

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const PHONE_COUNTRIES = getCountries()
  .map((country) => ({
    country,
    name: countryNames.of(country) ?? country,
    callingCode: getCountryCallingCode(country),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function fullPhoneNumber(national: string, country: CountryCode) {
  const parsed = parsePhoneNumberFromString(national, country);
  return parsed?.isPossible() ? parsed.number : null;
}

type Stage = "gate" | "chat";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("gate");
  const [lead, setLead] = useState<Lead | null>(null);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("IN");
  const [timingInput, setTimingInput] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [savedChoice, setSavedChoice] = useState<ChatSession | null>(null);
  const [confirmNewChat, setConfirmNewChat] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeTypingRef = useRef<{ id: string; fullText: string } | null>(null);
  const isSendingRef = useRef(false);
  const warmedRef = useRef(false);
  const chatEpochRef = useRef(0);
  const sessionRef = useRef<ChatSession>(emptySession());

  function saveSession(patch: Partial<ChatSession>) {
    sessionRef.current = { ...sessionRef.current, ...patch };
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionRef.current));
    } catch {
      // The widget can still run when browser storage is unavailable.
    }
  }

  useEffect(() => {
    const saved = loadSession();
    if (saved) {
      setSavedChoice(saved);
      setOpen(true);
    }
    setSessionReady(true);
  }, []);

  function completeCurrentTyping() {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (activeTypingRef.current) {
      const { id, fullText } = activeTypingRef.current;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, content: fullText } : m))
      );
      activeTypingRef.current = null;
    }
    setIsTyping(false);
  }

  function restoreChat(saved: ChatSession) {
    completeCurrentTyping();
    isSendingRef.current = false;
    setSelectedSuggestions([]);
    sessionRef.current = saved;
    setNameInput(saved.lead.name || "");
    setEmailInput(saved.lead.email || "");
    const parsedPhone = parsePhoneNumberFromString(saved.lead.phone || "");
    setPhoneCountry(saved.phoneCountry ?? parsedPhone?.country ?? "IN");
    setPhoneInput(saved.phoneNational ?? parsedPhone?.nationalNumber ?? saved.lead.phone.replace(/\D/g, ""));
    setTimingInput(saved.lead.available_timing || "");
    if (saved.chatState === "CHAT") {
      const restoredLead: Lead = {
        name: saved.lead.name, email: saved.lead.email,
        phone: saved.lead.phone, availableTiming: saved.lead.available_timing,
      };
      setLead(restoredLead);
      setStage("chat");
      setConversationEnded(!!saved.conversationEnded);
      setMessages(saved.history.map((message, index) => ({
        ...message,
        id: nextId(),
        suggestions: index === saved.history.length - 1 && message.role === "assistant" && !saved.conversationEnded
          ? saved.suggestions : undefined,
      })));
      if (!saved.history.length) void startConversation(restoredLead);
    }
    setOpen(true);
    setSavedChoice(null);
  }

  function updateLeadField(field: keyof ChatSession["lead"], value: string) {
    const lead = { ...sessionRef.current.lead, [field]: value };
    const chatState: ChatState = !lead.name.trim() ? "ASK_NAME"
      : !isValidEmail(lead.email.trim()) ? "ASK_EMAIL"
      : !lead.phone.trim() ? "ASK_PHONE"
      : "ASK_TIMING";
    saveSession({ lead, chatState });
  }

  useEffect(() => {
    if (open && panelRef.current)
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    // The assistant's Lambda has a slow cold start. Ping it as soon as the
    // panel opens, so it's warm by the time the visitor finishes the
    // registration gate and sends a real message.
    if (open && !warmedRef.current) {
      warmedRef.current = true;
      fetch("/api/chat-warmup").catch(() => {});
    }
  }, [open]);

  // Keep scroll position sensible:
  // - On greeting (messages <= 1): keep scrolled to top (top: 0) so the greeting is not cut off or scrolled up
  // - On subsequent messages: scroll to bottom
  useEffect(() => {
    if (!scrollRef.current) return;
    if (messages.length <= 1) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (!isTyping) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length, loading, stage, conversationEnded]);

  useEffect(() => {
    // On phones, a `fixed; bottom: 0` panel tracks the page's layout
    // viewport, not the visual one — so when the on-screen keyboard opens
    // (focusing the message input), the keyboard covers the bottom of the
    // panel instead of the panel shrinking to make room, and the input row
    // ends up hidden behind it. Pin the panel to the actual visible area
    // via the VisualViewport API instead, only below the md breakpoint.
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!open || !vv) return;
    const sync = () => {
      const el = panelRef.current;
      if (!el) return;
      if (window.innerWidth > 767) {
        el.style.top = "";
        el.style.height = "";
        el.style.maxHeight = "";
        return;
      }
      // Anchor to the bottom of the *visible* area (not the full layout
      // viewport) so this tracks the keyboard as it opens and closes, and
      // let the CSS max-height fallback stand down in favour of this.
      const height = Math.min(vv.height * 0.85, vv.height - 24);
      el.style.maxHeight = "none";
      el.style.height = `${height}px`;
      el.style.top = `${vv.offsetTop + vv.height - height}px`;
    };
    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
      const el = panelRef.current;
      if (el) {
        el.style.top = "";
        el.style.height = "";
        el.style.maxHeight = "";
      }
    };
  }, [open]);

  useEffect(() => {
    return () => {
      completeCurrentTyping();
    };
  }, []);

  function typeOutReply(id: string, fullText: string) {
    // Finish any previous message that might still be typing
    completeCurrentTyping();

    setIsTyping(true);
    activeTypingRef.current = { id, fullText };
    let shown = 0;

    typingIntervalRef.current = setInterval(() => {
      shown += TYPE_CHARS_PER_TICK;
      const done = shown >= fullText.length;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, content: done ? fullText : fullText.slice(0, shown) } : m)),
      );
      // Instant scroll during typing to prevent animation stutter and overlaps
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      if (done) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        activeTypingRef.current = null;
        setIsTyping(false);
      }
    }, TYPE_TICK_MS);
  }

  async function registerLead(e: React.FormEvent) {
    e.preventDefault();
    const name = nameInput.trim();
    const email = emailInput.trim();
    const phone = fullPhoneNumber(phoneInput, phoneCountry);
    const availableTiming = timingInput.trim();
    if (!name || !isValidEmail(email) || !phone || !availableTiming || registering) return;
    const newLead: Lead = { name, email, phone, availableTiming };
    setLead(newLead);
    setMessages([]);
    setSelectedSuggestions([]);
    setStage("chat");
    saveSession({
      chatState: "CHAT",
      lead: { name, email, phone, available_timing: availableTiming },
      phoneCountry, phoneNational: phoneInput,
      history: [], stage: null, stageTurns: 0, suggestions: [], conversationEnded: false,
    });
    void startConversation(newLead);
  }

  async function startConversation(currentLead: Lead) {
    const chatEpoch = chatEpochRef.current;
    if (!sessionRef.current.registered) {
      // One registration attempt per chat. Do not hold up the greeting for it.
      fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentLead.name, email: currentLead.email, phone: currentLead.phone,
          available_timing: currentLead.availableTiming,
        }),
      }).catch((error) => console.error("Error sending registration request:", error));
      saveSession({ registered: true });
    }
    setRegistering(true);
    setRegisterError("");
    setSelectedSuggestions([]);
    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          init: true, message: "", history: [], stage: null, stage_turns: 0,
          name: currentLead.name, email: currentLead.email, phone: currentLead.phone,
          available_timing: currentLead.availableTiming,
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      const data: { reply: string; suggestions?: string[]; stage?: string; stage_turns?: number } = await res.json();
      if (chatEpoch !== chatEpochRef.current) return;
      const rawSuggestions = data.suggestions || [];
      const suggestions = rawSuggestions.filter(
        (s) => !/^(do\s+)?see you soon|talk to you soon|goodbye|bye for now$/i.test(s.trim())
      );
      const history: HistoryMessage[] = [{ role: "assistant", content: data.reply }];
      saveSession({ history, stage: data.stage ?? null, stageTurns: data.stage_turns ?? 0, suggestions });
      setMessages([{ id: nextId(), role: "assistant", content: data.reply, suggestions }]);
    } catch {
      if (chatEpoch !== chatEpochRef.current) return;
      setRegisterError("Couldn’t start the chat. Please try again.");
    } finally {
      if (chatEpoch === chatEpochRef.current) setRegistering(false);
    }
  }

  function startNewChat() {
    chatEpochRef.current++;
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    sessionRef.current = emptySession();
    completeCurrentTyping();
    isSendingRef.current = false;
    setSelectedSuggestions([]);
    setLoading(false);
    setRegistering(false);
    setSavedChoice(null);
    setConfirmNewChat(false);
    setLead(null);
    setMessages([]);
    setInput("");
    setNameInput("");
    setEmailInput("");
    setPhoneInput("");
    setPhoneCountry("IN");
    setTimingInput("");
    setRegisterError("");
    setConversationEnded(false);
    setStage("gate");
  }

  async function sendMessage(override?: string) {
    const chatEpoch = chatEpochRef.current;
    const text = (override ?? input).trim();
    if (!text || isSendingRef.current || loading || isTyping || registering || !lead || !sessionRef.current.history.length) return;

    isSendingRef.current = true;
    setSelectedSuggestions([]);

    const history = sessionRef.current.history;
    const previousStage = sessionRef.current.stage;
    const previousStageTurns = sessionRef.current.stageTurns;

    // Deduplicate history so consecutive identical messages are never passed to LLM
    const cleanHistory: HistoryMessage[] = [];
    for (const msg of history) {
      const last = cleanHistory[cleanHistory.length - 1];
      if (!last || last.role !== msg.role || last.content.trim() !== msg.content.trim()) {
        cleanHistory.push(msg);
      }
    }

    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: text }]);
    saveSession({ history: [...cleanHistory, { role: "user", content: text }], suggestions: [] });
    setInput("");
    setLoading(true);

    const requestChat = () =>
      fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          available_timing: lead.availableTiming,
          history: cleanHistory,
          stage: previousStage,
          stage_turns: previousStageTurns,
        }),
      });

    try {
      // A cold Lambda can blow past API Gateway's ~29s timeout on the first
      // request even after warming up. By the time that fails, the container
      // is usually already up, so one immediate retry succeeds in a couple
      // of seconds instead of showing the visitor a dead end.
      let res = await requestChat();
      if (!res.ok) res = await requestChat();
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      const data: { reply: string; suggestions?: string[]; stage?: string; stage_turns?: number } = await res.json();
      if (chatEpoch !== chatEpochRef.current) return;

      const hasEndedMarker = data.reply.includes(CHAT_END_MARKER);
      const cleanReply = data.reply.replace(CHAT_END_MARKER, "").trim();

      // Check for natural wrap-up signals
      const isNaturalEnd =
        hasEndedMarker ||
        (/goodbye|have a (great|wonderful|good) day|take care|in touch with you soon/i.test(cleanReply) &&
          /goodbye|bye|thanks|thank you|no other questions|no questions/i.test(text));

      const hasEnded = hasEndedMarker || isNaturalEnd;
      const rawSuggestions = hasEnded ? [] : data.suggestions ?? [];
      const suggestions = rawSuggestions.filter(
        (s) => !/^(do\s+)?see you soon|talk to you soon|goodbye|bye for now$/i.test(s.trim())
      );

      saveSession({
        history: [...sessionRef.current.history, { role: "assistant", content: cleanReply }],
        stage: data.stage ?? previousStage,
        stageTurns: data.stage_turns ?? previousStageTurns,
        suggestions,
        conversationEnded: hasEnded,
      });

      setLoading(false);
      const id = nextId();
      setMessages((prev) => [...prev, { id, role: "assistant", content: "", suggestions }]);
      typeOutReply(id, cleanReply);
      if (hasEnded) setConversationEnded(true);
    } catch {
      if (chatEpoch !== chatEpochRef.current) return;
      setLoading(false);
      const id = nextId();
      setMessages((prev) => [...prev, { id, role: "assistant", content: "", unreachable: true }]);
      typeOutReply(
        id,
        "Sorry, I couldn’t reach the assistant right now. Please try again in a moment, or reach us on WhatsApp.",
      );
    } finally {
      isSendingRef.current = false;
    }
  }

  return (
    <>
      <button
        onClick={() => { if (sessionReady) setOpen((v) => !v); }}
        aria-label={open ? "Close chat" : "Open chat with TechGy Link"}
        aria-expanded={open}
        className={
          "fixed z-50 grid place-items-center h-14 w-14 max-[767px]:h-12 max-[767px]:w-12 rounded-full border-2 border-white bg-brand text-white shadow-[0_18px_30px_#0022ff40] transition-transform hover:scale-105 right-5 bottom-23 max-[767px]:right-4 max-[767px]:bottom-19" +
          (open ? " max-[767px]:hidden" : "")
        }
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && (
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-[#25D366] border-2 border-white" />
        )}
      </button>
      {open && sessionReady && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="TechGy Link chat assistant"
          className="fixed z-60 flex flex-col bg-white border border-rule shadow-[0_35px_60px_#1116251a] right-5 bottom-38 w-[340px] max-[380px]:w-[310px] h-125 max-h-[min(68dvh,calc(100dvh_-_164px))] overflow-hidden max-[767px]:right-0 max-[767px]:bottom-0 max-[767px]:left-0 max-[767px]:w-full max-[767px]:h-[80svh] max-[767px]:max-h-[80svh]"
        >
          <div className="flex items-center gap-3 bg-brand text-white px-5 py-4 shrink-0">
            <div className="min-w-0">
              <p className="text-[15px] font-medium leading-tight">TechGy Link Assistant</p>
              <p className="text-[12px] text-white/80 leading-tight">Ask us anything</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {stage === "chat" && (
                <button
                  onClick={() => setConfirmNewChat(true)}
                  title="Start a new conversation"
                  aria-label="Start a new conversation"
                  className="p-1.5 hover:bg-white/10"
                >
                  <RefreshCw size={16} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {stage === "gate" && (
            <div className="no-scrollbar flex flex-1 flex-col justify-center gap-4 overflow-y-auto bg-white px-6 py-6">
              <div>
                <p className="font-display text-[19px]">Let’s get started</p>
                <p className="mt-1 text-[13px] text-ink">
                  Share your details and we’ll take it from there.
                </p>
              </div>
              <form onSubmit={registerLead} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => { setNameInput(e.target.value); updateLeadField("name", e.target.value); }}
                  placeholder="Your name"
                  aria-label="Your name"
                  required
                  className="w-full bg-paper border border-rule px-4 py-2.5 text-[13.5px] outline-none placeholder:text-[#94a3b8] focus:border-brand"
                />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => { setEmailInput(e.target.value); updateLeadField("email", e.target.value); }}
                  placeholder="Your email"
                  aria-label="Your email"
                  required
                  className="w-full bg-paper border border-rule px-4 py-2.5 text-[13.5px] outline-none placeholder:text-[#94a3b8] focus:border-brand"
                />
                <div className="flex gap-2">
                  <div className="relative w-[112px] shrink-0">
                    <select
                      value={phoneCountry}
                      onChange={(e) => {
                        const country = e.target.value as CountryCode;
                        setPhoneCountry(country);
                        updateLeadField("phone", phoneInput ? `+${getCountryCallingCode(country)}${phoneInput}` : "");
                        saveSession({ phoneCountry: country });
                      }}
                      aria-label="Country calling code"
                      className="w-full appearance-none border border-rule bg-paper pl-2 pr-5 py-2.5 text-[13px] outline-none focus:border-brand"
                    >
                      {PHONE_COUNTRIES.map(({ country, name, callingCode }) => (
                        <option key={country} value={country}>+{callingCode} · {name}</option>
                      ))}
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={phoneInput}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setPhoneInput(digits);
                      updateLeadField("phone", digits ? `+${getCountryCallingCode(phoneCountry)}${digits}` : "");
                      saveSession({ phoneCountry, phoneNational: digits });
                    }}
                    placeholder="Phone number"
                    aria-label="Phone number without country code"
                    maxLength={15}
                    required
                    className="min-w-0 flex-1 bg-paper border border-rule px-3 py-2.5 text-[13.5px] outline-none placeholder:text-[#94a3b8] focus:border-brand"
                  />
                </div>
                {phoneInput && !fullPhoneNumber(phoneInput, phoneCountry) && (
                  <p className="text-[12px] text-red-600">Enter a valid phone number for the selected country.</p>
                )}
                <div className="relative w-full">
                  <select
                    value={timingInput}
                    onChange={(e) => { setTimingInput(e.target.value); updateLeadField("available_timing", e.target.value); }}
                    aria-label="Your available timing"
                    required
                    className={
                      "w-full appearance-none border border-rule bg-paper px-4 py-2.5 text-[13.5px] outline-none focus:border-brand " +
                      (timingInput ? "text-ink" : "text-[#94a3b8]")
                    }
                  >
                    <option value="" disabled>
                      When’s a good time to call you?
                    </option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                </div>
                {registerError && <p className="text-[12px] text-red-600">{registerError}</p>}
                <button
                  type="submit"
                  disabled={!nameInput.trim() || !isValidEmail(emailInput) || !fullPhoneNumber(phoneInput, phoneCountry) || !timingInput.trim() || registering}
                  className="mt-1 flex items-center justify-center gap-2 bg-brand px-4 py-2.5 text-[13.5px] font-medium text-white disabled:opacity-40 cursor-pointer"
                >
                  {registering && <Loader2 size={14} className="animate-spin" />}
                  {registering ? "Starting…" : "Start chat"}
                </button>
              </form>
            </div>
          )}

          {stage === "chat" && (
            <>
              <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-paper">
                {registering && messages.length === 0 && (
                  <div className="self-start bg-white border border-rule px-4 py-3 flex gap-1.5" aria-label="Starting chat">
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                  </div>
                )}
                {registerError && messages.length === 0 && lead && !registering && (
                  <div className="self-start flex flex-col gap-2 bg-white border border-rule px-4 py-3 text-[13px]">
                    <p>{registerError}</p>
                    <button type="button" onClick={() => void startConversation(lead)} className="text-left font-medium text-brand">Try again</button>
                  </div>
                )}
                {messages.map((m, i) => {
                  const isLast = i === messages.length - 1;
                  const showSuggestions =
                    isLast &&
                    !isTyping &&
                    !loading &&
                    !conversationEnded &&
                    m.role === "assistant" &&
                    !!m.content &&
                    Boolean(m.suggestions && m.suggestions.length > 0);

                  return (
                    <div key={m.id} className="flex flex-col gap-2">
                      <div className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                        <p
                          className={
                            "max-w-[85%] whitespace-pre-wrap break-words [overflow-wrap:anywhere] px-4 py-2.5 text-[13.5px] leading-normal " +
                            (m.role === "user"
                              ? "bg-brand text-white"
                              : "bg-white text-ink border border-rule")
                          }
                        >
                          {m.content}
                        </p>
                      </div>

                      {showSuggestions && m.suggestions && (
                        <div className="flex flex-col gap-2 mt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {m.suggestions.map((s) => {
                              const projectHref = getProjectLink(s);
                              if (projectHref) {
                                return (
                                  <Link
                                    key={s}
                                    href={projectHref}
                                    className="inline-flex items-center gap-1 border border-brand bg-blue-50/40 px-3 py-1.5 text-[12px] font-medium text-brand hover:bg-brand hover:text-white transition-colors"
                                  >
                                    <span>{s}</span>
                                    <span className="text-[10px]">↗</span>
                                  </Link>
                                );
                              }

                              const isChecked = selectedSuggestions.includes(s);
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  disabled={loading || isTyping}
                                  onClick={() => {
                                    if (loading || isTyping) return;
                                    setSelectedSuggestions((prev) =>
                                      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
                                    );
                                  }}
                                  className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[12px] font-medium transition-all text-left ${
                                    isChecked
                                      ? "border-brand bg-brand text-white shadow-xs"
                                      : "border-rule bg-white text-ink hover:border-brand/70 hover:text-brand"
                                  } ${loading || isTyping ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                  <span
                                    className={`grid place-items-center h-3.5 w-3.5 rounded-xs border text-[10px] shrink-0 transition-colors ${
                                      isChecked
                                        ? "border-white bg-white text-brand font-bold"
                                        : "border-rule bg-paper"
                                    }`}
                                  >
                                    {isChecked && "✓"}
                                  </span>
                                  <span>{s}</span>
                                </button>
                              );
                            })}
                          </div>

                          {selectedSuggestions.length > 0 && (
                            <div className="flex items-center gap-2 pt-0.5">
                              <button
                                type="button"
                                disabled={loading || isTyping}
                                onClick={() => {
                                  if (selectedSuggestions.length === 0 || loading || isTyping) return;
                                  const combinedText = selectedSuggestions.join(", ");
                                  setSelectedSuggestions([]);
                                  sendMessage(combinedText);
                                }}
                                className="inline-flex items-center gap-1.5 bg-brand text-white px-3.5 py-1.5 text-[12px] font-medium rounded-xs hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                              >
                                <span>Send {selectedSuggestions.length > 1 ? `(${selectedSuggestions.length})` : ""}</span>
                                <Send size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedSuggestions([])}
                                className="text-[11px] text-[#94a3b8] hover:text-ink px-1 cursor-pointer"
                              >
                                Clear
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                {loading && (
                  <div className="self-start bg-white border border-rule px-4 py-3 flex gap-1.5">
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
                  </div>
                )}
                {conversationEnded && !isTyping && (
                  <div className="flex flex-col items-center gap-3 border-t border-rule pt-4 pb-1">
                    <p className="font-display text-[15px]">Thank you for contacting us!</p>
                    <button
                      onClick={startNewChat}
                      className="bg-brand px-4 py-2 text-[12.5px] font-medium text-white cursor-pointer"
                    >
                      Start a new conversation
                    </button>
                  </div>
                )}
              </div>
              {!conversationEnded && (
                <form
                  className="flex items-center gap-2 border-t border-rule px-3 py-3 shrink-0 bg-white"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (selectedSuggestions.length > 0) {
                      const combined = [selectedSuggestions.join(", "), input.trim()].filter(Boolean).join(" - ");
                      setSelectedSuggestions([]);
                      sendMessage(combined);
                    } else {
                      sendMessage();
                    }
                  }}
                >
                  <input
                    className="flex-1 min-w-0 h-11 px-3.5 text-[14px] bg-paper border border-rule placeholder:text-[#94a3b8] outline-none focus:border-brand"
                    placeholder="Type a message…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={1000}
                    aria-label="Message"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={(!input.trim() && selectedSuggestions.length === 0) || loading || isTyping || registering || messages.length === 0}
                    className="grid place-items-center h-11 w-11 shrink-0 bg-brand text-white disabled:opacity-40 cursor-pointer"
                  >
                    <Send size={17} />
                  </button>
                </form>
              )}
              {messages.length > 0 && messages[messages.length - 1].unreachable && !isTyping && (
                <div className="px-4 pb-3 -mt-1 shrink-0 bg-white">
                  <a
                    href={whatsappLink("Hello TechGy Link, I was chatting with your assistant and would like to continue here.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] border border-[#25D366] text-[#128C4A] hover:bg-[#25D366] hover:text-white"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              )}
            </>
          )}
          {(savedChoice || confirmNewChat) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 px-4">
              <div role="dialog" aria-modal="true" aria-labelledby="chat-confirm-title" className="w-full bg-white p-5 shadow-[0_24px_60px_#11162533]">
                <p id="chat-confirm-title" className="font-display text-[18px] text-ink">
                  {savedChoice
                    ? "You have a chat in progress. Do you want to continue it or start a new chat?"
                    : "Start a new chat? Your current conversation will be cleared."}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  {savedChoice ? (
                    <button type="button" autoFocus onClick={() => restoreChat(savedChoice)} className="bg-brand px-4 py-2.5 text-[13px] font-medium text-white cursor-pointer">
                      Continue chat
                    </button>
                  ) : (
                    <button type="button" autoFocus onClick={() => setConfirmNewChat(false)} className="border border-rule px-4 py-2.5 text-[13px] font-medium text-ink cursor-pointer">
                      Keep chatting
                    </button>
                  )}
                  <button type="button" onClick={startNewChat} className="bg-brand px-4 py-2.5 text-[13px] font-medium text-white cursor-pointer">
                    Start new chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
