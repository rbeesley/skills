# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files in `.scratch/`.

Use this seed only when local tracking was selected, never as a silent fallback from an unavailable service. Resolve operation permissions and completion gates through environment-workflow. Configure successful decision and implementation predicates separately; a rejected/cancelled file is not a delivered dependency. Preserve existing file edits.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Triage state is recorded as a `Status:` line near the top of each issue file (see `triage-labels.md` for the role strings)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a new file under `.scratch/<feature-slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every listed prerequisite satisfies the configured successful-completion predicate; a status string alone does not establish delivery.
- **Frontier**: scan `.scratch/<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve a decision**: when authorized and its configured predicate holds, append the answer under an `## Answer` heading, set `Status: resolved`, then append a local context pointer to the map's Decisions-so-far in `map.md`. Keep implementation delivery/validation gates separate. Do not upload context to a gist unless explicitly authorized.
