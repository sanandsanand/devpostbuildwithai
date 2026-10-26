---
doc: prd
status: approved
---

# Proof — Product Requirements

An active-recall learning chat app for students and professionals to challenge their understanding of coding and finance topics.
*Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`*

## The Core Journey
1. The user opens the app and sees a chat interface with a friendly greeting and a clear warning that conversations are currently limited to coding and finance topics.
2. The user types out an explanation of a concept they want to test themselves on (and can optionally attach a diagram or flowchart).
3. They see a thumbnail preview of their attached image above the chatbox, confirming it's ready, and hit send.
4. The AI analyzes the input and responds with a targeted challenge that pushes the user beyond their current understanding—even if their initial explanation was completely correct.
5. The user replies, and the relentless active recall loop continues.

## Screens and Layout
A single, full-screen modern chat interface. The main area displays the message history. At the bottom is an input bar with a text area, an attachment button, and a send button. When an image is attached, a small preview area appears just above the input bar.

## Look and Feel
A friendly, modern messaging app vibe. Clean and accessible, providing a comfortable visual contrast to the intense, challenging nature of the AI's questions.

## Features and Behavior

### The Chat Interface
- Users can type text and attach an image to send to the AI.
- **Acceptance Criterion:** When a user selects an image to upload, a thumbnail preview appears above the chat input box *before* they send the message.
- **Acceptance Criterion:** The user can see both their own messages (with images if attached) and the AI's responses in a scrolling chat history.

### The Challenger AI
- The AI acts as a relentless tutor that diagnoses missing ideas or misconceptions. 
- **Acceptance Criterion:** If a user provides a perfect explanation, the AI does not simply congratulate them; it asks a significantly harder follow-up question to push their limits.
- **Acceptance Criterion:** The AI refuses to engage deeply on topics outside of coding and finance.

## States and Boundaries
- **First Use:** The user sees an empty chat with the initial greeting and the topic restriction warning.
- **Interrupted Session:** If the user refreshes the page due to a network drop or unexpected error, the current chat history remains on screen. They do not lose their place.
- **Scope Boundary:** The app handles only one active conversation at a time.

## Product Decisions
- **Session Persistence:** We decided to ensure the *current* chat survives a page refresh to handle errors gracefully, but explicitly deferred a full "past conversations" sidebar to protect the 2-4 hour build timeline.
- **Relentless AI:** Decided the AI should never just say "Good job" and end the chat; it must always push the user further to maintain the active recall loop.

## What We're Building
- The single-page chat UI with a modern messaging aesthetic.
- Image attachment logic and preview UI.
- Local session persistence (survives a page reload).
- The specific AI prompt engineering to enforce the challenging persona and topic restrictions.

## Deferred From the POC
- A sidebar or menu to save, name, and load multiple past conversation histories.
- Uploading and parsing heavy documents (PDFs, Word docs, long text notes).

## Non-Goals
- Expanding to general knowledge topics.
- User authentication or accounts.
- A complex backend database.

## Open Questions
None.
