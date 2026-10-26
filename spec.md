---
doc: spec
status: approved
---

# Proof — Technical Spec

## How This Works, In Plain Language
We are building a web-based chat application. The front-end is what the user sees—a beautiful, modern messaging interface built with React. When a user types a message or uploads an image, the front-end sends that data securely to our own small back-end server route. This route packages the user's message and their image, adds our secret instructions ("You are a relentless AI tutor..."), and forwards it all to Google's Gemini 1.5 Pro AI model. Gemini streams the response back to us piece by piece, and our app instantly displays those pieces on the screen like someone is typing.

## The Core Journey Through the System
1. **Load:** The user opens the app. The browser checks local storage for a saved chat. If found, it loads it; if not, it starts fresh with the greeting. (PRD ref: `prd.md > The Core Journey`).
2. **Input:** The user types an explanation and attaches a diagram. The front-end converts the diagram into a text-like format (base64 or a file payload) behind the scenes. 
3. **Transmission:** The user hits send. The Vercel AI SDK takes over, sending the text and image payload to our `/api/chat` route.
4. **AI Generation:** The `/api/chat` route calls Gemini 1.5 Pro with the payload and our system instructions.
5. **Streaming Response:** Gemini streams the answer back. The Vercel AI SDK receives this stream and automatically updates the chat interface in real-time, showing the AI's relentless challenge to the user.

## Stack
- **Framework:** Next.js (App Router) with React. Chosen because it cleanly handles both the beautiful front-end and the secure back-end API route in one project.
- **AI Integration:** Vercel AI SDK (`ai` and `@ai-sdk/google`). Chosen to eliminate the headache of manually writing text-streaming and image-parsing logic.
- **Styling:** Tailwind CSS. The fastest way to build a modern, clean messaging interface.
- **AI Model:** Google Gemini 1.5 Pro via Google AI Studio. Chosen for its excellent reasoning and top-tier vision capabilities for reading user diagrams.

## Where It Runs and How Someone Tries It
- **Local Run:** You will need Node.js installed and a `.env.local` file containing `GOOGLE_GENERATIVE_AI_API_KEY=your_key`. To start it, run `npm run dev` in the terminal and open `http://localhost:3000` in your browser. This is what you will record for your hackathon demo video.
- **Deployment (Optional):** We will deploy this to Vercel. It takes two clicks and securely stores your API key on their servers so anyone can try it live.

## Look and Feel
A sleek, premium aesthetic designed to feel like a final product. The app features a continuous, subtly breathing animated gradient background (indigo to teal) that gives the interface life. The chat interface is built with translucent glassmorphic elements—softly blurred chat bubbles and input bars that let the background colors shine through while maintaining perfect legibility for text and code. Scrollbars are entirely hidden to maintain a distraction-free, polished experience.

## Components

### Chat Interface (`app/page.tsx`)
The main client component. It holds the `useChat` hook from the Vercel AI SDK, which automatically manages the array of messages and handles user input (both text and files). It maps over the messages to render chat bubbles.
PRD ref: `prd.md > The Chat Interface`

### Message Bubble (`components/Message.tsx`)
A simple component to render an individual message, applying different styles depending on whether the sender is 'user' or 'assistant'. Renders attached image thumbnails if present.

### Chat API Route (`app/api/chat/route.ts`)
The server-side endpoint. It receives the conversation history and any attached images from the front-end, prepends the strict "Relentless Tutor" system prompt, and calls `streamText` to hit the Gemini API.
PRD ref: `prd.md > The Challenger AI`

## Data Model
- **State:** An array of `Message` objects managed completely by the Vercel AI SDK's `useChat` hook. Each message contains an `id`, `role` (user/assistant), `content` (the text), and an optional `data` array for attached images.
- **Persistence:** On the first load, we will hydrate the `useChat` initial messages from the browser's `localStorage` so a refreshed page doesn't lose the active session. Every time a new message arrives, we save the array back to `localStorage`.

## File Structure
```
project/
├── devpost/               # Devpost learning workspace
├── src/
│   ├── app/
│   │   ├── api/chat/
│   │   │   └── route.ts   # The backend AI API route
│   │   ├── globals.css    # Global Tailwind styles
│   │   ├── layout.tsx     # Next.js layout wrapper
│   │   └── page.tsx       # The main chat interface
│   └── components/
│       └── Message.tsx    # Visual component for a chat bubble
├── package.json
├── tailwind.config.ts
└── .env.local             # Local API keys (never committed)
```

## External Services and Dependencies
- **Google AI Studio (Gemini API):** Used for generating AI responses. Requires an API key from `aistudio.google.com`. Generous free tier is more than enough for development and the hackathon.
- **Vercel AI SDK:** Library used to connect Next.js and Gemini securely with streaming support.

## Important Failure Modes
- **Invalid/Missing API Key:** If the Gemini key is missing, the `/api/chat` route will throw a 500 error. The UI will catch this and display a red error message in the chat telling the user to check their API key.
- **Network Disconnect:** If the user loses internet while the AI is streaming, the stream stops. Since we persist to `localStorage`, the user can refresh the page and their history remains, allowing them to try sending their message again.

## What Was Simplified and Why
- **Local Storage over a Database:** Instead of setting up Postgres or MongoDB with user authentication to save "past conversations", we are just saving the *current* chat to `localStorage`. This keeps the POC focused entirely on the AI interaction loop without wasting hours on boilerplate database wiring.

## Decisions and Open Issues
- **Decision (Stack Choice):** We chose the Vercel AI SDK over manually writing Python `fetch` logic.
- **Learner Clarification:** The learner was initially indecisive about using the Vercel AI SDK. We clarified exactly what it abstracts away (manual chunk-by-chunk stream parsing and base64 image encoding), helping the learner confidently choose the SDK to protect the 2-4 hour hackathon timeline.
- **Open Issue:** None! We are ready to build.
