# DECISIONS.md

## 1. Agent Thoughts

**Decision:**
Agent thoughts are shown inline within tasks when associated with a task, and globally (if not tied to a task) in a minimal, non-intrusive way.

**Why:**
Showing thoughts provides transparency into system reasoning, which builds trust. However, always showing them prominently would overwhelm non-technical users. Keeping them subtle preserves clarity while still exposing insight.

**Reconsider if:**
User feedback shows analysts either ignore thoughts or find them distracting. In that case, move to a toggle-based visibility or hide by default.

---

## 2. Parallel Task Layout

**Decision:**
Parallel tasks are grouped inside a visually distinct container labeled “Parallel Tasks,” with slight background variation and spacing.

**Why:**
A vertical list alone makes parallel execution indistinguishable from sequential execution. Grouping maintains simplicity while clearly communicating simultaneous execution without introducing complex graphs.

**Reconsider if:**
Users still misinterpret parallelism. In that case, introduce timeline visuals or horizontal layouts.

---

## 3. Partial Outputs (is_final: false)

**Decision:**
Partial outputs are displayed inline but visually de-emphasized (muted/italic), while final outputs are highlighted.

**Why:**
Intermediate outputs provide useful context during long-running tasks, but should not compete with final results. This balances visibility and clarity.

**Reconsider if:**
Users find partial outputs noisy. Could move them into collapsible sections or logs.

---

## 4. Cancelled State (reason: "sufficient_data")

**Decision:**
Cancelled tasks are styled as neutral (gray), not as errors, with a message explaining why they were stopped.

**Why:**
Cancellation in this system is intentional and often positive (optimization), not a failure. Using error styling would mislead users.

**Reconsider if:**
Users interpret cancellation as failure. Might require clearer labeling like “Stopped early (sufficient data).”

---

## 5. Task Dependency Display

**Decision:**
Dependencies are not explicitly visualized as graphs. Instead, tasks are rendered in logical order that respects dependencies.

**Why:**
Explicit dependency graphs increase complexity and cognitive load. Maintaining correct order achieves clarity without visual clutter.

**Reconsider if:**
Users struggle to understand task relationships. Could introduce subtle “depends on” labels or a lightweight graph.

---

## Summary

The overall approach prioritizes:

* Clarity over completeness
* Simplicity over visual complexity
* Trust through transparency without overwhelming the user