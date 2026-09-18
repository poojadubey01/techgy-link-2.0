export const contributions = {
  "branding-identity": {
    team: "Brand strategy · Visual identity · Creative execution",
    title: "A brand with a life beyond the guidelines.",
    body: "Your identity has to work wherever people meet the business. Our brand specialists can collaborate with website designers, marketers and visualisation artists to carry the same idea into the experience.",
    connections: [
      [
        "website-design-development",
        "Bring the identity into a working digital experience.",
      ],
      [
        "digital-marketing-sales-enablement",
        "Carry the message into campaigns and sales conversations.",
      ],
      [
        "architectural-visualisation",
        "Build a consistent presentation around a property launch.",
      ],
    ],
  },
  "ui-ux-product-design": {
    team: "Product design · Business analysis · Engineering review",
    title: "Design that understands the business behind the screen.",
    body: "Good product design connects what a person needs to do with the rules the business needs to follow. Designers, analysts and engineers can resolve those questions together, with a clear path from prototype to implementation.",
    connections: [
      [
        "custom-software-development",
        "Turn the agreed workflows into operational software.",
      ],
      [
        "mobile-application-development",
        "Carry the experience into the user’s hands.",
      ],
      [
        "website-design-development",
        "Connect the product experience to its digital introduction.",
      ],
    ],
  },
  "website-design-development": {
    team: "Creative direction · UX · Frontend · Content & enquiry flow",
    title: "Your brand, your offer and your next enquiry. Connected.",
    body: "A website is where several parts of the business meet. Our design, engineering and marketing capabilities let us connect the promise on the page to the experience and follow-up behind it.",
    connections: [
      ["branding-identity", "Give the website a clear identity and message."],
      [
        "digital-marketing-sales-enablement",
        "Align acquisition activity with the page people land on.",
      ],
      [
        "ai-automation-system-integration",
        "Carry enquiry context into the tools your team uses.",
      ],
    ],
  },
  "custom-software-development": {
    team: "Business analysis · Product design · Engineering · QA",
    title: "The business behind the customer experience.",
    body: "An application affects people, processes and other systems. We bring business analysis, interface design and engineering into the same conversation, so the software can fit the wider operation.",
    connections: [
      [
        "ui-ux-product-design",
        "Make business rules and complex tasks understandable.",
      ],
      [
        "mobile-application-development",
        "Extend the same workflow to customers or field teams.",
      ],
      [
        "ai-automation-system-integration",
        "Connect records, handoffs and existing tools.",
      ],
    ],
  },
  "mobile-application-development": {
    team: "Mobile engineering · Product design · Backend · QA",
    title: "One business. Wherever your people need it.",
    body: "The mobile experience should remain connected to the business behind it. Our mobile, design and backend teams can plan the app, the administration workflow and shared integrations as parts of one engagement.",
    connections: [
      [
        "ui-ux-product-design",
        "Design for real tasks, devices and interrupted journeys.",
      ],
      [
        "custom-software-development",
        "Build the administration and business logic behind the app.",
      ],
      [
        "ai-automation-system-integration",
        "Keep relevant systems and workflows connected.",
      ],
    ],
  },
  "ai-automation-system-integration": {
    team: "Workflow analysis · AI & integration · Technical review",
    title: "Connect the process. Give people room to do more.",
    body: "Automation works best when the process owner, engineer and reviewer understand the same task. We connect those perspectives to choose useful automation, handle exceptions and keep important decisions visible.",
    connections: [
      [
        "custom-software-development",
        "Connect automation to the applications doing the work.",
      ],
      [
        "digital-marketing-sales-enablement",
        "Preserve lead context through routing and follow-up.",
      ],
      [
        "technology-consulting-modernisation",
        "Review architecture and dependencies before expanding.",
      ],
    ],
  },
  "digital-marketing-sales-enablement": {
    team: "Strategy · Marketing execution · Creative · Sales journey",
    title: "Make the promise and the experience match.",
    body: "Campaigns depend on more than the media plan. Brand, creative, website and technical specialists can work alongside marketing to connect what people see, where they arrive and what happens after they enquire.",
    connections: [
      [
        "branding-identity",
        "Give the offer a consistent voice and visual identity.",
      ],
      [
        "website-design-development",
        "Create a relevant destination for the campaign.",
      ],
      [
        "ai-automation-system-integration",
        "Connect enquiries, ownership and the next action.",
      ],
    ],
  },
  "architectural-visualisation": {
    team: "Visual direction · CGI production · Review & finishing",
    title: "From a space imagined to a project understood.",
    body: "A visual can be a design conversation, a launch asset or the centre of a property website. Our visualisation team understands that wider use, and can connect with brand, website and marketing specialists when the project calls for it.",
    connections: [
      [
        "branding-identity",
        "Place the visuals within a coherent project identity.",
      ],
      [
        "website-design-development",
        "Create a digital experience around the property.",
      ],
      [
        "digital-marketing-sales-enablement",
        "Adapt approved visual assets for the launch journey.",
      ],
    ],
  },
  "technology-consulting-modernisation": {
    team: "Senior advisory · Specialist review · Implementation ownership",
    title: "A considered direction. People who can take it forward.",
    body: "Our advisor-supported model connects senior assessment with implementation capability. The engagement defines who advises, who builds and where specialist review belongs, so the recommendation has a practical next step.",
    connections: [
      [
        "custom-software-development",
        "Translate the agreed roadmap into application changes.",
      ],
      [
        "ai-automation-system-integration",
        "Resolve how systems, data and workflows connect.",
      ],
      [
        "ui-ux-product-design",
        "Keep the people using the system in the decision.",
      ],
    ],
  },
};
export const solutionConnections = {
  "property-launch-sales": {
    title: "One project story, from the first visual to the next enquiry.",
    body: "The same project facts should guide the visualisation, brand, website and campaign. A connected team can carry those decisions through the launch, with scope and approvals agreed at each stage.",
    handoffs: [
      [
        "Visualisation + brand",
        "Help people understand the place.",
        "Agree the views, project identity and material used to present it.",
      ],
      [
        "Website + marketing",
        "Give the story a destination.",
        "Bring approved visuals and a relevant message into the website and launch activity.",
      ],
      [
        "Enquiry + follow-up",
        "Keep the conversation connected.",
        "Capture the project interest and agree where the enquiry goes next.",
      ],
    ],
  },
  "connected-sales-operations": {
    title: "A shared view of the process, from enquiry to everyday work.",
    body: "Business analysis, software, integration and advisory expertise can examine the same workflow. That makes it easier to decide what to connect, what to automate and what still needs a person.",
    handoffs: [
      [
        "Business + advisory",
        "Understand the friction.",
        "Map the task, owners, systems, exceptions and decisions before changing tools.",
      ],
      [
        "Software + integration",
        "Connect the work.",
        "Plan the application changes, APIs and automation around the agreed process.",
      ],
      [
        "Review + operations",
        "Make ownership visible.",
        "Verify the journey and agree monitoring, escalation and maintenance.",
      ],
    ],
  },
  "digital-experience-product": {
    title:
      "The idea, the interface and the implementation stay in conversation.",
    body: "A digital product is shaped by the business, its users and the technology behind it. Our design and engineering teams can work from one brief, carrying decisions from discovery through release.",
    handoffs: [
      [
        "Discovery + design",
        "Make the experience clear.",
        "Define user tasks, content, business rules and the key journeys.",
      ],
      [
        "Design + engineering",
        "Build from the same intent.",
        "Connect prototypes, interfaces, backend requirements and integrations.",
      ],
      [
        "QA + release",
        "Finish the complete journey.",
        "Review responsive behaviour, edge cases, handover and the next phase.",
      ],
    ],
  },
};
