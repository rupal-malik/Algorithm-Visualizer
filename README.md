# Algorithm Visualizer

DSA core patterns visualizer: Binary Search, Two Pointers, Sliding Window, Backtracking and Binary Addition.

A single-page, imperative, client-side app (Vite + React). It is a monolithic front end with no backend or persistence. Everything runs in the browser.

## Run

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
```

## Project structure

```
algovisualizer/
├── index.html        Tailwind + Font Awesome CDNs, #root mount point
├── src/
│   ├── main.jsx      React entry point
│   ├── App.jsx       Static JSX markup (no state)
│   ├── algo.js       Original logic: state, controls, render functions
│   └── index.css     .code-line styles
└── vite.config.js
```

## Architecture

```
┌──────────────────────── Browser ────────────────────────┐
│                                                         │
│  index.html ──► Tailwind CDN + Font Awesome CDN         │
│       │                                                 │
│       ▼                                                 │
│  main.jsx ──► App.jsx  (static JSX, no state)           │
│                  │                                      │
│        onClick / onInput / useEffect                    │
│                  ▼                                      │
│  window.switchTab()   window.runAlgorithm() ...         │
│                  │                                      │
│                  ▼                                      │
│  ┌────────────── algo.js (original code) ────────────┐  │
│  │  STATE     currentTab · timer · binarySteps       │  │
│  │  CONTROL   switchTab · runAlgorithm · reset       │  │
│  │  VIEW      renderBinarySearch · renderTwoPointers │  │
│  │            renderSlidingWindow · renderBacktrack… │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │ getElementById + innerHTML    │
│                         ▼                               │
│                 Real DOM (React is bypassed)            │
└─────────────────────────────────────────────────────────┘
```

## Runtime flow for one click

```
User clicks tab ─► onClick ─► window.switchTab(tab)
                                   │
                    update currentTab, clear timer
                                   │
                            loadTabContent()
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              set pseudo-code  set inputs    renderXxx()
                    └──────────────┴──────────────┘
                                   ▼
                         DOM updated via innerHTML
```

## Binary addition: record, then replay

```
 prepareBinaryAdditionSteps()          renderBinaryAdditionStep(i)
 ┌───────────────────────────┐         ┌──────────────────────┐
 │ run the algorithm once    │  array  │ read binarySteps[i]  │
 │ save a snapshot per line  ├────────►│ draw bits, carry,    │
 │ {idx, carry, res, desc}   │         │ highlight code line  │
 └───────────────────────────┘         └──────────▲───────────┘
                                                  │
                        slider · ◀ ▶ buttons · setInterval (1.4s)
```

## Patterns used

| Where | Pattern | Role |
|---|---|---|
| `App.jsx` + `algo.js` | Legacy wrapper / bridge | React shell around imperative code |
| Top of `algo.js` | Shared global state | Single source of truth, mutated directly |
| `prepare…Steps` / `render…Step` | Memento / replay | Enables scrubbing and stepping back |
| `loadTabContent` if/else | Simple Strategy | Picks behavior per tab |
| `renderXxx()` | Render functions | Draw one view from arguments |

## Now vs. idiomatic React

```
        NOW                                TARGET
  ┌─────────────┐                    ┌──────────────────┐
  │ App (static)│                    │ App (useState)   │
  └──────┬──────┘                    └───┬──────┬───────┘
         │ window.*                      │ props│
         ▼                               ▼      ▼
  ┌─────────────┐               ┌──────────┐ ┌──────────┐
  │ algo.js     │               │Visualizer│ │CodePanel │
  │ state+logic │               │ ├ BinarySearch        │
  │ +DOM writes │               │ └ BinaryAddition      │
  └──────┬──────┘               └────┬─────┘ └──────────┘
         ▼                           ▼
     innerHTML                pure step generators
                              (unit-testable)
```
