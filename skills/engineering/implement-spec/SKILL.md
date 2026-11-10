---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code."
disable-model-invocation: true
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

Call the Skill tool with "environment-workflow" before reading or mutating tracker work and choosing branches. Apply its provider-specific references, authorization boundaries, and completion gates throughout this flow.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-rbeesley-skills`.

The goal is the entire spec implemented through feature-bounded branches. Use a single **integration branch** only when explicitly selected for this effort; otherwise use independent or stacked per-ticket branches with explicit parents and merge order. Report each ticket against its discovered delivery gates, not an assumed closed state.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

For this implementation run, a dependent slice can become code-ready to start when its prerequisite code is available in its verified branch ancestry or agreed integration branch, subject to project gates. That does not mark the prerequisite delivered or close its work item. Track implementation availability separately from the project's successful-delivery predicate; a rejected item or abandoned PR with no replacement code does not unblock either frontier.

Start every subagent with a fresh context window.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

**Implementer subagents** should be run in the background where possible for maximum concurrency.

## Steps

1. Read the spec and tickets to understand the task graph.

2. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files or external documentation. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible by all future subagents. This lets **implementer subagents** focus on implementation rather than exploration.

3. Create the agreed branch topology from verified parent refs. Open PRs only if the user requested PRs. Respect any requested draft/ready state; otherwise follow the repository's convention. Call the Skill tool with "pr" before drafting bodies. Associate work using verified provider-native links, not assumed closing keywords. Leave auto-complete/auto-merge off unless explicitly requested.

4. Use a fresh **implementer subagent** for each ticket, each in its own worktree on its own branch. Each implementer subagent:
   - confirms its worktree is based on the intended parent before starting; if not, reports the mismatch or creates a clean worktree, preserving existing work rather than resetting it;
   - calls the Skill tool with `tdd` to build the ticket;
   - integrates updated prerequisites according to the selected branch topology before reporting code readiness, without closing work items

5. Once an **implementer subagent** completes, integrate its work only as authorized by the selected topology. An agreed integration branch can receive local merges; a per-ticket PR remains subject to review and dependency order. A local integration merge is not a request to merge a remote PR.

6. If this changes the **frontier** of available tickets, kick off more **implementer subagents** to work on the new tickets. This allows for maximum concurrency.

7. Once all tickets are code-ready, call the Skill tool with `code-review` against the appropriate parent for each review surface. Fix confirmed issues; keep pending external validation visible.

8. Report branches, requested PRs, verified links, and outstanding gates. Change PR readiness or item state only when delegated and its configured predicate holds. PR creation or review readiness alone never implies successful completion.

9. Clean up only worktrees whose committed work is safely preserved and which are not needed by active sessions or stacked branches. Retain anything uncertain and report it.
