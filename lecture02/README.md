# React Fiber — The Complete, In-Depth README (For Humans — and Bhai 😉)# React Fiber — The Complete, In-Depth README (For Humans — and Bhai �)



## Table of Contents## Table of Contents



1. [Intro — TL;DR](#intro--tldr)1. [Intro — TL;DR](#intro--tldr)

2. [Browser main thread & why rendering blocks](#browser-main-thread--why-rendering-blocks)2. [Browser main thread & why rendering blocks](#browser-main-thread--why-rendering-blocks)

3. [Virtual DOM & reconciliation (quick refresher)](#virtual-dom--reconciliation-quick-refresher)3. [Virtual DOM & reconciliation (quick refresher)](#virtual-dom--reconciliation-quick-refresher)

4. [React before Fiber — what went wrong](#react-before-fiber--what-went-wrong)4. [React before Fiber — what went wrong](#react-before-fiber--what-went-wrong)

5. [What is Fiber? core idea (high level)](#what-is-fiber-core-idea-high-level)5. [What is Fiber? core idea (high level)](#what-is-fiber-core-idea-high-level)

6. [Fiber architecture — internals & fiber node structure](#fiber-architecture--internals--fiber-node-structure)6. [Fiber architecture — internals & fiber node structure](#fiber-architecture--internals--fiber-node-structure)

7. [Two phases: Reconciliation (render) & Commit — deep dive](#two-phases-reconciliation-render--commit--deep-dive)7. [Two phases: Reconciliation (render) & Commit — deep dive](#two-phases-reconciliation-render--commit--deep-dive)

8. [Incremental rendering (time-slicing) explained step-by-step](#incremental-rendering-time-slicing-explained-step-by-step)8. [Incremental rendering (time-slicing) explained step-by-step](#incremental-rendering-time-slicing-explained-step-by-step)

9. [Scheduling & Priority (lanes, transitions) — deep dive](#scheduling--priority-lanes-transitions--deep-dive)9. [Scheduling & Priority (lanes, transitions) — deep dive](#scheduling--priority-lanes-transitions--deep-dive)

10. [Commit phase sub-phases (mutation, layout) & side effects](#commit-phase-sub-phases-mutation-layout--side-effects)10. [Commit phase sub-phases (mutation, layout) & side effects](#commit-phase-sub-phases-mutation-layout--side-effects)

11. [Error Boundaries, Suspense, Concurrent features explained](#error-boundaries-suspense-concurrent-features-explained)11. [Error Boundaries, Suspense, Concurrent features explained](#error-boundaries-suspense-concurrent-features-explained)

12. [Web Workers — what they are, when to use, why cannot replace Fiber for DOM](#web-workers--what-they-are-when-to-use-why-cannot-replace-fiber-for-dom)12. [Web Workers — what they are, when to use, why cannot replace Fiber for DOM](#web-workers--what-they-are-when-to-use-why-cannot-replace-fiber-for-dom)

13. [How to combine Web Workers & React properly (patterns + example)](#how-to-combine-web-workers--react-properly-patterns--example)13. [How to combine Web Workers & React properly (patterns + example)](#how-to-combine-web-workers--react-properly-patterns--example)

14. [Performance optimization patterns (practical)](#performance-optimization-patterns-practical)14. [Performance optimization patterns (practical)](#performance-optimization-patterns-practical)

15. [Profiling & debugging tips (how to measure what matters)](#profiling--debugging-tips-how-to-measure-what-matters)15. [Profiling & debugging tips (how to measure what matters)](#profiling--debugging-tips-how-to-measure-what-matters)

16. [Common pitfalls & FAQs](#common-pitfalls--faqs)16. [Common pitfalls & FAQs](#common-pitfalls--faqs)

17. [Cheat sheet: APIs & commands (practical code)](#cheat-sheet-apis--commands-practical-code)17. [Cheat sheet: APIs & commands (practical code)](#cheat-sheet-apis--commands-practical-code)

18. [Glossary — quick definitions of every small term](#glossary--quick-definitions-of-every-small-term)18. [Glossary — quick definitions of every small term](#glossary--quick-definitions-of-every-small-term)

19. [Conclusion & next steps](#conclusion--next-steps)19. [Conclusion & next steps](#conclusion--next-steps)



------nderstanding React Fiber (Made Easy)



## Intro — TL;DRReact Fiber is a complete rewrite of React’s **reconciliation engine** (introduced in React 16).  

It was designed to make React apps **faster, smoother, and more responsive**.  

**React Fiber = React's rewrite of its reconciler** (the algorithm that decides what changed in UI).

---

**Main outcomes:**

- Rendering becomes interruptible, chunked, priority-aware.## Intro — TL;DR

- UI remains responsive under heavy updates.

- New features like Error Boundaries, Fragments, and better concurrent behaviors are supported.**React Fiber = React's rewrite of its reconciler** (the algorithm that decides what changed in UI).



Ab detail me.**Main outcomes:**

- Rendering becomes interruptible, chunked, priority-aware.

---- UI remains responsive under heavy updates.

- New features like Error Boundaries, Fragments, and better concurrent behaviors are supported.

## Browser main thread & why rendering blocks

Ab detail me.

Browser main thread handles:

- JavaScript execution---

- Style recalculation, layout, painting

- Event handling (clicks, typing, scroll)## Browser main thread & why rendering blocks



**Frame budget:** ~16.7ms per frame at 60fps. Agar tumhara JS work > 16ms, next frame chud jaayega — UI appears janky.Browser main thread handles:

- JavaScript execution

**Old React** did heavy JS in one shot → blocked main thread → UI lag.- Style recalculation, layout, painting

- Event handling (clicks, typing, scroll)

---

**Frame budget:** ~16.7ms per frame at 60fps. Agar tumhara JS work > 16ms, next frame chud jaayega — UI appears janky.

## Virtual DOM & reconciliation (quick refresher)

**Old React** did heavy JS in one shot → blocked main thread → UI lag.

React maintains a **Virtual DOM (VDOM)**: lightweight JS tree representation of UI.

---

On state/prop change:

1. New VDOM created for affected subtree.## Virtual DOM & reconciliation (quick refresher)

2. Diff old VDOM vs new VDOM → generate list of updates (insert/update/delete).

3. Apply updates to real DOM (expensive).React maintains a **Virtual DOM (VDOM)**: lightweight JS tree representation of UI.



**Diffing + DOM updates** are expensive if done in one blocking run.On state/prop change:

1. New VDOM created for affected subtree.

---2. Diff old VDOM vs new VDOM → generate list of updates (insert/update/delete).

3. Apply updates to real DOM (expensive).

## React before Fiber — what went wrong

**Diffing + DOM updates** are expensive if done in one blocking run.

- **Single synchronous pass:** reconciliation + rendering done in one go.

- **No way to interrupt or prioritize.**---

- If heavy update (long list re-render), main thread blocked until complete.

- **User input had to wait** → perceived slowness.## React before Fiber — what went wrong

- Entire render process was **atomic** (no inserting new renders mid-way).

- **Single synchronous pass:** reconciliation + rendering done in one go.

---- **No way to interrupt or prioritize.**

- If heavy update (long list re-render), main thread blocked until complete.

## What is Fiber? core idea (high level)- **User input had to wait** → perceived slowness.

- Entire render process was **atomic** (no inserting new renders mid-way).

**Fiber = a reimplementation of the reconciler** to:

- represent each unit of work as a small **fiber node**,---

- allow **incremental processing** (pause & resume),

- **schedule units based on priority**,## ⚡ After Fiber (React 16+)

- maintain minimal **commit steps** to update DOM quickly.

Fiber introduced **incremental rendering** and **scheduling**.

**Key concepts:**

- **Unit of work** = a fiber (represents a component + state about work to do).Now rendering happens in **two phases**:

- **Double buffering:** current tree vs work-in-progress tree (alternate pointer).

- **Scheduler:** decides which fibers to work on and when to pause.### 1. Reconciliation Phase (Render Phase)

- React figures out *what needs to change*.  

---- Work is split into small units (called *fibers*).  

- This phase is **interruptible** → React can pause, resume, or restart work.  

## Fiber architecture — internals & fiber node structure- High-priority tasks (user input) can interrupt low-priority tasks (background rendering).



A **fiber node** contains (conceptual fields — names simplified):### 2. Commit Phase

- React applies the changes to the DOM.  

- `type` — component type (function/class/host element)- This phase is **non-interruptible** (must finish once started).  

- `key` — reconciliation key

- `return` — pointer to parent fiber---

- `child` — pointer to first child fiber

- `sibling` — pointer to next sibling fiber## 🔹 Incremental Rendering

- `pendingProps` — incoming props to process- React splits rendering into **small chunks** instead of one big task.  

- `memoizedProps` — last committed props- Between chunks, React checks:  

- `stateNode` — local instance (DOM node or class instance)  👉 “Do I need to handle something urgent (like user typing)?”  

- `updateQueue` — queued state updates- If yes → Handle urgent task first, then continue rendering.  

- `effectTag / flags` — indicates operations (PLACEMENT, UPDATE, DELETION)

- `alternate` — pointer to the other tree (double buffering)**Example:**  

Rendering 5000 list items:  

**Double Buffering:** current fiber tree (committed) vs work-in-progress fiber tree. Reconciliation builds the WIP tree; commit replaces current with WIP.- Old React → Blocks UI until all 5000 items rendered.  

- Fiber → Renders in small batches → UI stays responsive.

---

---

## Two phases: Reconciliation (render) & Commit — deep dive

## 🔹 Scheduling

### Phase 1 — Reconciliation (Render)- Fiber assigns **priority** to tasks:

  - 🏆 High priority → User input (typing, clicks, scrolls).  

**Purpose:** build the work-in-progress tree and collect changes.  - ⚡ Medium priority → Animations, transitions.  

  - ⏳ Low priority → Background updates, off-screen components.  

**Characteristics:**

- **Interruptible:** can pause/resume.👉 This ensures urgent work happens *first*, keeping UI smooth.

- Traverses fiber tree, creates/upgrades/deletes fiber nodes.

- Produces a set of "effects" (list of changes) that need committing.---



**Outcome:** a list of effects + a complete WIP tree ready to commit (or partially done and resumable).## ✅ Benefits of Fiber



### Phase 2 — Commit1. **Improved Performance**  

   - Non-blocking rendering → smooth apps.  

**Purpose:** apply the effects to DOM and run lifecycle side-effects.

2. **Error Boundaries**  

**Characteristics:**   - Instead of crashing the whole app, show fallback UI.  

- **Non-interruptible:** once started it finishes quickly.

- Has sub-phases (see later).3. **New Render Types**  

   - Support for Fragments (`<> </>`), strings, multiple elements.  

**Outcome:** DOM reflects new UI; hooks with layout effects run; WIP becomes the new committed tree.

4. **Advanced UI Features**  

---   - Easier animations, gestures, even 3D rendering (e.g. `react-three-fiber`).  



## Incremental rendering (time-slicing) explained step-by-step---



**Goal:** avoid long tasks; keep main thread responsive.## 🎯 Quick Analogy



**How it works:**- **Old React (Before Fiber):**  

1. React breaks rendering into small units of work (fibers).  A chef makes 1000 dishes in one go → ignores customers until finished.  

2. It performs work for one fiber or a small batch, then checks if the browser needs time for user input (using heuristics or host scheduling APIs).

3. If main thread needs attention, React pauses and lets the browser handle UI events, then resumes where it paused.- **React Fiber (After Fiber):**  

4. This cycle continues until all fibers processed or higher priority work interrupts.  Chef makes 10 dishes at a time → checks if any urgent customer order came in → serves that first, then continues.  



### Why this is good👉 Result: Customers (users) are always happy with quick service.

- Typing/scrolling remain snappy.

- Expensive background updates can be done gradually.---



**Frame budget:** React tries to keep each chunk lightweight to fit within frame budget; if a chunk takes too long it yields earlier.## 📊 Summary



---| Feature               | Before Fiber (React 15)      | After Fiber (React 16+) |

|-----------------------|------------------------------|--------------------------|

## Scheduling & Priority (lanes, transitions) — deep dive| Rendering style       | Synchronous (blocking)       | Incremental (non-blocking) |

| Interruptible?        | ❌ No                        | ✅ Yes (pause/resume)   |

**Scheduler's job:** assign priorities and order units of work.| Error handling        | ❌ White Screen of Death     | ✅ Error Boundaries     |

| Task priority         | ❌ None                      | ✅ High vs Low priority |

### Concepts:| UI performance        | Laggy under heavy updates    | Smooth & responsive      |



**Priority levels** (conceptual):---

- **Immediate** (user input)

- **User-blocking** (typing, click response)## 🚀 What You Can Do with Fiber

- **Normal** (updates from setState)- Build **high-performance UIs**.  

- **Low** (background/idle)- Add **animations, gestures, and transitions** easily.  

- Create **3D models in React** (via libraries like `react-three-fiber`).  

**Lanes (React 18+):** internal mechanism representing multiple priority lanes — each update is assigned to one or more lanes; scheduler picks highest priority lanes to work on.

---

**startTransition / useTransition:**

- API to mark updates as transitions (low priority). ✨ **In short:**  

- Example: typing should be immediate; updating a large list after typing can be scheduled as transition.Fiber makes React apps **faster, smarter, and smoother** by letting React pause, resume, and prioritize rendering work.



```javascript
startTransition(() => setBigList(newState)) // tells React this is non-urgent.
```

### Practical rules
- Treat user input and animations as **high priority**.
- Mark data fetching & non-urgent visual updates as **low priority** (use startTransition if appropriate).

---

## Commit phase sub-phases (mutation, layout) & side effects

Commit commonly split into **sub-phases** (simplified):

### 1. Before mutation (optional)
React may call lifecycle hooks to snapshot layout (e.g., `getSnapshotBeforeUpdate`).

### 2. Mutation (DOM updates)
Actual DOM insertions, updates, removals happen here (PLACEMENT, UPDATE, DELETION).

### 3. Layout effects (`useLayoutEffect`, `componentDidUpdate`)
Synchronous effects that run after DOM mutation but before browser paints (used for measuring DOM).

### 4. Passive effects (`useEffect`)
Run after paint (non-blocking), used for data fetching, subscriptions.

### Important
- Commit must be **quick**; keep mutations minimal and side-effects controlled.
- `useLayoutEffect` runs **synchronously** after DOM commits — heavy work here will block paints.

---

## Error Boundaries, Suspense, Concurrent features explained

### Error Boundaries
- Components that catch runtime errors in their child tree and render fallback UI.
- Only **class components** can be error boundaries (as of stable APIs) — implement `getDerivedStateFromError` / `componentDidCatch`.
- Use error boundaries to prevent WSOD on isolated component failures.

### Suspense
- Designed to let components "wait" for asynchronous data (or code) and show fallback UI.
- Works with lazy loading and data fetching solutions that integrate with Suspense.
- Suspense + concurrent rendering allows React to coordinate pending content without blocking the whole UI.

### Concurrent Features (Conceptual)
- "Concurrent Mode" (older naming) → React can work on multiple tasks and swap them in and out.
- In practice: `startTransition`, `useTransition`, Suspense enhancements, selective hydration (React 18+ features).
- These are about making UI seamlessly responsive while performing background work.

---

## Web Workers — what they are, when to use, why cannot replace Fiber for DOM

### What are Web Workers?
- Browser feature to run JS in a **background thread** separate from main thread.
- Good for heavy computations: image processing, encryption, large loops, ML inference, etc.
- Communicate with main thread via `postMessage`.

### Example Web Worker

**main.js:**
```javascript
const worker = new Worker('worker.js');
worker.postMessage({count: 1e9});
worker.onmessage = e => console.log(e.data);
```

**worker.js:**
```javascript
onmessage = (e) => {
  let n = e.data.count, sum = 0;
  for (let i=0; i<n; i++) sum += i;
  postMessage(sum);
};
```

### Why Web Workers cannot replace Fiber (DOM reason)
- **Web Workers cannot access the DOM** (no document, no window manipulations).
- **React rendering + DOM updates must happen on main thread.**
- Web Workers can compute data but UI update step still has to run on main thread.
- Offloading compute helps reduce work on main thread, but React's render/diff + commit remain main-thread tasks — **that's what Fiber optimizes**.

---

## How to combine Web Workers & React properly (patterns + example)

### Pattern 1: Offload heavy calculations to Worker
Compute in worker → send result to main thread → update state → React reconciles small update.

**Example:**
```javascript
// main.js (React)
useEffect(() => {
  const worker = new Worker('/sumWorker.js');
  worker.postMessage({ n: 1e9 });
  worker.onmessage = (e) => {
    startTransition(() => { setBigResult(e.data); });
  };
  return () => worker.terminate();
}, []);
```

### Pattern 2: Use Transferable objects
For large arrays, transfer ArrayBuffer to worker (avoids copying).
```javascript
worker.postMessage({ buffer }, [buffer]);
```

### Pattern 3: SharedArrayBuffer (advanced)
For shared memory and fine-grained concurrency (security + COOP/COEP headers required).

### Pattern 4: Worker + OffscreenCanvas (graphics)
Drawing/animations heavy tasks to OffscreenCanvas, but still coordinate with main thread.

**Key rule:** Use `startTransition` when updating UI from worker results that are non-urgent.

---

## Performance optimization patterns (practical)

### Avoid unnecessary re-renders
- `React.memo`, `PureComponent`, `shouldComponentUpdate`.
- Give components stable props (avoid recreating objects inline).

### Memoize expensive computations
- `useMemo`, `useCallback`.

### Virtualize long lists
- `react-window`, `react-virtualized` — render only visible items.

### Split UI into small components
- Smaller components mean smaller re-render subtrees.

### Debounce / throttle inputs
- Avoid updating state on every keystroke if not necessary.

### Prefer CSS animations
- Offload animations to compositor (`transform`, `opacity`).

### Use startTransition for non-urgent updates
- Mark background re-renders as transitions.

### Avoid heavy work in useLayoutEffect
- Use `useEffect` where possible.

### Use Web Workers for heavy CPU work
- Keep main thread light.

### Server-Side Rendering + selective hydration
- Delay hydration of non-interactive parts.

---

## Profiling & debugging tips (how to measure what matters)

### React DevTools Profiler
Records commit durations and render times per component.

### Chrome DevTools Performance Tab
Flame charts, long tasks, paint/layout timings.

### React Profiler API
```javascript
<Profiler id="App" onRender={(...args) => console.log(args)} >
  <App />
</Profiler>
```

### Mark renders manually
`console.time` / `console.timeEnd` inside effects / render (careful).

### Look for
Long tasks (>50ms), frequent renders of big subtrees, big layout thrash (style/layout/paint heavy).

### How to debug jank
1. Record performance while reproducing the issue.
2. Inspect JS frames for long tasks.
3. Check React commit flame (DevTools) to see expensive components.
4. Apply optimizations (memo / virtualization / web worker) and re-profile.

---

## Common pitfalls & FAQs

**Q: Does Fiber mean React now runs on a background thread?**
A: No. Fiber only improves scheduling on the main thread (where DOM lives). Fiber helps break work into chunks so the main thread can service events between chunks.

**Q: Will using Web Workers make React fully non-blocking?**
A: No. Web Workers help by offloading CPU heavy tasks but DOM operations and reconciliation/commit still run on the main thread.

**Q: When to use useLayoutEffect vs useEffect?**
A: `useLayoutEffect` runs synchronously after DOM mutations — use for measurements that must happen before paint. `useEffect` runs after paint and is preferred for side-effects that do not block rendering.

**Q: Should everything be startTransition?**
A: No. Only non-urgent UI updates (e.g., applying filter results) should be transitions. Critical user interactions must remain immediate.

**Q: How to avoid excessive layout thrashing?**
A: Batch reads and writes — don't read layout (`offsetHeight`) and write (style changes) interleaved repeatedly. Use `requestAnimationFrame` for animation writes.

---

## Cheat sheet: APIs & commands (practical code)

### Error Boundary (class)
```javascript
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = {hasError:false}; }
  static getDerivedStateFromError(err){ return {hasError:true}; }
  componentDidCatch(err, info){ console.error(err, info); }
  render(){ return this.state.hasError ? <FallbackUI/> : this.props.children; }
}
```

### startTransition (React 18+)
```javascript
import { startTransition } from 'react';
startTransition(() => {
  setBigList(newList); // marked as non-urgent
});
```

### useTransition
```javascript
const [isPending, startTransition] = useTransition();
const handle = () => {
  startTransition(() => setBigState(value));
};
```

### Worker + React minimal

**worker.js**
```javascript
onmessage = (e) => {
  const result = heavyCompute(e.data);
  postMessage(result);
};
```

**App.jsx**
```javascript
useEffect(() => {
  const w = new Worker('/worker.js');
  w.postMessage({ value: 1000000000 });
  w.onmessage = (e) => startTransition(() => setResult(e.data));
  return () => w.terminate();
}, []);
```

### Virtualize with react-window (basic)
```javascript
import { FixedSizeList as List } from 'react-window';

<List
  height={500}
  itemCount={items.length}
  itemSize={35}
  width={300}
>
  {({ index, style }) => <div style={style}>{items[index]}</div>}
</List>
```

---

## Glossary — quick definitions of every small term

- **Fiber:** Unit-of-work in React's new reconciler.
- **Work-in-progress (WIP):** The tree React is currently building.
- **Commit:** Applying changes to DOM.
- **Lane:** Internal prioritization bucket (React 18+).
- **startTransition / useTransition:** APIs to mark non-urgent updates.
- **Time-slicing:** Breaking work into chunks to fit frame budget.
- **Error Boundary:** Component that catches runtime errors in descendants.
- **Virtual DOM (VDOM):** JS tree representing UI.
- **Double buffering:** current vs WIP tree technique.
- **Effect Tags / Flags:** Marks for operations to do in commit (PLACEMENT, UPDATE, DELETION).
- **Suspense:** Mechanism to "wait" and show fallback UI for async content.
- **requestIdleCallback:** Browser API to run low-priority work during idle time (fallback patterns).

---

## Conclusion & next steps

React Fiber fundamentally rewired how React thinks about rendering:

**From a big-blocking operation → to incremental, scheduled, prioritized work.**

It made React apps feel more responsive and enabled more complex UIs (animations, Suspense, transitions).

### What you should practice next:

1. **Try making a demo** with a large list (5000 items) and compare naive render vs virtualization + startTransition.
2. **Profile** with React DevTools Profiler and Chrome DevTools.
3. **Try moving a CPU-heavy task** to a Web Worker and observe main thread improvements.
4. **Use Error Boundaries** in your app to gracefully handle UI errors.
5. **Explore react-three-fiber** if you want to see 3D rendering integrated with React.