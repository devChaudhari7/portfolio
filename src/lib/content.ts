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
  status: "Building · open to internships",
  url: "https://devchaudhari.dev",
} as const;

export const nav = [
  { id: "work", label: "Work", href: "#work" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const about = {
  paragraphs: [
    "I'm a Computer Science engineering student at Nirma University (and a Diploma topper before that) who learns by building real, complete products — not tutorials. I like owning a project end to end: designing the data model, building the backend, crafting the interface, and shipping it to production.",
    "My work spans AI/LLM platforms, full-stack web apps, cross-platform mobile, and a bit of blockchain. I've shipped a live AI SaaS solo in two weeks, built a social platform that runs on iOS and Android from a single codebase, and placed in the Top 10 nationally in an AI hackathon. What ties it together is a focus on craftsmanship — clean architecture, secure multi-tenant systems, and interfaces that feel considered.",
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
  rating: number; // 0..1 — Trust Ring flourish
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
  },
  {
    id: "billai",
    index: "02",
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
    rating: 0.98,
  },
  {
    id: "lexai",
    index: "03",
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
    rating: 0.97,
  },
  {
    id: "hireai",
    index: "04",
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
  },
  {
    id: "blockestate",
    index: "05",
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
  },
];

export const projectById = new Map(projects.map((p) => [p.id, p]));

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
    meta: "CGPA 8.19 / 10",
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
}

export const achievements: Achievement[] = [
  {
    id: "codeversity",
    title: "Top 10 Nationally",
    detail: "Codeversity National Hackathon — AI Domain",
    date: "Feb 2026",
    highlight: true,
  },
  {
    id: "sih",
    title: "Smart India Hackathon 2024 Finalist",
    detail: "Team CheatBot, for Bharat Electronics Limited",
    date: "2024",
  },
  {
    id: "ssip",
    title: "SSIP — New India Vibrant Hackathon",
    detail: "Recognized under Gujarat's Student Startup & Innovation Policy",
    date: "Nov 2023",
  },
  {
    id: "dlai",
    title: "Machine Learning Certification",
    detail: "DeepLearning.AI on Coursera",
    date: "Oct 2025",
  },
];
