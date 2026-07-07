# 00-MASTER.md — Global Rules for AI Agents

## Core Principles

1. **Follow the phase order strictly.** Never skip a phase. Each phase must be completed and approved before moving to the next.
2. **No coding before PRD is finalized.** The PRD (13-PRD.md) must be reviewed and approved before any implementation begins.
3. **Always review previous outputs.** Before starting a new phase, read the output of the previous phase to ensure continuity.
4. **Save outputs to the correct location.** Each phase specifies its output directory. Follow it exactly.
5. **Never overwrite files without reason.** If a file already exists and you need to modify it, document why. If unsure, ask.
6. **When in conflict, ask first.** If requirements are ambiguous or contradictory, stop and seek clarification.
7. **One phase at a time.** Complete the current phase fully before starting the next. No parallel phase work.
8. **Commit to quality.** Every output must be reviewed against the checklist in the phase file before marking complete.

## Gating Rules

- Phase `N` can only begin after phase `N-1` is marked **done**.
- A phase is **done** only when all items in its checklist are satisfied.
- If a phase produces files, those files must exist and be non-empty.
- If review discovers issues, go back to the phase that introduced them — never carry defects forward.

## Output Standards

- All documents must use Markdown.
- Code snippets must include language annotation (e.g. ` ```typescript `).
- Diagrams should use Mermaid syntax where applicable.
- Every file must have a clear heading and purpose statement.
- Use consistent terminology across all documents.

## Communication Style

- Be concise and direct.
- Flag risks, blockers, and open questions immediately.
- Provide reasoning for decisions.
- If a task will take more than 2 hours, break it down further.

## Tech Stack Default

- **Frontend:** Next.js 14+ (App Router) + TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **Data Fetching:** TanStack Query
- **State Management:** Zustand
- **Backend:** Next.js API Routes / tRPC
- **ORM:** Prisma or Drizzle ORM
- **Database:** MySQL or PostgreSQL
- **Validation:** Zod
- **Testing:** Vitest (unit), Playwright (E2E)
- **CI/CD:** GitHub Actions
- **Containerization:** Docker + Docker Compose
- **Monitoring:** Sentry + Pino
