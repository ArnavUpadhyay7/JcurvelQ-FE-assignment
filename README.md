# Agent Run Panel

A React + Tailwind UI that visualizes a live AI agent workflow, including task execution, parallel processing, retries, cancellations, and final output.

---

## How to Run Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Switching Between Fixtures

Fixtures are located in:

```
src/mock/fixtures/
```

To switch between runs:

### In `useRunSimulation.js`

```js
import runSuccess from "../mock/fixtures/run_success";
import runError from "../mock/fixtures/run_error";
```

Then change:

```js
const events = runSuccess;
// OR
const events = runError;
```

---

## What This UI Shows

* Task lifecycle (pending → running → complete / failed / cancelled)
* Parallel task execution
* Tool calls and results
* Partial outputs (streaming)
* Retry behavior (failed → running)
* Final synthesized output

---

## Known Gaps / Improvements (with more time)

* **Timeline visualization**: Could add a stronger visual timeline for better execution clarity
* **Collapsible logs**: Tool calls could be collapsible to reduce noise
* **Better dependency visualization**: Explicit UI indicators for task dependencies
* **Animations**: Smooth transitions for task updates
* **Accessibility**: Improve keyboard navigation and ARIA labels
* **Real backend integration**: Replace mock emitter with WebSocket or SSE

---

## 🛠 Tech Stack

* React (hooks, useReducer)
* Tailwind CSS