# Triage Labels

The skills use semantic triage roles. Map them to existing provider-native labels, tags, fields, types, or states discovered during setup. These roles do not authorize creation of a new taxonomy. Unmapped roles are reported, not silently invented.

| Semantic role | Verified representation in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `bug`                     | unresolved          | Something is broken                     |
| `enhancement`             | unresolved          | New feature or improvement              |
| `needs-triage`             | unresolved          | Maintainer needs to evaluate this issue  |
| `needs-info`               | unresolved          | Waiting on reporter for more information |
| `ready-for-agent`          | unresolved          | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | unresolved          | Requires human implementation            |
| `wontfix`                  | unresolved          | Will not be actioned                     |

When a skill mentions a role, use its verified representation. For ADO record field/type/tag and value separately. Triage roles are not delivery states.

Record allowed transitions and rejected/unsuccessful outcomes separately from successful completion in `docs/agents/issue-tracker.md`.
