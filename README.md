# Proof — Relentless AI Tutor

An active-recall learning application that tests and deepens your technical understanding. Instead of taking passive multiple-choice quizzes, you explain coding and finance concepts in your own words or upload architecture diagrams and flowcharts. The AI diagnostic engine spots misconceptions and challenges your reasoning using the Socratic method.

---

## ✨ Features

- **The Relentless Socratic Engine:** Strictly diagnoses missing ideas, logical contradictions, and edge cases. Never just congratulates you—always pushes back with a calibrated challenge question.
- **Multimodal Diagram & Flowchart Inspection:** Upload system design flowcharts, mindmaps, or code diagrams. Built-in client-side `<canvas>` compression optimizes images under 150KB to preserve speed and quota.
- **Full-Screen Lightbox Preview:** Click any diagram in the chat or preview area to view it in high resolution.
- **Multiline Explanation Editor:** Auto-expanding input area supporting line breaks (<kbd>Shift</kbd> + <kbd>Enter</kbd>) and instant submission (<kbd>Enter</kbd>).
- **Safe Session Persistence:** Preserves your active session across page refreshes with sliding-window `localStorage` storage and defensive fallback quota protections.
- **Full-Bleed Edge-to-Edge UI:** Modern glassmorphic interface layered over a subtle topographical backdrop, with smooth auto-scrolling and a quick **New Chat** reset button.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **AI Model:** Google Gemini (`gemini-3.5-flash`) via [Google AI Studio](https://aistudio.google.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Markdown & Math Rendering:** `react-markdown`, `remark-math`, `rehype-katex`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanandsanand/devpostbuildwithai.git
   cd devpostbuildwithai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment file and add your Google Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_actual_gemini_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Build & Test

- **Run linter:**
  ```bash
  npm run lint
  ```

- **Build for production:**
  ```bash
  npm run build
  ```

---

## 📄 License

MIT
