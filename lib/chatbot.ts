import { services } from "@/data/catalogue";
import { phoneDisplay, email as companyEmail } from "@/lib/site";

export type ChatLink = { label: string; href: string };
export type LeadDraft = { name: string; email: string; phone: string; message: string };
export type ChatStage =
  | "chat"
  | "lead-name"
  | "lead-email"
  | "lead-phone"
  | "lead-message"
  | "lead-sent";

export type ChatState = {
  stage: ChatStage;
  lead: LeadDraft;
  lastService: string;
};

export type BotReply = {
  messages: string[];
  quickReplies: string[];
  links: ChatLink[];
  state: ChatState;
  handoff?: "whatsapp";
  submit?: LeadDraft;
};

export const initialState: ChatState = {
  stage: "chat",
  lead: { name: "", email: "", phone: "", message: "" },
  lastService: "",
};

export const openingReply: BotReply = {
  messages: [
    "Hi, I’m the TechGy Link assistant.",
    "Ask me about our services, past work, pricing or timelines — or I can pass your details straight to the team.",
  ],
  quickReplies: [
    "What services do you offer?",
    "Show me your work",
    "Get a quote",
    "Talk to a human",
  ],
  links: [],
  state: initialState,
};

const norm = (s: string) => s.toLowerCase().trim();

const reply = (
  messages: string[],
  quickReplies: string[],
  state: ChatState,
  extra: Partial<BotReply> = {},
): BotReply => ({ messages, quickReplies, links: [], state, ...extra });

const serviceKeywords: [RegExp, string][] = [
  [/brand|identity|logo/, "branding-identity"],
  [/\bux\b|\bui\b|product design|user experience|prototype/, "ui-ux-product-design"],
  [/website|web design|web ?dev|landing page/, "website-design-development"],
  [/custom software|enterprise app|internal tool|erp|crm/, "custom-software-development"],
  [/mobile|\bios\b|android|app\b/, "mobile-application-development"],
  [/\bai\b|automat|integrat|chatbot/, "ai-automation-system-integration"],
  [/marketing|\bseo\b|\bads?\b|campaign|social media/, "digital-marketing-sales-enablement"],
  [/architect|visuali[sz]ation|\bcgi\b|render|3d/, "architectural-visualisation"],
  [/consult|moderni[sz]|legacy|cloud|migrat/, "technology-consulting-modernisation"],
];

function findService(input: string) {
  for (const [pattern, id] of serviceKeywords)
    if (pattern.test(input)) return services.find((s) => s.id === id);
  return undefined;
}

const leadTriggers =
  /get a quote|talk to (a |the )?(human|someone|team)|book a call|contact (us|you)|start a project|speak to (someone|sales)|get in touch|reach out/;

function startLead(state: ChatState): BotReply {
  return reply(
    ["Happy to connect you. First — what should I call you?"],
    [],
    { ...state, stage: "lead-name", lead: { name: "", email: "", phone: "", message: "" } },
  );
}

function handleLeadStage(input: string, state: ChatState): BotReply {
  if (state.stage === "lead-name") {
    if (!input)
      return reply(["A first name is fine — what should I call you?"], [], state);
    const lead = { ...state.lead, name: input.slice(0, 80) };
    const first = lead.name.split(/\s+/)[0];
    return reply(
      [`Thanks, ${first}. What’s the best email to reach you on?`],
      [],
      { ...state, stage: "lead-email", lead },
    );
  }
  if (state.stage === "lead-email") {
    if (!/\S+@\S+\.\S+/.test(input))
      return reply(
        ["That doesn’t quite look like an email address — mind trying again?"],
        [],
        state,
      );
    const lead = { ...state.lead, email: input.slice(0, 254) };
    return reply(
      ["Great, and a phone number so we can call if it’s easier?"],
      [],
      { ...state, stage: "lead-phone", lead },
    );
  }
  if (state.stage === "lead-phone") {
    if (!/[\d][\d\s-]{6,}/.test(input))
      return reply(
        ["That doesn’t quite look like a phone number — mind trying again?"],
        [],
        state,
      );
    const lead = { ...state.lead, phone: input.slice(0, 40) };
    return reply(
      ["Got it. In a line or two, what are you hoping to do?"],
      ["Redesign our website", "Build a new product", "Automate a workflow", "Not sure yet"],
      { ...state, stage: "lead-message", lead },
    );
  }
  // state.stage === "lead-message"
  const lead = { ...state.lead, message: input.slice(0, 500) || "Not specified" };
  return reply(
    ["Perfect — sending this to the team now…"],
    [],
    { ...state, stage: "lead-sent", lead },
    { submit: lead },
  );
}

export function respond(rawInput: string, state: ChatState): BotReply {
  const input = rawInput.trim();
  const lower = norm(input);

  if (
    state.stage === "lead-name" ||
    state.stage === "lead-email" ||
    state.stage === "lead-phone" ||
    state.stage === "lead-message"
  )
    return handleLeadStage(input, state);

  if (!input)
    return reply(["Go ahead, I’m listening."], [], state);

  if (leadTriggers.test(lower)) return startLead(state);

  if (/^(hi|hey|hello|yo|good (morning|afternoon|evening))\b/.test(lower))
    return reply(
      ["Hey there! What can I help you with today?"],
      openingReply.quickReplies,
      state,
    );

  if (/whatsapp/.test(lower))
    return reply(
      ["Sure — tap below and I’ll open WhatsApp for you."],
      [],
      state,
      { handoff: "whatsapp" },
    );

  if (/\bwork\b|portfolio|case stud|example|client|project(s)?\b/.test(lower))
    return reply(
      [
        "We’ve shipped work across web platforms, mobile apps, CRM integrations and architectural visualisation — from GLC’s user portal to Eco World’s launch site.",
        "Want to see the full showcase, or talk about something specific?",
      ],
      ["What services do you offer?", "Get a quote"],
      state,
      { links: [{ label: "View our work", href: "/work" }] },
    );

  if (/price|cost|budget|how much|quote|rate\b/.test(lower))
    return reply(
      [
        "Pricing depends on scope — a landing page and a custom platform are very different projects.",
        "Share a bit about what you need and we’ll come back with a realistic number, no pressure.",
      ],
      ["Get a quote", "What services do you offer?"],
      state,
    );

  if (/how long|timeline|turnaround|deadline/.test(lower))
    return reply(
      [
        "Timelines vary by scope — a focused landing page can land in a couple of weeks, a full product build usually runs longer.",
        "Tell us the brief and we’ll give you a realistic plan.",
      ],
      ["Get a quote", "Talk to a human"],
      state,
    );

  if (/contact|email|phone|number|address|where are you|located|location/.test(lower))
    return reply(
      [
        `You can reach us directly at ${companyEmail} or ${phoneDisplay}. We’re based in Hyderabad, India.`,
        "Or stay right here — I can pass your details to the team.",
      ],
      ["Get a quote", "Talk to a human"],
      state,
    );

  if (/thank/.test(lower))
    return reply(["Anytime! Anything else I can help with?"], openingReply.quickReplies, state);

  if (/\bbye\b|goodbye|see you/.test(lower))
    return reply(["Take care — we’re here whenever you’re ready."], [], state);

  if (/tell me more|more details|more info/.test(lower) && state.lastService) {
    const service = services.find((s) => s.id === state.lastService);
    if (service)
      return reply(
        [service.description],
        ["Get a quote", "Show me your work"],
        state,
        { links: [{ label: `${service.name} overview`, href: `/services/${service.id}` }] },
      );
  }

  const service = findService(lower);
  if (service)
    return reply(
      [service.tagline, "Want the full details, or shall I connect you with the team?"],
      ["Tell me more", "Get a quote", "Show me your work"],
      { ...state, lastService: service.id },
      { links: [{ label: `${service.name} overview`, href: `/services/${service.id}` }] },
    );

  if (/service|offer|what do you do|capabilit/.test(lower))
    return reply(
      [
        "We work across " +
          services.map((s) => s.short).join(", ") +
          ".",
        "Which of those is closest to what you need?",
      ],
      services.slice(0, 4).map((s) => s.name),
      state,
      { links: [{ label: "All services", href: "/services" }] },
    );

  return reply(
    [
      "I might not have that exact answer, but I can point you the right way or connect you with someone who does.",
    ],
    ["What services do you offer?", "Talk to a human", "Chat on WhatsApp"],
    state,
  );
}
