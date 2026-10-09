---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Next.js Scaffold and Basic AI Chat**
  Becomes usable: A running app where you can type a message into a chatbox, send it, and get a basic response back from Gemini.
  Why now: Proves the whole path end to end—Next.js scaffold, Vercel AI SDK integration, and Gemini API connection.
  PRD ref: `prd.md > The Core Journey` (steps 1-3)
  Spec ref: `spec.md > Components`, `spec.md > External Services and Dependencies`
  Build: Scaffold Next.js project with Tailwind, install `ai` and `@ai-sdk/google`, build the basic `/api/chat` route, and create the `useChat` UI in `app/page.tsx` avoiding purple colors.
  Verify (mechanical): Start the dev server, ensure no errors, type "Hello" and receive a response from the AI.
  Learner check: Open the local server, send a message, and confirm the chat bubbles appear and the AI replies.
  Commit: `Scaffold Next.js app and basic Vercel AI chat`

- [x] **2. The Relentless Challenger Persona (The Kernel)**
  Becomes usable: The AI stops being a helpful assistant and strictly acts as the relentless tutor, challenging the user on coding/finance and refusing other topics.
  Why now: This is the unique kernel of the app. We must prove the prompt engineering works on plain text before complicating it with images.
  PRD ref: `prd.md > The Challenger AI`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Chat API Route`
  Build: Update `/api/chat/route.ts` with the strict system prompt enforcing the persona, the domain limits (coding/finance), and the rule to challenge even perfect answers.
  Verify (mechanical): Ask about a recipe (should refuse). Explain a for-loop perfectly (should challenge).
  Learner check: Explain a coding concept to the AI and confirm it pushes back with a harder question instead of just congratulating you.
  Commit: `Implement relentless challenger persona`

- [x] **3. Image Attachments for Flowcharts**
  Becomes usable: Users can attach an image, see a preview above the chatbox, and the AI correctly "reads" the diagram to challenge them.
  Why now: Adds the multimodal vision requirement to the already stable chat loop.
  PRD ref: `prd.md > The Chat Interface`
  Spec ref: `spec.md > Chat Interface`
  Build: Add a file input to the UI, display the thumbnail preview if a file is selected, and pass the image data to the `useChat` hook when submitted.
  Verify (mechanical): Upload a test image with text, send it, and confirm the AI receives and acknowledges the visual content.
  Learner check: Attach an image, verify the preview appears before sending, and see if the AI successfully reads the diagram.
  Commit: `Add image attachment and preview UI`

- [x] **4. Local Storage Persistence**
  Becomes usable: If you refresh the page or lose internet, the current chat history is preserved.
  Why now: Completes the final PRD boundary requirement for session recovery.
  PRD ref: `prd.md > States and Boundaries`
  Spec ref: `spec.md > Data Model`
  Build: Hydrate `useChat`'s `initialMessages` from `localStorage`, and save the message array to `localStorage` whenever it changes.
  Verify (mechanical): Send a message, refresh the browser window, and confirm the message history is still visible.
  Learner check: Refresh the page mid-conversation and confirm you didn't lose your place.
  Commit: `Persist active chat session to local storage`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after Slice 2 (Persona)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: 
Route and stops: 
Edit outcome: 
Reflection: 
Activity mode: 

## Revisions

