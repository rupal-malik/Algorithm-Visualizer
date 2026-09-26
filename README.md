
# Algorithm-Visualizer
DSA Core Patterns Visualizer
This is a single-page, imperative, client-side app. 
It's a monolithic front end with no backend or persistence, and all of it runs in the browser.

**Current architecture (what I built)**
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
│  ┌────────────── algo.js (your original code) ───────┐  │
│  │  STATE     currentTab · timer · binarySteps       │  │
│  │  CONTROL   switchTab · runAlgorithm · reset       │  │
│  │  VIEW      renderBinarySearch · renderTwoPointers │  │
│  │            renderSlidingWindow · renderBacktrack… │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │ getElementById + innerHTML    │
│                         ▼                               │
│                 Real DOM (React is bypassed)            │
└─────────────────────────────────────────────────────────┘

**Runtime flow for one click**
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

**Binary addition: record, then replay**
 prepareBinaryAdditionSteps()          renderBinaryAdditionStep(i)
 ┌───────────────────────────┐         ┌──────────────────────┐
 │ run the algorithm once    │  array  │ read binarySteps[i]  │
 │ save a snapshot per line  ├────────►│ draw bits, carry,    │
 │ {idx, carry, res, desc}   │         │ highlight code line  │
 └───────────────────────────┘         └──────────▲───────────┘
                                                  │
                        slider · ◀ ▶ buttons · setInterval (1.4s) 

                        

**Now vs. idiomatic React  **
        NOW                                TARGET
  ┌─────────────┐                    ┌──────────────────┐
  │ App (static)│                    │ App (useState)   │
  └──────┬──────┘                    └───┬──────┬───────┘
         │ window.*                      │ props│
         ▼                               ▼      ▼
  ┌─────────────┐               ┌─────────┐ ┌──────────┐
  │ algo.js     │               │Visualizer│ │CodePanel │
  │ state+logic │               │ ├ BinarySearch  ...   │
  │ +DOM writes │               │ └ BinaryAddition      │
  └──────┬──────┘               └────┬────┘ └──────────┘
         ▼                           ▼
     innerHTML                pure step generators
                              (unit-testable)
