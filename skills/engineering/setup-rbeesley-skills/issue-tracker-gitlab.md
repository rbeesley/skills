# Issue tracker: GitLab

Resolve identity and operation permissions through environment-workflow first. Use explicit verified targets, existing role mappings, and the project's successful-completion predicate. On Windows use PowerShell here-strings or body files rather than bash heredocs. Commands below are operation references, not permission to mutate.

Issues and specs for this repo live as GitLab issues. Use the [`glab`](https://gitlab.com/gitlab-org/cli) CLI for all operations.

Add the supported explicit repository/host target to every example; verify it rather than rely on fork defaults. During setup map the example wayfinding labels and operations to existing project configuration, including separate decision and implementation completion predicates.

## Conventions

- **Create an issue**: `glab issue create --title "..." --description "..."`. For multiline descriptions use the input mechanism supported by installed CLI help; use a body file or PowerShell here-string on Windows rather than a bash heredoc.
- **Read an issue**: `glab issue view <number> --comments`. Use `-F json` for machine-readable output.
- **List issues**: `glab issue list -O json` with appropriate `--label` filters.
- **Comment on an issue**: `glab issue note <number> --message "..."`. GitLab calls comments "notes".
- **Apply / remove labels**: `glab issue update <number> --label "..."` / `--unlabel "..."`. Multiple labels can be comma-separated or by repeating the flag.
- **Close**: `glab issue close <number>`. `glab issue close` does not accept a closing comment, so post the explanation first with `glab issue note <number> --message "..."`, then close.
- **Merge requests**: GitLab calls PRs "merge requests". Use `glab mr create`, `glab mr view`, `glab mr note`, etc., the same shape as `gh pr ...` with `mr` in place of `pr` and `note`/`--message` in place of `comment`/`--body`.

Resolve the repo from `git remote -v` and configuration, and verify the explicit target before any write.

## Merge requests as a triage surface

**MRs as a request surface: no.** _(Set to `yes` if this repo treats external merge requests as feature requests; `/triage` reads this flag.)_

When set to `yes`, MRs run through the same labels and states as issues, using the `glab mr` equivalents:

- **Read an MR**: `glab mr view <number> --comments` and `glab mr diff <number>` for the diff.
- **List external MRs for triage**: `glab mr list -O json`, then keep only MRs whose author is not a project member/owner (a contributor's MR, not a maintainer's in-flight work).
- **Comment / label / close**: `glab mr note`, `glab mr update --label`/`--unlabel`, `glab mr close`.

GitLab numbers issues and MRs separately: use `#<id>` for an issue and `!<id>` for a merge request.

## When a skill says "publish to the issue tracker"

Create a GitLab issue.

## When a skill says "fetch the relevant ticket"

Run `glab issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `glab issue create --label wayfinder:map`. (On GitLab tiers with native epics, an epic may hold the map instead; a labelled issue works everywhere.)
- **Child ticket**: an issue carrying `Part of #<map>` at the top of its description, linked to the map (`glab issue create --linked-issues <map> --link-type relates_to`), and labels `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitLab's **native blocking link**, the canonical, UI-visible representation. Add it with the `/blocked_by #<n>` quick action, posted as a note (`glab issue note <child> --message "/blocked_by #<blocker>"`). Native blocking links are a Premium/Ultimate feature; when unavailable, use a textual `Blocked by: #<n>, #<n>` line only under an agreed fallback policy and report the limitation. Each blocker must satisfy the project's successful-completion predicate, not merely be closed.
- **Frontier query**: list the map's children with `glab api projects/:id/issues/<map>/links`, keeping open issues with the configured ticket representation; inspect native or configured textual blockers and drop any whose successful-completion predicate is unmet, or which has an assignee; first in map order wins.
- **Claim**: `glab issue update <n> --assignee @me`, the session's first write.
- **Resolve a decision**: when authorized and its answer satisfies the configured decision predicate, `glab issue note <n> --message "<answer>"`, then `glab issue close <n>`, then append a context pointer to the map's Decisions-so-far. Implementation work retains its own delivery/validation gates. Do not upload context to a gist unless explicitly authorized.
