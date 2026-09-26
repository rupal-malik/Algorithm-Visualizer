import { useEffect } from 'react';
import { loadTabContent } from './algo.js';

export default function App() {
    // Equivalent of `window.onload = loadTabContent`
    useEffect(() => {
        loadTabContent();
    }, []);

    return (
        <>
            {/* Header / Navbar */}
            <header className="border-b border-dark-700 bg-dark-800/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                        <i className="fa-solid fa-code text-white text-lg"></i>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight text-white">AlgoVisualizer<span className="text-indigo-400">.</span></h1>
                        <p className="text-xs text-gray-400">Mastered Algorithms &amp; Core Data Structures</p>
                    </div>
                </div>

                {/* Algorithm Mode Tabs */}
                <nav className="flex flex-wrap gap-2 bg-dark-900 p-1.5 rounded-xl border border-dark-700">
                    <button onClick={() => window.switchTab('binarySearch')} id="tab-binarySearch" className="px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-indigo-600 text-white shadow">Binary Search</button>
                    <button onClick={() => window.switchTab('twoPointers')} id="tab-twoPointers" className="px-4 py-2 rounded-lg text-xs font-semibold transition-all text-gray-400 hover:text-white">Two Pointers</button>
                    <button onClick={() => window.switchTab('slidingWindow')} id="tab-slidingWindow" className="px-4 py-2 rounded-lg text-xs font-semibold transition-all text-gray-400 hover:text-white">Sliding Window</button>
                    <button onClick={() => window.switchTab('backtracking')} id="tab-backtracking" className="px-4 py-2 rounded-lg text-xs font-semibold transition-all text-gray-400 hover:text-white">Backtracking</button>
                    <button onClick={() => window.switchTab('binaryAddition')} id="tab-binaryAddition" className="px-4 py-2 rounded-lg text-xs font-semibold transition-all text-gray-400 hover:text-white">Binary Addition</button>
                </nav>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left & Center: Visualizer Area (2 Columns) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Visualizer Display Box */}
                    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl min-h-[380px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 id="view-title" className="text-base font-bold text-gray-200 flex items-center gap-2">
                                <i className="fa-solid fa-terminal text-indigo-400"></i> Binary Search Visualizer
                            </h2>
                            <span id="status-badge" className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium">Ready</span>
                        </div>

                        {/* Dynamic Visualizer Canvas Container */}
                        <div id="canvas-container" className="flex-1 flex items-center justify-center p-4 overflow-x-auto my-auto">
                            {/* Injected via JavaScript based on selected tab */}
                        </div>

                        {/* Step Progress Bar & Scrubber */}
                        <div id="progress-container" className="mt-4 pt-4 border-t border-dark-700/60 hidden flex flex-col gap-2">
                            <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
                                <span id="progress-label">Step 0 of 0</span>
                                <div className="flex gap-2">
                                    <button onClick={() => window.stepBackward()} className="bg-dark-700 hover:bg-dark-600 text-gray-200 px-2.5 py-1 rounded-lg transition-all"><i className="fa-solid fa-chevron-left"></i></button>
                                    <button onClick={() => window.stepForward()} className="bg-dark-700 hover:bg-dark-600 text-gray-200 px-2.5 py-1 rounded-lg transition-all"><i className="fa-solid fa-chevron-right"></i></button>
                                </div>
                            </div>
                            <input id="step-slider" type="range" min="0" max="0" defaultValue="0" onInput={(e) => window.onSliderChange(e.target.value)} className="w-full accent-indigo-500 bg-dark-900 cursor-pointer h-1.5 rounded-lg" />
                        </div>

                        {/* Step Explanation Box */}
                        <div className="mt-4 bg-dark-900/80 border border-dark-700/80 p-4 rounded-xl text-sm text-gray-300 flex items-start gap-3">
                            <i className="fa-solid fa-circle-info text-indigo-400 mt-1"></i>
                            <p id="step-description">Select parameters and click 'Start' to step through the algorithm execution.</p>
                        </div>
                    </div>

                    {/* Controls Toolbar */}
                    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button onClick={() => window.runAlgorithm()} id="play-btn" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all">
                                <i className="fa-solid fa-play"></i> Start Visualizing
                            </button>
                            <button onClick={() => window.resetVisualizer()} className="bg-dark-700 hover:bg-dark-600 text-gray-300 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all">
                                <i className="fa-solid fa-rotate-right"></i> Reset
                            </button>
                        </div>

                        {/* Variable Inputs Container */}
                        <div id="dynamic-inputs" className="flex items-center gap-3">
                            {/* Injected per tab */}
                        </div>
                    </div>
                </div>

                {/* Right Column: Info & Complexity Card */}
                <div className="flex flex-col gap-6">
                    {/* Pseudo-code Inspector with Line Highlighting */}
                    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-code text-indigo-400"></i> Execution Logic
                        </h3>
                        <div id="pseudo-code-container" className="bg-dark-900 p-4 rounded-xl font-mono text-xs text-gray-300 overflow-x-auto flex-1 border border-dark-700/50 leading-relaxed space-y-1">
                            {/* Populated dynamically */}
                        </div>
                    </div>

                    {/* Complexity Card */}
                    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-chart-line text-violet-400"></i> Complexity &amp; Overview
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="bg-dark-900 p-3.5 rounded-xl border border-dark-700/50">
                                <span className="text-xs text-gray-400 block mb-1">Time Complexity</span>
                                <span id="time-complexity" className="font-mono text-indigo-400 font-bold">O(log n)</span>
                            </div>
                            <div className="bg-dark-900 p-3.5 rounded-xl border border-dark-700/50">
                                <span className="text-xs text-gray-400 block mb-1">Space Complexity</span>
                                <span id="space-complexity" className="font-mono text-violet-400 font-bold">O(1)</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block mb-2">Key Pattern &amp; Concept</span>
                                <p id="pattern-description" className="text-xs text-gray-300 leading-relaxed">
                                    Divide and conquer strategy applied to sorted arrays by repeatedly dividing the search interval in half.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
