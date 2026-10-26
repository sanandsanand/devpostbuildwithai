# AI Briefing & Context Document: "Proof — Relentless AI Tutor"

> **Instructions for the AI assistant reading this document:**
> You are an expert technical product marketer and hackathon demo coach. Your task is to write a compelling, high-energy, timed demonstration video script (between 2 to 3 minutes) for the project described below. 
> Use the details, architecture, user journeys, and demonstration flows in this document to craft a script complete with speaker cues, on-screen stage directions, visual actions, and talking points.

---

## 1. Project Overview & Elevator Pitch

- **Product Name:** Proof — Relentless AI Tutor
- **Tagline:** The active-recall AI tutor that diagnoses your technical explanations and diagrams through relentless Socratic interrogation.
- **Hackathon:** Devpost "Build With AI: Basics" Hackathon.
- **The Core Problem:** **"The Illusion of Competence" (Tutorial Hell).**
  - Learners watch hours of coding videos, read system design blogs, or ask passive chatbots like ChatGPT for solutions.
  - Traditional chatbots act as polite sycophants—they answer your questions, solve your code, or shower you with praise ("Great job! That's correct!").
  - The result? Learners feel confident until they face an actual technical interview or production bug, where they struggle to explain mechanisms or defend architectural decisions.
- **The Solution:** **Proof flips the script.**
  - Instead of answering your questions, Proof makes **you** explain the concept in your own words or upload your architecture diagrams.
  - The AI acts as a relentless Socratic diagnostic engine: it deliberately hunts for missing mechanisms, logical contradictions, and unhandled edge cases.
  - It **never** gives you the answer. It **never** congratulates you. It spots the crack in your foundation and forces you to confront it with a calibrated challenge.

---

## 2. The Unique Kernel & Socratic Loop

Proof operates on a strict **Explain → Diagnose → Challenge** loop:

```
[User Explains / Uploads Diagram]
           ↓
[Diagnostic Phase (Internal)]
AI inspects logic, assumptions, and edge cases
           ↓
[Confront Phase (External)]
AI highlights the exact flaw or contradiction
(No direct answers, no spoon-feeding)
           ↓
[Challenge Phase (External)]
AI asks a sharp, calibrated scenario question to test deeper understanding
```

### Strict System Prompt Directives
1. **Refuse Generic Praise:** Even if the user's explanation is 100% correct, the AI will not say "Good job!" It immediately escalates to a harder, real-world edge case (e.g., concurrency, memory leaks, failure modes).
2. **Domain Specialization:** Strictly bound to **Technical Concepts** (Data Structures, Algorithms, Distributed Systems, Software Engineering) and **Finance/Economics**. Off-topic inquiries (e.g., cooking recipes, trivia) are firmly deflected back to technical topics.
3. **Punchy Delivery:** Strictly limited to 2–3 short, incisive paragraphs ending with a challenge question—no overwhelming walls of text.

---

## 3. Key Features to Showcase in the Demo

### 1. Multimodal Diagram & Flowchart Interrogation
- **What it does:** Users can attach architecture diagrams, database schemas, or system flowcharts alongside their explanation.
- **Engineering highlight:** Client-side HTML5 `<canvas>` compression engine (`src/utils/image.ts`) automatically resizes diagrams to 1024px and compresses them under 150KB before streaming, preventing API quota bloat and latency.
- **UI Experience:** Instant image thumbnail preview above the chatbox before sending, plus a full-screen glassmorphic lightbox preview on click.

### 2. Socratic Diagnostic Engine with Visual Feedback
- **What it does:** While the AI evaluates your response, a custom animated indicator (`"Diagnosing your explanation..."` with bouncing beacons) builds anticipation before the challenge streams in.
- **Streaming:** Token-by-token streaming powered by Vercel AI SDK and Google Gemini for real-time responsiveness.

### 3. Resilient Session Architecture
- **What it does:** Refreshing the browser or losing network connection does not wipe out your active debate.
- **Engineering highlight:** Capped sliding-window `localStorage` persistence (defensively pruned to prevent quota overflow) restores state seamlessly on page load. A dedicated top-bar "New Chat" glass pill button lets users reset the session at will.

### 4. Distraction-Free, Glassmorphic User Interface
- Full-bleed edge-to-edge UI layered over a subtle topographical canvas.
- Translucent frosted glass containers (`backdrop-blur-xl`) with custom hidden scrollbars.
- Auto-expanding multiline explanation editor (<kbd>Enter</kbd> to submit, <kbd>Shift</kbd> + <kbd>Enter</kbd> for multi-paragraph explanations).
- Native KaTeX mathematical / algorithmic equation formatting (`rehype-katex`, `remark-math`).

---

## 4. Technical Architecture & Tech Stack

| Layer | Technology | Why It Was Chosen |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) & React 19 | Fast full-stack architecture handling both reactive UI and streaming API routes in one unified codebase. |
| **AI Model** | Google Gemini 3.5 Flash via Google AI Studio | Industry-leading multimodal reasoning, rapid token streaming, and strong visual comprehension of diagrams. |
| **AI Integration** | Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`) | Clean streaming protocol (`streamText`), UI state management (`useChat`), and multimodal part handling. |
| **Styling** | Tailwind CSS v4 & Glassmorphism | Ultra-lightweight modern design system with polished backdrop blurs and fluid animations. |
| **Math & Markdown** | `react-markdown`, `remark-math`, `rehype-katex` | Crisp rendering of code blocks, algorithms, and mathematical formulas. |
| **Client Compression** | Custom HTML5 Canvas Engine | Compresses 5MB photos/diagrams down to ~120KB Base64 data URLs client-side. |

---

## 5. Recommended Live Demonstration Flow (2–3 Minutes)

When generating the demo script, structure it around these 5 beats:

### Beat 1: The Hook (0:00 – 0:35)
- Open on the speaker addressing the audience.
- *"We’ve all experienced 'tutorial hell' and the illusion of competence. You ask ChatGPT to explain a concept, nod along, and think you've learned it. But in a real technical interview or system outage, passive knowledge fails."*
- Introduce **Proof**: *"The AI tutor that doesn't answer your questions—it forces you to prove what you know."*

### Beat 2: The Core Loop — QuickSort or Concurrency (0:35 – 1:15)
- **On Screen:** Navigate to `http://localhost:3000`.
- Click the suggestion chip: *"Explain the time complexity of QuickSort."*
- Type a standard, common-sense answer: *"QuickSort is always O(n log n) because it uses divide-and-conquer to partition arrays around a pivot."*
- **Action:** Hit send. Show the *"Diagnosing your explanation..."* indicator.
- **The AI's Response:** Show how the AI immediately pounces on the misconception:
  - *"You claimed QuickSort is always O(n log n). What happens when the input is already sorted and you pick the first element as the pivot? What does your recursion tree look like then?"*
- Highlight: The AI didn't give the answer; it trapped the user in their own logical gap.

### Beat 3: Multimodal Vision — Architecture Diagram (1:15 – 2:00)
- **Action:** Click the paperclip icon and attach a database or cloud architecture flowchart.
- Show the pre-send thumbnail preview and the lightbox zoom.
- Type: *"Here is my microservices architecture using an in-memory Redis cache in front of Postgres to handle peak user sessions."*
- **The AI's Response:** The AI analyzes the uploaded image:
  - *"Looking at your diagram: if your Redis cache node restarts during peak load, what stops your relational database from suffering a cache stampede and failing completely?"*
- Emphasize: Proof reads technical diagrams and stress-tests architecture against real engineering bottlenecks.

### Beat 4: Engineering Polish & Robustness (2:00 – 2:30)
- Showcase client-side `<canvas>` image optimization (keeping latency low).
- Refresh the browser (<kbd>Ctrl+R</kbd>) to prove the session seamlessly restores via `localStorage`.
- Highlight the tech stack: Google Gemini 3.5 Flash, Vercel AI SDK, and Next.js 16.

### Beat 5: The Closing & Vision (2:30 – 3:00)
- Summarize the educational impact: Moving from passive consumption to active recall and Socratic mastery.
- Call to action: *"Stop asking AI for answers. Start using Proof to test your limits."*

---

## 6. Project File Structure Reference
```
buildWithAI/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts      # Serverless route running Gemini 3.5 Flash via Vercel AI SDK
│   │   ├── layout.tsx             # Root layout with topographical background & Geist font
│   │   ├── page.tsx               # Entry page rendering the Chat component
│   │   └── globals.css            # Tailwind CSS styling
│   ├── components/
│   │   ├── Chat.tsx               # Main chat UI, image attachment, localStorage persistence
│   │   └── Message.tsx            # Glassmorphic chat bubble with Markdown & KaTeX support
│   └── utils/
│       └── image.ts               # Canvas-based client-side image compression
├── public/
│   ├── bg-topo-light.jpg          # Subtle light topographical background
│   └── hex-yellow-bold.png        # Official Proof hexagon logo
└── devpost/
    ├── prd.md                     # Product Requirements Document
    ├── spec.md                    # Technical Specification Document
    └── checklist.md               # Build checklist & iterative styling log
```

---

*This document contains all necessary technical context, user stories, product logic, and presentation beats to craft an outstanding demonstration script.*
