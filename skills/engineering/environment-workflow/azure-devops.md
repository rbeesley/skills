# Azure DevOps operations

Use this reference after the repository contract in `SKILL.md`. Examples use placeholders, never real organization or work-item data.

## Identity and references

- Refer to PRs as `!<id>` or the full PR URL. Use `#<id>` only for a real work item you intend to mention. ADO treats `#` as a work-item link even if that number happens to be a PR ID.
- A work-item reference, PR reference, and branch are different identifiers. Resolve ambiguous bare numbers by item kind and target project before writing.
- Preserve the actual organization/project/repository IDs returned by the service. When a tool needs a fully qualified branch, pass `refs/heads/<resolved-branch>`.

## Discover before mapping

Read the project's work-item types, required fields, allowed process states and transitions, relation types, area/iteration paths, and repo/team policies. Query existing tags and configured triage mapping. Availability and permissions vary by process and MCP instance.

Record only verified mappings: creation type, description and acceptance fields, category/state triage roles, parent/child hierarchy, predecessor/successor direction, and the successful-completion predicate. A Bug, Task, User Story, or Product Backlog Item is not universally available. Tags are not GitHub labels. `Related` is not a blocking dependency.

## Create and relate work

Publish a spec or ticket as the discovered work-item type with its required fields. Use approved hierarchy and dependency relations:

1. Create each approved item once and retain its returned ID/URL.
2. Link children to the parent using the actual parent/child relation.
3. Link blockers using the supported predecessor/successor relation in the correct direction.
4. Read back both identity and relation direction before reporting a verified task graph.

When a required native relation is unavailable, report it and use an explicit textual dependency only with the configured fallback policy. Never describe a text-only association as a native link.

For PR/work-item association use the supported PR work-item operation or work-item artifact relation to the returned PR artifact identity (the provider's organization/project/repository/PR identity). **Mentions in the PR body do not verify linkage.** Read back linked work items or artifact relations. Retain the returned item and PR identities, including successful results when another link fails; do not recreate items on retry. If some items link and others fail, report each identity and result and leave their lifecycle unchanged.

## Triage and planning

Keep the semantic roles from the skill, but apply only mapped tags, fields, states, and item types. `ready-for-agent` may be a configured tag or field rather than a process state. A read-only queue query does not authorize tagging, assignment, comments, rejection, or closure.

For wayfinding, use the configured map and decision-item types, hierarchy, claim mechanism, and decision-completion states. Use mapped representations of `wayfinder:map` and ticket types, not newly invented tags. Scope removal/rejection is distinct from a decision successfully answered or implementation delivered.

## Resolve and complete

Read current state, revision, linked PR state, and remaining validation gates before transition. Use revision/concurrency guards when supported. Transition only when the configured predicate is satisfied and the operation is authorized.

PR readiness is not merge completion. A resolved code item may still need review, deployment, hardware testing, or external acceptance. Record pending validation honestly; preserve that gate until evidence exists. Use server-side completion transitions only when explicitly configured, and verify the resulting item state after successful PR completion. Abandonment is never the successful-completion event.
