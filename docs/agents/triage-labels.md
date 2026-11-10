# Triage Labels

The skills use semantic triage roles. This fork has not selected a repository triage workflow; inherited upstream role mappings are not verified fork policy. A read-only check found standard GitHub labels including `bug`, `enhancement`, `documentation`, `question`, and `wontfix`, but not the readiness labels below.

| Semantic role | Verified representation | Meaning |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage` | Unmapped | Maintainer needs to evaluate this issue |
| `needs-info` | Unmapped | Waiting on reporter for more information |
| `ready-for-agent` | Unmapped | Fully specified, ready for an AFK agent |
| `ready-for-human` | Unmapped | Requires human implementation |
| `wontfix` | Existing `wontfix` label; application requires authorization | Will not be actioned |

Report unmapped roles rather than create labels or infer a state transition. Category labels may be mapped during setup, but existence alone is not an agreed role mapping.

Judge issues against [`SCOPE.md`](../../SCOPE.md). Rejection, comments, label changes, and closure are separate authorized operations. No inherited rule automatically closes fork issues.
