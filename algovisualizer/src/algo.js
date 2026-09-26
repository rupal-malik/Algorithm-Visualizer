        let currentTab = 'binarySearch';
        let timer = null;
        let binarySteps = [];
        let currentStepIdx = 0;

        function switchTab(tab) {
            currentTab = tab;
            clearInterval(timer);
            document.getElementById('progress-container').classList.add('hidden');
            
            // Update Tab styles
            ['binarySearch', 'twoPointers', 'slidingWindow', 'backtracking', 'binaryAddition'].forEach(t => {
                const btn = document.getElementById(`tab-${t}`);
                if (t === tab) {
                    btn.className = "px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-indigo-600 text-white shadow";
                } else {
                    btn.className = "px-4 py-2 rounded-lg text-xs font-semibold transition-all text-gray-400 hover:text-white";
                }
            });

            loadTabContent();
        }

        function setPseudoCode(codeLines, activeLine = -1) {
            const container = document.getElementById('pseudo-code-container');
            container.innerHTML = codeLines.map((line, idx) => {
                const isActive = (idx === activeLine) ? 'active' : '';
                return `<span class="code-line ${isActive}"><code>${line}</code></span>`;
            }).join('');
        }

        function loadTabContent() {
            const title = document.getElementById('view-title');
            const inputs = document.getElementById('dynamic-inputs');
            const timeComp = document.getElementById('time-complexity');
            const spaceComp = document.getElementById('space-complexity');
            const patternDesc = document.getElementById('pattern-description');
            const desc = document.getElementById('step-description');

            if (currentTab === 'binarySearch') {
                title.innerHTML = '<i class="fa-solid fa-terminal text-indigo-400"></i> Binary Search Visualizer';
                timeComp.innerText = 'O(log n)';
                spaceComp.innerText = 'O(1)';
                patternDesc.innerText = 'Divide and conquer strategy applied to sorted arrays by halving the search window.';
                setPseudoCode([
                    'function binarySearch(arr, target) {',
                    '    let left = 0, right = arr.length - 1;',
                    '    while (left <= right) {',
                    '        let mid = Math.floor((left + right) / 2);',
                    '        if (arr[mid] === target) return mid;',
                    '        else if (arr[mid] < target) left = mid + 1;',
                    '        else right = mid - 1;',
                    '    }',
                    '    return -1;',
                    '}'
                ]);
                inputs.innerHTML = `<label class="text-xs text-gray-400">Target:</label><input id="bs-target" type="number" value="37" class="bg-dark-900 border border-dark-700 text-white px-3 py-2 rounded-xl w-20 text-sm focus:outline-none focus:border-indigo-500">`;
                renderBinarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], -1, -1, -1);
                desc.innerText = "Sorted array initialized. Click 'Start Visualizing' to search for the target.";
            } 
            else if (currentTab === 'twoPointers') {
                title.innerHTML = '<i class="fa-solid fa-arrows-left-right text-indigo-400"></i> Two Pointers (Target Sum)';
                timeComp.innerText = 'O(n)';
                spaceComp.innerText = 'O(1)';
                patternDesc.innerText = 'Uses left and right pointers moving inward on a sorted array to locate a target sum.';
                setPseudoCode([
                    'function twoSumSorted(arr, target) {',
                    '    let left = 0, right = arr.length - 1;',
                    '    while (left < right) {',
                    '        let sum = arr[left] + arr[right];',
                    '        if (sum === target) return [left, right];',
                    '        else if (sum < target) left++;',
                    '        else right--;',
                    '    }',
                    '}'
                ]);
                inputs.innerHTML = `<label class="text-xs text-gray-400">Target Sum:</label><input id="tp-target" type="number" value="15" class="bg-dark-900 border border-dark-700 text-white px-3 py-2 rounded-xl w-20 text-sm focus:outline-none focus:border-indigo-500">`;
                renderTwoPointers([2, 7, 11, 15, 20, 27], 0, 5);
                desc.innerText = "Initialized left pointer at start and right pointer at end. Click Start.";
            }
            else if (currentTab === 'slidingWindow') {
                title.innerHTML = '<i class="fa-solid fa-window-maximize text-indigo-400"></i> Sliding Window (Max Sum Subarray)';
                timeComp.innerText = 'O(n)';
                spaceComp.innerText = 'O(1)';
                patternDesc.innerText = 'Maintains a dynamic window of fixed size k, sliding across the array in linear time.';
                setPseudoCode([
                    'function maxSumSubarray(arr, k) {',
                    '    let maxSum = 0, windowSum = 0;',
                    '    for(let i=0; i<k; i++) windowSum += arr[i];',
                    '    maxSum = windowSum;',
                    '    for(let i=k; i<arr.length; i++) {',
                    '        windowSum += arr[i] - arr[i-k];',
                    '        maxSum = Math.max(maxSum, windowSum);',
                    '    }',
                    '}'
                ]);
                inputs.innerHTML = `<label class="text-xs text-gray-400">Window Size (k):</label><input id="sw-k" type="number" value="3" class="bg-dark-900 border border-dark-700 text-white px-3 py-2 rounded-xl w-20 text-sm focus:outline-none focus:border-indigo-500">`;
                renderSlidingWindow([2, 1, 5, 1, 3, 2], 3, 0);
                desc.innerText = "Window of size k set. Click Start to slide across the array.";
            }
            else if (currentTab === 'backtracking') {
                title.innerHTML = '<i class="fa-solid fa-route text-indigo-400"></i> Backtracking (Subset Generation)';
                timeComp.innerText = 'O(2^n)';
                spaceComp.innerText = 'O(n)';
                patternDesc.innerText = 'Builds candidate solutions incrementally and backtracks when a constraint is violated.';
                setPseudoCode([
                    'function backtrack(start, path, nums) {',
                    '    res.push([...path]);',
                    '    for (let i = start; i < nums.length; i++) {',
                    '        path.push(nums[i]);',
                    '        backtrack(i + 1, path, nums);',
                    '        path.pop(); // backtrack',
                    '    }',
                    '}'
                ]);
                inputs.innerHTML = `<span class="text-xs text-gray-400">Dataset: [1, 2, 3]</span>`;
                renderBacktracking([], "Initial State");
                desc.innerText = "Ready to explore subset decision tree. Click Start.";
            }
            else if (currentTab === 'binaryAddition') {
                title.innerHTML = '<i class="fa-solid fa-plus text-indigo-400"></i> Binary Addition Visualizer';
                timeComp.innerText = 'O(max(N, M))';
                spaceComp.innerText = 'O(max(N, M))';
                patternDesc.innerText = 'Simulates manual column-by-column binary addition from right to left with carry tracking.';
                setPseudoCode([
                    'function addBinary(a, b) {',
                    '    let i = a.length - 1, j = b.length - 1, carry = 0, res = "";',
                    '    while (i >= 0 || j >= 0 || carry > 0) {',
                    '        let sum = carry;',
                    '        if (i >= 0) sum += parseInt(a[i--]);',
                    '        if (j >= 0) sum += parseInt(b[j--]);',
                    '        res = (sum % 2) + res;',
                    '        carry = Math.floor(sum / 2);',
                    '    }',
                    '    return res;',
                    '}'
                ], 1);
                inputs.innerHTML = `
                    <label class="text-xs text-gray-400">A:</label><input id="bin-a" type="text" value="1011" class="bg-dark-900 border border-dark-700 text-white px-2 py-1 rounded-lg w-16 text-sm text-center font-mono">
                    <label class="text-xs text-gray-400">B:</label><input id="bin-b" type="text" value="1101" class="bg-dark-900 border border-dark-700 text-white px-2 py-1 rounded-lg w-16 text-sm text-center font-mono">
                `;
                document.getElementById('progress-container').classList.remove('hidden');
                prepareBinaryAdditionSteps();
                renderBinaryAdditionStep(0);
                desc.innerText = "Prepped binary addition. Use the progress slider or click Start to play automatically.";
            }
        }

        function renderBinarySearch(arr, left, right, mid) {
            const container = document.getElementById('canvas-container');
            container.innerHTML = `<div class="flex gap-2 items-center flex-wrap justify-center">` + arr.map((val, idx) => {
                let bg = 'bg-dark-700 border-dark-600 text-gray-300';
                if (idx === mid) bg = 'bg-indigo-600 border-indigo-400 text-white scale-110 shadow-lg shadow-indigo-600/40';
                else if (idx >= left && idx <= right && left !== -1) bg = 'bg-dark-600 border-indigo-500/50 text-indigo-300';
                return `<div class="w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${bg}">
                    <span>${val}</span>
                    <span class="text-[9px] text-gray-400 font-normal">[${idx}]</span>
                </div>`;
            }).join('') + `</div>`;
        }

        function renderTwoPointers(arr, left, right) {
            const container = document.getElementById('canvas-container');
            container.innerHTML = `<div class="flex gap-3 items-center flex-wrap justify-center">` + arr.map((val, idx) => {
                let bg = 'bg-dark-700 border-dark-600 text-gray-300';
                let pointerLabel = '';
                if (idx === left) { bg = 'bg-violet-600 border-violet-400 text-white'; pointerLabel = '<span class="text-[10px] text-violet-300 font-semibold">L</span>'; }
                if (idx === right) { bg = 'bg-indigo-600 border-indigo-400 text-white'; pointerLabel = '<span class="text-[10px] text-indigo-300 font-semibold">R</span>'; }
                return `<div class="flex flex-col items-center gap-1">
                    <div class="w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold transition-all ${bg}">${val}</div>
                    ${pointerLabel}
                </div>`;
            }).join('') + `</div>`;
        }

        function renderSlidingWindow(arr, k, startIdx) {
            const container = document.getElementById('canvas-container');
            container.innerHTML = `<div class="flex gap-2 items-center flex-wrap justify-center">` + arr.map((val, idx) => {
                let inWindow = (idx >= startIdx && idx < startIdx + k);
                let bg = inWindow ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-dark-700 border-dark-600 text-gray-400';
                return `<div class="w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold transition-all ${bg}">${val}</div>`;
            }).join('') + `</div>`;
        }

        function renderBacktracking(path, stateMsg) {
            const container = document.getElementById('canvas-container');
            container.innerHTML = `<div class="flex flex-col items-center gap-4">
                <span class="text-xs text-violet-400 font-mono">${stateMsg}</span>
                <div class="flex gap-2">${path.length === 0 ? '<span class="text-xs text-gray-500 italic">Empty Set []</span>' : path.map(v => `<div class="w-10 h-10 rounded-lg bg-violet-600 text-white font-bold flex items-center justify-center">${v}</div>`).join('')}</div>
            </div>`;
        }

        // Binary Addition Step Generator
        function prepareBinaryAdditionSteps() {
            const a = document.getElementById('bin-a').value.trim() || "1011";
            const b = document.getElementById('bin-b').value.trim() || "1101";
            
            let tempI = a.length - 1;
            let tempJ = b.length - 1;
            let tempCarry = 0;
            let tempRes = "";
            
            binarySteps = [];
            
            // Step 0: Initialization
            binarySteps.push({
                a, b, idxA: tempI, idxB: tempJ, carry: 0, partialRes: "",
                desc: "Initialized pointers i, j at the rightmost bits and carry = 0.",
                codeLine: 1
            });

            while (tempI >= 0 || tempJ >= 0 || tempCarry > 0) {
                let sum = tempCarry;
                let bitA = tempI >= 0 ? parseInt(a[tempI]) : 0;
                let bitB = tempJ >= 0 ? parseInt(b[tempJ]) : 0;
                
                // Line 3: let sum = carry;
                binarySteps.push({
                    a, b, idxA: tempI, idxB: tempJ, carry: tempCarry, partialRes: tempRes,
                    desc: `While loop active. Initializing sum with carry (${tempCarry}).`,
                    codeLine: 3
                });

                if (tempI >= 0) {
                    sum += bitA;
                    // Line 4: if (i >= 0) sum += parseInt(a[i--]);
                    binarySteps.push({
                        a, b, idxA: tempI, idxB: tempJ, carry: tempCarry, partialRes: tempRes,
                        desc: `Added bit A[${tempI}] (${bitA}) to sum. Total sum = ${sum}.`,
                        codeLine: 4
                    });
                }

                if (tempJ >= 0) {
                    sum += bitB;
                    // Line 5: if (j >= 0) sum += parseInt(b[j--]);
                    binarySteps.push({
                        a, b, idxA: tempI, idxB: tempJ, carry: tempCarry, partialRes: tempRes,
                        desc: `Added bit B[${tempJ}] (${bitB}) to sum. Total sum = ${sum}.`,
                        codeLine: 5
                    });
                }

                let nextBit = sum % 2;
                let nextCarry = Math.floor(sum / 2);
                tempRes = nextBit + tempRes;

                // Line 6: res = (sum % 2) + res;
                binarySteps.push({
                    a, b, idxA: tempI, idxB: tempJ, carry: tempCarry, partialRes: tempRes,
                        desc: `Computed result bit: ${sum} % 2 = ${nextBit}. Prepend to result -> "${tempRes}".`,
                    codeLine: 6
                });

                tempCarry = nextCarry;
                // Line 7: carry = Math.floor(sum / 2);
                binarySteps.push({
                    a, b, idxA: tempI, idxB: tempJ, carry: tempCarry, partialRes: tempRes,
                    desc: `Computed new carry: Math.floor(${sum} / 2) = ${tempCarry}.`,
                    codeLine: 7
                });

                tempI--;
                tempJ--;
            }

            // Final return step
            binarySteps.push({
                a, b, idxA: -1, idxB: -1, carry: tempCarry, partialRes: tempRes,
                desc: `Addition completed! Final binary result is "${tempRes}".`,
                codeLine: 9
            });

            currentStepIdx = 0;
            const slider = document.getElementById('step-slider');
            slider.max = binarySteps.length - 1;
            slider.value = 0;
        }

        function renderBinaryAdditionStep(idx) {
            if (!binarySteps.length) return;
            const st = binarySteps[idx];
            currentStepIdx = idx;
            document.getElementById('step-slider').value = idx;
            document.getElementById('progress-label').innerText = `Step ${idx + 1} of ${binarySteps.length}`;
            document.getElementById('step-description').innerText = st.desc;
            
            // Highlight code line
            setPseudoCode([
                'function addBinary(a, b) {',
                '    let i = a.length - 1, j = b.length - 1, carry = 0, res = "";',
                '    while (i >= 0 || j >= 0 || carry > 0) {',
                '        let sum = carry;',
                '        if (i >= 0) sum += parseInt(a[i--]);',
                '        if (j >= 0) sum += parseInt(b[j--]);',
                '        res = (sum % 2) + res;',
                '        carry = Math.floor(sum / 2);',
                '    }',
                '    return res;',
                '}'
            ], st.codeLine);

            const container = document.getElementById('canvas-container');
            const maxLen = Math.max(st.a.length, st.b.length);
            const paddedA = st.a.padStart(maxLen, ' ');
            const paddedB = st.b.padStart(maxLen, ' ');

            let htmlA = paddedA.split('').map((char, i) => {
                let isCurrent = (i === st.idxA);
                let bg = isCurrent ? 'bg-indigo-600 border-indigo-400 text-white scale-110 shadow-lg' : 'bg-dark-700 border-dark-600 text-gray-300';
                return `<div class="w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-lg transition-all ${bg}">${char === ' ' ? '&nbsp;' : char}</div>`;
            }).join('');

            let htmlB = paddedB.split('').map((char, i) => {
                let isCurrent = (i === st.idxB);
                let bg = isCurrent ? 'bg-violet-600 border-violet-400 text-white scale-110 shadow-lg' : 'bg-dark-700 border-dark-600 text-gray-300';
                return `<div class="w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-lg transition-all ${bg}">${char === ' ' ? '&nbsp;' : char}</div>`;
            }).join('');

            container.innerHTML = `
                <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-3">
                            <span class="text-xs text-gray-400 w-12 font-mono">A:</span>
                            <div class="flex gap-1.5">${htmlA}</div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-xs text-gray-400 w-12 font-mono">B:</span>
                            <div class="flex gap-1.5">${htmlB}</div>
                        </div>
                    </div>
                    <div class="h-px bg-dark-700 w-full max-w-sm my-1"></div>
                    <div class="flex items-center justify-between w-full max-w-sm px-4 text-xs font-mono">
                        <span class="text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">Carry: ${st.carry}</span>
                        <span class="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">Result: "${st.partialRes || '0'}"</span>
                    </div>
                </div>
            `;
        }

        function onSliderChange(val) {
            clearInterval(timer);
            renderBinaryAdditionStep(parseInt(val));
        }

        function stepForward() {
            clearInterval(timer);
            if (currentStepIdx < binarySteps.length - 1) {
                renderBinaryAdditionStep(currentStepIdx + 1);
            }
        }

        function stepBackward() {
            clearInterval(timer);
            if (currentStepIdx > 0) {
                renderBinaryAdditionStep(currentStepIdx - 1);
            }
        }

        function runAlgorithm() {
            clearInterval(timer);
            const badge = document.getElementById('status-badge');
            badge.innerText = "Running...";
            badge.className = "px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium animate-pulse";

            if (currentTab === 'binaryAddition') {
                prepareBinaryAdditionSteps();
                let idx = 0;
                timer = setInterval(() => {
                    if (idx < binarySteps.length) {
                        renderBinaryAdditionStep(idx);
                        idx++;
                    } else {
                        badge.innerText = "Completed";
                        badge.className = "px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium";
                        clearInterval(timer);
                    }
                }, 1400); // 1.4 seconds per step
            } else {
                // Other tabs basic run handler
                badge.innerText = "Completed";
                badge.className = "px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium";
            }
        }

        function resetVisualizer() {
            clearInterval(timer);
            const badge = document.getElementById('status-badge');
            badge.innerText = "Ready";
            badge.className = "px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium";
            loadTabContent();
        }

// Expose handlers used by the JSX (originally inline onclick/oninput attributes)
window.switchTab = switchTab;
window.stepBackward = stepBackward;
window.stepForward = stepForward;
window.onSliderChange = onSliderChange;
window.runAlgorithm = runAlgorithm;
window.resetVisualizer = resetVisualizer;

// Replaces `window.onload = loadTabContent;`
export { loadTabContent };
