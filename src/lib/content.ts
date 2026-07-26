/**
 * Single source of truth for all copy + data.
 * Derived from portfolio-content.md. Do not invent facts.
 */

export const site = {
  name: "Dev Chaudhari",
  firstName: "Dev",
  lastName: "Chaudhari",
  role: "Full-Stack & AI Engineer",
  headline: "I build production software end to end.",
  subcopy:
    "I design, build, and ship complete products — solo, from database to UI. AI platforms, full-stack web, cross-platform mobile, and a bit of blockchain.",
  location: "Ahmedabad, India",
  email: "devrchaudhari0@gmail.com",
  phone: "+91 93138 62764",
  phoneHref: "+919313862764",
  github: "https://github.com/devChaudhari7",
  githubHandle: "github.com/devChaudhari7",
  linkedin: "https://linkedin.com/in/devchaudhari2004",
  linkedinHandle: "linkedin.com/in/devchaudhari2004",
  leetcode: "https://leetcode.com/u/dev087/",
  leetcodeHandle: "leetcode.com/u/dev087",
  leetcodeUser: "dev087",
  status: "Building · open to internships",
  url: "https://devchaudhari.dev",
  /** filename is the download name a recruiter ends up with — keep it readable */
  resume: "/Dev-Chaudhari-Resume.pdf",
} as const;

export const nav = [
  { id: "work", label: "Work", href: "#work" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const about = {
  portrait: "/assets/me/portrait.jpg",
  paragraphs: [
    "I'm a Computer Science engineering student at Nirma University (and a Diploma topper before that) who learns by building real, complete products — not tutorials. I like owning a project end to end: designing the data model, building the backend, crafting the interface, and shipping it to production.",
    "My work spans AI/LLM platforms, full-stack web apps, cross-platform mobile, and a bit of blockchain. I've shipped a live AI SaaS solo in two weeks, built a social platform that runs on iOS and Android from a single codebase, and competed in national AI hackathons at IIT Gandhinagar and Nirma University. What ties it together is a focus on craftsmanship — clean architecture, secure multi-tenant systems, and interfaces that feel considered.",
  ],
  kicker: "I'm always building something. When I'm not, I'm probably figuring out how to ship the next thing faster and cleaner.",
} as const;

/* ---------------------------------- Skills ---------------------------------- */

export type ClusterId =
  | "frontend-mobile"
  | "backend-db"
  | "ai-ml"
  | "cloud-web3"
  | "languages"
  | "engineering";

export interface SkillCluster {
  id: ClusterId;
  label: string;
  short: string;
}

export const clusters: SkillCluster[] = [
  { id: "frontend-mobile", label: "Frontend & Mobile", short: "Frontend" },
  { id: "backend-db", label: "Backend & Databases", short: "Backend" },
  { id: "ai-ml", label: "AI / Machine Learning", short: "AI / ML" },
  { id: "cloud-web3", label: "Cloud, DevOps & Web3", short: "Cloud / Web3" },
  { id: "languages", label: "Languages", short: "Languages" },
  { id: "engineering", label: "Engineering", short: "Engineering" },
];

export interface Skill {
  id: string;
  label: string;
  cluster: ClusterId;
}

export const skills: Skill[] = [
  // Frontend & Mobile
  { id: "react", label: "React", cluster: "frontend-mobile" },
  { id: "nextjs", label: "Next.js", cluster: "frontend-mobile" },
  { id: "react-native", label: "React Native", cluster: "frontend-mobile" },
  { id: "expo", label: "Expo", cluster: "frontend-mobile" },
  { id: "tailwind", label: "Tailwind CSS", cluster: "frontend-mobile" },
  // Backend & Databases
  { id: "fastapi", label: "FastAPI", cluster: "backend-db" },
  { id: "nodejs", label: "Node.js", cluster: "backend-db" },
  { id: "express", label: "Express", cluster: "backend-db" },
  { id: "rest-apis", label: "REST APIs", cluster: "backend-db" },
  { id: "postgresql", label: "PostgreSQL", cluster: "backend-db" },
  { id: "postgis", label: "PostGIS", cluster: "backend-db" },
  { id: "mysql", label: "MySQL", cluster: "backend-db" },
  { id: "mongodb", label: "MongoDB", cluster: "backend-db" },
  { id: "redis", label: "Redis", cluster: "backend-db" },
  { id: "kafka", label: "Kafka", cluster: "backend-db" },
  { id: "supabase", label: "Supabase", cluster: "backend-db" },
  // AI / ML
  { id: "tensorflow", label: "TensorFlow", cluster: "ai-ml" },
  { id: "pytorch", label: "PyTorch", cluster: "ai-ml" },
  { id: "scikit-learn", label: "Scikit-learn", cluster: "ai-ml" },
  { id: "computer-vision", label: "Computer Vision", cluster: "ai-ml" },
  { id: "nlp", label: "NLP", cluster: "ai-ml" },
  { id: "llm-gemini", label: "LLM / Gemini", cluster: "ai-ml" },
  { id: "multimodal-ai", label: "Multimodal AI", cluster: "ai-ml" },
  // Cloud, DevOps & Web3
  { id: "aws", label: "AWS", cluster: "cloud-web3" },
  { id: "vercel", label: "Vercel", cluster: "cloud-web3" },
  { id: "docker", label: "Docker", cluster: "cloud-web3" },
  { id: "git", label: "Git & GitHub", cluster: "cloud-web3" },
  { id: "linux", label: "Linux", cluster: "cloud-web3" },
  { id: "cicd", label: "CI/CD", cluster: "cloud-web3" },
  { id: "eas", label: "EAS", cluster: "cloud-web3" },
  { id: "solidity", label: "Solidity", cluster: "cloud-web3" },
  { id: "hardhat", label: "Hardhat", cluster: "cloud-web3" },
  { id: "ethersjs", label: "Ethers.js", cluster: "cloud-web3" },
  { id: "erc721", label: "ERC-721", cluster: "cloud-web3" },
  { id: "ipfs", label: "IPFS", cluster: "cloud-web3" },
  { id: "metamask", label: "MetaMask", cluster: "cloud-web3" },
  // Languages
  { id: "python", label: "Python", cluster: "languages" },
  { id: "typescript", label: "TypeScript", cluster: "languages" },
  { id: "javascript", label: "JavaScript", cluster: "languages" },
  { id: "java", label: "Java", cluster: "languages" },
  { id: "sql", label: "SQL", cluster: "languages" },
  { id: "php", label: "PHP", cluster: "languages" },
  { id: "shell", label: "Shell", cluster: "languages" },
  // Engineering
  { id: "system-design", label: "System Design", cluster: "engineering" },
  { id: "multi-tenant", label: "Multi-Tenant Architecture", cluster: "engineering" },
  { id: "rls", label: "Row-Level Security", cluster: "engineering" },
  { id: "testing", label: "Automated Testing", cluster: "engineering" },
  { id: "architecture", label: "Software Architecture", cluster: "engineering" },
];

export const skillById = new Map(skills.map((s) => [s.id, s]));

/* --------------------------------- Projects --------------------------------- */

export interface ProjectFlowStep {
  label: string;
  note?: string;
}

export interface ProjectAssets {
  poster: string;
  /** light, muted loop for in-frame autoplay */
  videoPreview?: string;
  /** compressed full clip (with audio) for the lightbox */
  videoFull?: string;
  shots: string[];
}

const asset = (id: string, file: string) => `/assets/projects/${id}/${file}`;

export interface Project {
  id: string;
  index: string; // "01"
  name: string;
  tagline: string;
  year: string;
  frame: "phone" | "browser";
  lead: boolean;
  stack: string[]; // display tags
  bullets: string[];
  why: string;
  flow: ProjectFlowStep[]; // schematic architecture, left→right
  skills: string[]; // skill ids used (for network reconfigure)
  links: { live?: string; github?: string };
  proofLink?: { label: string; href: string }; // optional extra link (e.g. on-chain proof)
  embed?: boolean; // live site can be iframed → show an interactive embed in the device frame
  rating: number; // 0..1 — Trust Ring flourish
  assets?: ProjectAssets; // real media; falls back to a placeholder when absent
  accolade?: { label: string; gold?: boolean }; // hackathon / competition context
  flagged?: string; // placeholder note
}

export const projects: Project[] = [
  {
    id: "trustly",
    index: "01",
    name: "Trustly",
    tagline: "A reputation network for real life.",
    year: "2026",
    frame: "phone",
    lead: true,
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostGIS"],
    bullets: [
      "Cross-platform mobile app — profiles, reviews & ratings, a photo/video social feed, reels, follows, and threaded comments — all from one type-safe React Native codebase.",
      "A PostgreSQL/Supabase backend across 15 migrations with Row-Level Security and database triggers, enforcing a secure multi-tenant model across five profile types.",
      "Location-aware discovery with PostGIS: find providers within a chosen radius, ranked by a credibility-weighted Bayesian rating — with review-bombing and fake-account defenses so the ratings stay trustworthy.",
      "A custom design system (the “Trust Ring” — a profile's rating, drawn as a ring of light), push notifications, and an end-to-end EAS build pipeline producing signed releases.",
    ],
    why: "It's a full product — data, backend, mobile UI, and a real design language — not a prototype.",
    flow: [
      { label: "React Native app", note: "iOS + Android" },
      { label: "Supabase / RLS", note: "multi-tenant" },
      { label: "PostGIS", note: "geo discovery" },
      { label: "Bayesian rating", note: "Trust Ring" },
    ],
    skills: ["react-native", "expo", "typescript", "supabase", "postgresql", "postgis", "rls", "multi-tenant", "system-design", "eas"],
    links: { github: "https://github.com/devChaudhari7/Trustly" },
    rating: 0.96,
    assets: {
      poster: asset("trustly", "poster.jpeg"),
      videoPreview: asset("trustly", "demo-preview.mp4"),
      videoFull: asset("trustly", "demo-full.mp4"),
      shots: [1, 2, 3, 4, 5, 6].map((n) => asset("trustly", `shot-${n}.jpeg`)),
    },
  },
  {
    id: "mehfil",
    index: "02",
    name: "MEHFIL",
    tagline: "Don't scroll the library. Travel the groove.",
    year: "2026",
    frame: "browser",
    lead: true,
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Web Audio", "Generative Art"],
    bullets: [
      "Scroll-as-camera: native scroll (no hijacking) drives a pinned, GPU-only (transform/opacity) cinematic scene — dive into the record → travel the eras → drop the needle to play, then open into exploration.",
      "“The medium is the map” — palette, film grain, typography, and the central artifact all morph per decade (shellac 78 → vinyl 33⅓ → cassette → CD).",
      "Deterministic generative art: a seeded SVG record sleeve unique per track, plus a procedural “raga-light” bloom driven by each track's time-of-day and mood.",
      "Synthesized sound design (needle-drop, era ambience) with zero audio files — playback is embed-only via the YouTube IFrame API; multilingual-first (Devanagari / Gurmukhi / Bengali + Latin), WCAG AA, with full reduced-motion fallbacks.",
    ],
    why: "Not a Spotify clone — a singular, ownable interaction paradigm where the homepage is one continuous groove you travel by scrolling.",
    flow: [
      { label: "Dive in", note: "scroll = camera" },
      { label: "Travel eras", note: "shellac → CD" },
      { label: "Drop needle", note: "synth SFX" },
      { label: "Play", note: "YouTube embed" },
      { label: "Explore", note: "generative art" },
    ],
    skills: ["nextjs", "typescript", "tailwind", "react", "javascript", "architecture"],
    links: { live: "https://mehfil-dev.vercel.app", github: "https://github.com/devChaudhari7/mehfil" },
    embed: true,
    rating: 0.95,
  },
  {
    id: "fedchurnguard",
    index: "03",
    name: "FedChurnGuard",
    tagline: "Privacy-preserving federated churn prediction — no shared data.",
    year: "2026",
    frame: "browser",
    lead: true,
    stack: ["Python", "PyTorch", "Flower (FL)", "Solidity", "FastAPI", "Next.js"],
    bullets: [
      "Genuine cross-organization federated learning (Flower) on real, separately-owned datasets — telecom operators plus a streaming app, not one dataset artificially split — so companies train one churn model while raw customer data never leaves any silo.",
      "A permissioned blockchain audit layer (Solidity + geth Clique PoA, deployed to Ethereum Sepolia) that rejects 100% of boosted model-poisoning attacks and records retention offers immutably — verifiable on Etherscan.",
      "Record-level differential privacy (DP-SGD via Opacus) with verified ε-accounting, hardened against a strong LiRA membership-inference attack and defense.",
      "A closed, explainable loop — exact TreeSHAP explanations → counterfactual recourse → a DRAI-ranked retention offer logged on-chain — with a live interactive demo driven by the real federated model and a paper in IEEE Access format.",
    ],
    why: "A real cross-org system, not one dataset artificially split — the core finding is that the transferability of churn signal across organizations governs when federation helps vs. hurts.",
    flow: [
      { label: "Federated train", note: "Flower · silos" },
      { label: "DP-SGD", note: "Opacus · ε" },
      { label: "Blockchain audit", note: "rejects poison" },
      { label: "SHAP", note: "+ recourse" },
      { label: "On-chain offer", note: "Sepolia" },
    ],
    skills: ["python", "pytorch", "solidity", "ethersjs", "fastapi", "nextjs", "react", "system-design"],
    links: { live: "https://fedchurnguard.vercel.app" },
    embed: true,
    proofLink: { label: "On-chain proof", href: "https://sepolia.etherscan.io/address/0x92DBE7C05405D6fD4c723e1ac1481058a8BF1312" },
    rating: 0.95,
  },
  {
    id: "billai",
    index: "04",
    name: "BillAI",
    tagline: "AI invoicing on WhatsApp.",
    year: "2026",
    frame: "browser",
    lead: true,
    stack: ["Next.js", "TypeScript", "Google Gemini", "Supabase", "Twilio"],
    bullets: [
      "A multimodal AI pipeline (Google Gemini) that turns text, voice notes, and photos into structured invoice data — in Gujarati, Hindi, and English.",
      "A stateful WhatsApp chatbot (Twilio) with persistent conversation memory, plus a GST engine covering all 36 state codes with intra/inter-state tax logic.",
      "Automated GSTR-1 reports, payment reminders, and recurring invoices via scheduled jobs.",
      "A secure multi-tenant architecture (PostgreSQL Row-Level Security) integrating five external services; Lighthouse 95+ in production.",
    ],
    why: "Real users, real compliance rules, real AI — shipped end to end, fast. Built and deployed solo in two weeks.",
    flow: [
      { label: "WhatsApp", note: "text · voice · photo" },
      { label: "Twilio", note: "stateful bot" },
      { label: "Gemini", note: "multimodal" },
      { label: "Supabase / RLS", note: "GST engine" },
      { label: "Invoice", note: "GST-compliant" },
    ],
    skills: ["nextjs", "typescript", "llm-gemini", "multimodal-ai", "supabase", "postgresql", "rls", "multi-tenant", "vercel", "nlp"],
    links: { live: "https://billai-omega.vercel.app", github: undefined },
    embed: true,
    rating: 0.98,
    assets: {
      poster: asset("billai", "poster.png"),
      videoPreview: asset("billai", "demo-preview.mp4"),
      videoFull: asset("billai", "demo-full.mp4"),
      shots: [1, 2].map((n) => asset("billai", `shot-${n}.png`)),
    },
  },
  {
    id: "lexai",
    index: "05",
    name: "LexAI",
    tagline: "AI legal drafting & Aadhaar e-sign for Indian businesses.",
    year: "2026",
    frame: "browser",
    lead: true,
    stack: ["Next.js", "TypeScript", "Google Gemini", "Supabase", "Razorpay", "Twilio"],
    bullets: [
      "30 ready-to-use legal document templates across employment, business, real estate, freelance, and notices — each with India-specific clauses (jurisdiction, stamp duty, Indian Contract Act 1872).",
      "A Google Gemini drafting pipeline: describe a contract in plain English (or over WhatsApp) and it extracts the parties, terms, durations, and amounts, then renders a formatted PDF.",
      "AI risk analysis on contracts you receive — flags unfavorable, standard, and missing clauses with suggested negotiation wording.",
      "Aadhaar e-sign behind a swap-ready provider-adapter (mock mode for now): multi-party sequential signing with WhatsApp + email links and a full audit trail; plus a versioned document vault, Razorpay subscriptions, and CA-firm white-labeling.",
    ],
    why: "A second live SaaS on the BillAI playbook — real Indian legal compliance, an AI draft-and-analyze engine, and an e-sign adapter swappable via one env var.",
    flow: [
      { label: "Plain English", note: "web · WhatsApp" },
      { label: "Gemini", note: "extract terms" },
      { label: "Templates", note: "Indian law" },
      { label: "PDF", note: "formatted" },
      { label: "Aadhaar e-sign", note: "multi-party" },
    ],
    skills: ["nextjs", "typescript", "llm-gemini", "multimodal-ai", "supabase", "postgresql", "rls", "multi-tenant", "vercel", "nlp"],
    links: { live: "https://lexai-rho.vercel.app", github: "https://github.com/devChaudhari7/lexai" },
    embed: true,
    rating: 0.97,
    assets: {
      poster: asset("lexai", "poster.png"),
      videoPreview: asset("lexai", "demo-preview.mp4"),
      videoFull: asset("lexai", "demo-full.mp4"),
      shots: [1, 2, 3, 4, 5].map((n) => asset("lexai", `shot-${n}.png`)),
    },
  },
  {
    id: "voiceserve",
    index: "06",
    name: "VoiceServe",
    tagline: "AI voice ordering & analytics for restaurants.",
    year: "2026",
    frame: "browser",
    lead: false,
    stack: ["Next.js", "FastAPI", "Retell AI", "Supabase", "PostgreSQL"],
    bullets: [
      "A production-style Voice AI system that turns live customer phone calls into structured, analytics-ready restaurant orders — a Retell voice agent validates spoken items against the live menu and creates orders through FastAPI.",
      "A real-time upsell engine using association rule mining over transaction patterns to surface high-confidence combo and add-on recommendations mid-call.",
      "Focused FastAPI services for menu validation, order processing, and recommendations, backed by Supabase PostgreSQL for operational and analytics data.",
      "A Next.js dashboard that streams live order flow, conversion, and recommendation impact via Supabase Realtime (no polling); a closed-loop design learns from each completed order to sharpen future upsells.",
    ],
    why: "Closed-loop Voice AI — speech to validated order to real-time upsell to analytics, with every order improving the next.",
    flow: [
      { label: "Voice call", note: "Retell agent" },
      { label: "Menu validate", note: "FastAPI" },
      { label: "Upsell engine", note: "rule mining" },
      { label: "Supabase", note: "Realtime" },
      { label: "Dashboard", note: "live analytics" },
    ],
    skills: ["nextjs", "fastapi", "python", "supabase", "postgresql", "rest-apis", "nlp", "multimodal-ai", "system-design"],
    links: { live: "https://pet-pooja-kappa.vercel.app", github: "https://github.com/devChaudhari7/VoiceServe-PetPooja" },
    embed: true,
    rating: 0.93,
    assets: {
      poster: asset("voiceserve", "poster.png"),
      videoPreview: asset("voiceserve", "demo-preview.mp4"),
      videoFull: asset("voiceserve", "demo-full.mp4"),
      shots: [1, 2].map((n) => asset("voiceserve", `shot-${n}.png`)),
    },
    accolade: { label: "HACKaMINeD '26 · National Hackathon" },
  },
  {
    id: "hireai",
    index: "07",
    name: "HireAi",
    tagline: "AI-powered technical hiring.",
    year: "2026",
    frame: "browser",
    lead: false,
    stack: ["Python", "FastAPI", "Machine Learning", "MySQL"],
    bullets: [
      "ML-based resume parsing and a weighted ranking algorithm that scores candidates objectively.",
      "Adaptive MCQ and coding assessments with real-time performance scoring.",
      "A modular FastAPI backend with secure authentication, role-based access control, and a clean, documented API designed for future AI modules.",
    ],
    why: "Applies ML to a messy, real-world problem with a clean systems design.",
    flow: [
      { label: "Resume intake", note: "parsing" },
      { label: "ML ranking", note: "weighted" },
      { label: "Assessments", note: "adaptive" },
      { label: "Shortlist", note: "ranked" },
    ],
    skills: ["python", "fastapi", "mysql", "scikit-learn", "nlp", "rest-apis", "system-design", "architecture"],
    links: { github: "https://github.com/devChaudhari7/HireAi-V1" },
    rating: 0.9,
    assets: {
      poster: asset("hireai", "poster.png"),
      videoPreview: asset("hireai", "demo-preview.mp4"),
      videoFull: asset("hireai", "demo-full.mp4"),
      shots: [1, 2, 3, 4].map((n) => asset("hireai", `shot-${n}.png`)),
    },
    accolade: { label: "Codeversity '26 · National Hackathon" },
  },
  {
    id: "blockestate",
    index: "08",
    name: "BlockEstate",
    tagline: "Decentralized real estate marketplace.",
    year: "2024",
    frame: "browser",
    lead: false,
    stack: ["Solidity", "Hardhat", "Ethers.js", "React", "IPFS"],
    bullets: [
      "ERC-721 NFT smart contracts (Solidity) that tokenize each property for transparent, trustless ownership transfer.",
      "Automated test suites with Hardhat validating contract correctness and edge cases on a local network before deployment.",
      "IPFS for decentralized media storage and MetaMask for wallet authentication; a React + Tailwind dApp frontend.",
    ],
    why: "Trustless ownership, real smart-contract engineering and testing.",
    flow: [
      { label: "ERC-721", note: "tokenize" },
      { label: "Hardhat", note: "tested" },
      { label: "IPFS", note: "media" },
      { label: "MetaMask", note: "wallet auth" },
    ],
    skills: ["solidity", "hardhat", "ethersjs", "erc721", "ipfs", "metamask", "react", "tailwind", "testing"],
    links: { github: "https://github.com/devChaudhari7/Real-estate-blockchain-project" },
    rating: 0.86,
    assets: {
      poster: asset("blockestate", "poster.png"),
      videoPreview: asset("blockestate", "demo-preview.mp4"),
      videoFull: asset("blockestate", "demo-full.mp4"),
      shots: [1, 2, 3, 4].map((n) => asset("blockestate", `shot-${n}.png`)),
    },
  },
];

export const projectById = new Map(projects.map((p) => [p.id, p]));

/* --------------------------------- GenAI Lab -------------------------------- */

/** A measured result. `from` is present only where a real baseline was recorded. */
export interface LabMetric {
  label: string;
  from?: string;
  to: string;
}

export interface LabExperiment {
  id: string;
  index: string; // "E1"
  name: string;
  blurb: string;
  stack: string[];
  /** Only numbers actually measured and committed in the repo. */
  metrics?: LabMetric[];
  note?: string;
  live?: string;
  code?: string;
  /** eval still to run — shown honestly instead of inventing numbers */
  pending?: string;
}

export const labIntro =
  "Six GenAI systems built to be defended, not demoed — each with a real eval harness, measured numbers, and a study guide. Three run live; open one and try it.";

export const labExperiments: LabExperiment[] = [
  {
    id: "research-assistant",
    index: "E1",
    name: "Multi-Agent Research Assistant",
    blurb:
      "A LangGraph agent team answers from the live web with verifiable citations: a planner decomposes the question, parallel researchers search and read sources, a writer synthesises a cited report.",
    stack: ["LangGraph", "Groq / Gemini", "DuckDuckGo", "trafilatura", "Streamlit"],
    note: "Every external call is expendable, the run is not — a 7-step retry/fallback ladder (backoff, JSON self-repair, search and fetch fallbacks) keeps a run alive through failures.",
    pending: "citation-validity eval running",
    live: "https://dev-research.streamlit.app/",
  },
  {
    id: "support-agent",
    index: "E2",
    name: "Support Agent with Long-Term Memory",
    blurb:
      "A support agent that remembers: per-user memory in a vector store, ticket classification, tool calls against mock CRM/order APIs, and confidence-based escalation to a human.",
    stack: ["Vector memory", "Tool calling", "FastAPI mocks", "Python"],
    pending: "scenario eval to run",
  },
  {
    id: "finetuned-slm",
    index: "E3",
    name: "Fine-Tuned Small Language Model",
    blurb:
      "QLoRA fine-tune of Llama-3.2-1B on ~27k customer-support conversations, so a 0.8 GB model that runs privately on a laptop replies in-format instead of rambling.",
    stack: ["QLoRA", "Llama-3.2-1B", "PEFT", "GGUF + Ollama"],
    metrics: [
      { label: "ROUGE-L F1", from: "0.2374", to: "0.4418" },
      { label: "BERTScore F1", from: "0.8680", to: "0.9197" },
    ],
    note: "Beats the base model on 95% of 300 held-out cases. Trained in 22 min on one consumer GPU, exported to GGUF — total cost $0.",
  },
  {
    id: "hybrid-rag",
    index: "E4",
    name: "Hybrid RAG over Legal Contracts",
    blurb:
      "Retrieval over 438 pages of SEC-filed contracts: BM25 + dense embeddings fused by Reciprocal Rank Fusion, then cross-encoder reranking, with page-level citations on every claim.",
    stack: ["ChromaDB", "BM25 + dense", "RRF", "Cross-encoder", "RAGAS"],
    metrics: [
      { label: "Hit-rate@5", from: "60.0%", to: "65.7%" },
      { label: "Refusal accuracy", to: "100%" },
    ],
    note: "Cut false refusals 33% vs a dense-only baseline; 96% of answers carried well-formed [contract, p.N] citations.",
  },
  {
    id: "text-to-sql",
    index: "E5",
    name: "Self-Correcting Text-to-SQL",
    blurb:
      "Natural language to SQL that fixes itself: generated queries run read-only, and SQLite errors or empty result-sets are fed back to the model for up to three corrective attempts.",
    stack: ["Groq llama-3.3-70b", "Spider benchmark", "SQLite", "Streamlit"],
    note: "SELECT-only executor with a query watchdog and a deterministic mock provider — the whole correction loop verified by 9/9 offline behavioural tests before any API spend.",
    pending: "execution-accuracy benchmark to run",
    live: "https://dev-textsql.streamlit.app/",
  },
  {
    id: "eval-guardrails",
    index: "E6",
    name: "LLM Eval Harness & Guardrails",
    blurb:
      "The safety net for the rest of the lab: deterministic metrics plus an LLM judge score a RAG pipeline, while explainable input guardrails catch prompt injection and toxicity.",
    stack: ["LLM-as-judge", "Guardrails", "CI gate", "Streamlit"],
    metrics: [
      { label: "Injection detection", to: "89.8% acc · 8.3% FPR" },
      { label: "Toxicity detection", to: "96.7% acc · 0% FPR" },
    ],
    note: "Case-level regression gate caught what the aggregate hid — a change that lifted refusal accuracy 70%→80% while silently breaking a previously-correct case.",
    live: "https://dev-guardrails.streamlit.app/",
  },
];

/* ------------------------------- Experience -------------------------------- */

export interface TimelineItem {
  id: string;
  kind: "work" | "education";
  title: string;
  org: string;
  meta: string;
  period: string;
  bullets: string[];
}

export const timeline: TimelineItem[] = [
  {
    id: "alvi",
    kind: "work",
    title: "Full Stack Developer Intern",
    org: "Alvi Software Pvt. Ltd.",
    meta: "Ahmedabad, Gujarat",
    period: "May 2026 – Jul 2026",
    bullets: [
      "Built across the stack in a production codebase — front-end interfaces (HTML, CSS, JavaScript) and back-end services — during a two-month full-stack internship.",
      "Handled database management and SQL alongside REST API integration, debugging, and general software development tasks.",
      "Collaborated with the development team to deliver assigned work to schedule, gaining practical end-to-end experience in full-stack application development.",
    ],
  },
  {
    id: "brainybeam",
    kind: "work",
    title: "Software Development Intern (Android)",
    org: "BrainyBeam Technologies Pvt. Ltd.",
    meta: "Ahmedabad",
    period: "Jul 2023 – Aug 2023",
    bullets: [
      "Built Android screens in a production codebase under senior engineers — registration, login, and profile management — with input validation and native date-picker integration.",
      "Worked with Git version control and code-review workflows to ship maintainable modules.",
    ],
  },
  {
    id: "infolabz",
    kind: "work",
    title: "Software Development Intern",
    org: "InfoLabz",
    meta: "Ahmedabad",
    period: "Aug 2022 – Sep 2022",
    bullets: [
      "Built web and backend modules against real client requirements, contributing tested, deployment-ready business logic.",
      "Worked the full software development lifecycle, from requirements to deployment.",
    ],
  },
  {
    id: "nirma",
    kind: "education",
    title: "B.Tech, Computer Science",
    org: "Nirma University",
    meta: "CGPA 8.34 / 10",
    period: "Jul 2024 – Jul 2027",
    bullets: ["Computer Science engineering — systems, architecture, and applied AI."],
  },
  {
    id: "polytechnic",
    kind: "education",
    title: "Diploma, Information Technology",
    org: "Government Polytechnic Ahmedabad",
    meta: "CGPA 9.71 / 10 — Topper",
    period: "2021 – 2024",
    bullets: ["Graduated top of the program in Information Technology."],
  },
];

/* ------------------------------ Achievements ------------------------------- */

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  date: string;
  highlight?: boolean; // gold
  credentialId?: string;
  credentialUrl?: string;
  /** scan of the certificate — drop files in /public/assets/certificates/ */
  image?: string;
}

export const achievements: Achievement[] = [
  {
    id: "aws-cloud-foundations",
    title: "AWS Academy Graduate — Cloud Foundations",
    detail:
      "Amazon Web Services · 20 course hours across compute, storage, networking, and security fundamentals",
    date: "Apr 2026",
    highlight: true,
    credentialUrl: "https://www.credly.com/go/Ub7LwnCO",
    image: "/assets/certificates/aws.png",
  },
  {
    id: "gcloud-badges",
    title: "19 Google Cloud Skill Badges",
    detail:
      "Google Cloud Skills Boost · hands-on labs across GenAI (Vertex AI prompt design, Gemini + Streamlit), compute & networking, storage, Pub/Sub, Cloud Functions, Looker & Dataplex",
    date: "Oct 2025",
    credentialUrl: "https://www.credly.com/users/dev087",
  },
  {
    id: "claude-101",
    title: "Claude 101",
    detail: "Anthropic · working effectively with Claude",
    date: "2026",
    credentialUrl: "/assets/certificates/claude-101.pdf",
  },
  {
    id: "claude-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    detail: "Anthropic · principles and practice for working fluently with AI",
    date: "2026",
    credentialUrl: "/assets/certificates/claude-ai-fluency.pdf",
  },
  {
    id: "hackamined",
    title: "HACKaMINeD 2026 — National Hackathon",
    detail:
      "Nirma University × Binghamton University · AI-Powered Revenue & Voice Copilot for Restaurants (Petpooja track)",
    date: "Mar 2026",
    credentialId: "d1655fc6-d1c9-482b-819c-18da8f5749d0",
    credentialUrl:
      "https://verification.givemycertificate.com/v/d1655fc6-d1c9-482b-819c-18da8f5749d0",
    image: "/assets/certificates/hackamined.png",
  },
  {
    id: "codeversity",
    title: "Codeversity National Hackathon 2026",
    detail: "Artificial Intelligence domain · Team TechNova · IIT Gandhinagar",
    date: "Feb 2026",
    credentialId: "COD1224VER",
    image: "/assets/certificates/codeversity.png",
  },
  {
    id: "dlai",
    title: "Machine Learning Specialization",
    detail: "DeepLearning.AI & Stanford Online on Coursera · 3-course specialization",
    date: "Oct 2025",
    credentialId: "TONYR3Z0525Y",
    // certificate is a PDF, so it opens directly rather than in the image lightbox
    credentialUrl: "/assets/certificates/coursera-ml-specialization.pdf",
  },
  {
    id: "ssip",
    title: "SSIP — New India Vibrant Hackathon 2023",
    detail:
      "Team CheatBot · Government Polytechnic Ahmedabad · Regional round at Anant National University",
    date: "Nov 2023",
    credentialId: "TM001240",
    image: "/assets/certificates/ssip.png",
  },
];
