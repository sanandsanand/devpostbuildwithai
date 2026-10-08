---
doc: scope
status: approved
---

# Proof

An active-recall learning app that tests your knowledge by having you explain a concept, rather than taking a multiple-choice quiz.

## The Unique Kernel
The AI's ability to diagnose a user's *own explanation* (and their uploaded diagrams) to detect misconceptions and missing ideas, generating a personalized follow-up challenge instead of a generic score.

## Who It's For
School/college students and corporate professionals who want to challenge their understanding of coding and finance topics. They are tired of passive learning and want to truly test if they know their stuff.

## The Core Loop
The user enters a topic and explains it in a chatbox (can include uploading a mindmap or flowchart). The AI analyzes the explanation, identifies gaps, and asks a targeted follow-up question. The user re-explains, continuing the cycle.

## Inspiration & Identity
A focused, clean chat interface. (Specific aesthetics to be defined in PRD).

## Why This Matters to the Learner
To build a highly engaging and robust learning tool that centers around active explanation, utilizing the best available technologies.

## What "Working" Looks Like
A functional chat UI where a user types in a coding or finance concept (e.g., "how a for-loop works" or "compound interest") and attaches a quick diagram. The AI successfully spots a gap in their reasoning and pushes back with a relevant challenge question.

## The POC Boundary
- Text chat interface.
- Image uploads (for diagrams, flowcharts, mindmaps).
- Restricted strictly to coding and finance domains.

## Later
- Expanding to other topics beyond coding and finance.
- Heavy document parsing (PDFs, long notes, Word documents).

## Explicitly Cut
- Document/text file uploads: Kept out of the 2-4 hour hackathon scope to avoid the overhead of complex text parsing and chunking.
