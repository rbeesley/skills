# Issue tracker: Azure DevOps

Seed only. Replace every unresolved field with discovered project facts before using remote writes.

## Target and capabilities

- Organization URL: unresolved
- Project name and ID: unresolved
- Code repository name and ID (may differ from work-item project): unresolved
- Available scoped MCP instance and operations: unresolved
- Explicit CLI fallback, if needed and available: unresolved
- PRs as a request surface: no

Prefer configured ADO MCP tools and inspect their schemas. Use org parameters only where exposed. If unavailable, report it before using installed Azure CLI operations with explicit targets. Follow the environment-workflow skill's ADO reference.

## Work items and relations

- Spec/map type and required fields: unresolved
- Implementation/decision types and required fields: unresolved
- Description/acceptance-criteria field names: unresolved
- Area/iteration and identity conventions: unresolved
- Category and triage-role mappings: see `docs/agents/triage-labels.md`
- Parent/child relation types: unresolved
- Blocking relation types and direction: unresolved
- PR artifact linkage operation and read-back query: unresolved

Create one item per approved ticket. Link hierarchy and blocking dependencies natively, verify relation direction, and record returned IDs. Use `#<id>` only for real work items; use `!<id>` or a full URL for PRs. Body mentions do not verify PR/work-item linkage.

## Delivery and completion

- Successfully delivered dependency predicate: unresolved
- Allowed state transitions and authorization: unresolved
- Conditions for resolution at a committed, linked PR: unresolved
- Validation/deployment/external acceptance gates: unresolved
- Successful PR completion to item closure policy: unresolved

Resolve only when the configured predicate holds. Abandonment/rejection is not delivery. Auto-complete remains off unless explicitly requested. Read back states and relations after authorized writes.

## Wayfinding operations

- Map and decision-item hierarchy/types: unresolved
- Mapped map/ticket-type representation: unresolved
- Frontier query excluding blocked/claimed/unsuccessful dependencies: unresolved
- Claim operation and permitted assignee: unresolved
- Answer/comment, decision completion, and map pointer update: unresolved

Planning decisions can have a different completion predicate from implementation tickets. Do not close code work just because a decision is answered.
