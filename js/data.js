/* ==========================================================
   PlacePrep – question banks and sample data (single source of truth)
   ========================================================== */

const QUIZ_BANK = [
  /* ---------- Quantitative ---------- */
  { cat: "quant", q: "A train 120 m long passes a pole in 6 seconds. What is its speed in km/h?",
    opts: ["54", "72", "60", "80"], ans: 1,
    why: "Speed = 120 / 6 = 20 m/s. Multiply by 18/5 to convert: 20 × 3.6 = 72 km/h." },
  { cat: "quant", q: "What is 15% of 240?",
    opts: ["32", "36", "40", "24"], ans: 1,
    why: "15% of 240 = 0.15 × 240 = 36." },
  { cat: "quant", q: "If a : b = 2 : 3 and b : c = 4 : 5, what is a : c?",
    opts: ["2 : 5", "8 : 15", "6 : 10", "4 : 9"], ans: 1,
    why: "Make b equal in both ratios (LCM of 3 and 4 = 12): a : b = 8 : 12 and b : c = 12 : 15, so a : c = 8 : 15." },
  { cat: "quant", q: "Simple interest on ₹5,000 at 8% per annum for 3 years is:",
    opts: ["₹1,000", "₹1,200", "₹1,400", "₹1,600"], ans: 1,
    why: "SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = ₹1,200." },
  { cat: "quant", q: "What is the average of the first 10 natural numbers?",
    opts: ["5", "5.5", "6", "10"], ans: 1,
    why: "Sum = 10 × 11 / 2 = 55, and 55 / 10 = 5.5." },
  { cat: "quant", q: "A can finish a job in 10 days and B in 15 days. Working together, how many days will they take?",
    opts: ["5", "6", "7.5", "8"], ans: 1,
    why: "Combined rate = 1/10 + 1/15 = 1/6 of the job per day, so 6 days." },
  { cat: "quant", q: "An article bought for ₹400 is sold at a 20% profit. What is the selling price?",
    opts: ["₹420", "₹460", "₹480", "₹500"], ans: 2,
    why: "SP = 400 × 1.20 = ₹480." },
  { cat: "quant", q: "Find the next number: 2, 6, 12, 20, 30, ?",
    opts: ["38", "40", "42", "44"], ans: 2,
    why: "The terms are n × (n+1): 1×2, 2×3, 3×4, 4×5, 5×6, so the next is 6×7 = 42." },

  /* ---------- Logical reasoning ---------- */
  { cat: "logic", q: "Find the next letter: A, C, F, J, O, ?",
    opts: ["T", "U", "V", "S"], ans: 1,
    why: "Gaps increase by 1 each time: +2, +3, +4, +5, then +6. O (15) + 6 = 21 = U." },
  { cat: "logic", q: "Odd one out: 3, 5, 11, 14, 17",
    opts: ["3", "11", "14", "17"], ans: 2,
    why: "Every other number is prime; 14 is composite." },
  { cat: "logic", q: "If CAT is coded as 24 (3 + 1 + 20), what is the code for DOG?",
    opts: ["24", "26", "28", "22"], ans: 1,
    why: "D=4, O=15, G=7, and 4 + 15 + 7 = 26." },
  { cat: "logic", q: "Pointing to a man, Riya says, \"He is the son of my mother's only brother.\" How is the man related to Riya?",
    opts: ["Brother", "Uncle", "Cousin", "Nephew"], ans: 2,
    why: "Her mother's brother is her maternal uncle; his son is her cousin." },
  { cat: "logic", q: "A is taller than B, B is taller than C, and D is shorter than C. Who is the shortest?",
    opts: ["A", "B", "C", "D"], ans: 3,
    why: "Order from tallest: A > B > C > D, so D is the shortest." },
  { cat: "logic", q: "What is the angle between the hands of a clock at 3:00?",
    opts: ["60°", "75°", "90°", "120°"], ans: 2,
    why: "Each hour mark is 30°, and 3 hours × 30° = 90°." },
  { cat: "logic", q: "If MANGO is written as NBOHP, how is APPLE written in that code?",
    opts: ["BQQMF", "ZOOKD", "BPQMF", "CQQMF"], ans: 0,
    why: "Each letter moves one step forward: A→B, P→Q, P→Q, L→M, E→F, giving BQQMF." },
  { cat: "logic", q: "A man walks 5 km north, then 3 km east, then 5 km south. How far is he from his starting point?",
    opts: ["3 km", "5 km", "8 km", "13 km"], ans: 0,
    why: "The north and south legs cancel out, leaving only the 3 km eastward displacement." },

  /* ---------- Verbal ability ---------- */
  { cat: "verbal", q: "Choose the synonym of \"ABUNDANT\".",
    opts: ["Scarce", "Plentiful", "Rare", "Tiny"], ans: 1,
    why: "Abundant means existing in large quantities, i.e. plentiful." },
  { cat: "verbal", q: "Choose the antonym of \"ANCIENT\".",
    opts: ["Old", "Antique", "Modern", "Historic"], ans: 2,
    why: "Ancient means very old; the opposite is modern." },
  { cat: "verbal", q: "Fill in the blank: She ____ to college every day.",
    opts: ["go", "goes", "going", "gone"], ans: 1,
    why: "A singular third-person subject in the simple present takes the verb form 'goes'." },
  { cat: "verbal", q: "What does the idiom \"break the ice\" mean?",
    opts: ["Damage something fragile", "Start a conversation in an awkward setting", "End a friendship", "Cool a drink quickly"], ans: 1,
    why: "It means to ease the initial tension when people meet for the first time." },
  { cat: "verbal", q: "One word for \"a person who can speak two languages\":",
    opts: ["Polyglot", "Bilingual", "Linguist", "Orator"], ans: 1,
    why: "Bilingual = fluent in two languages. A polyglot knows many." },
  { cat: "verbal", q: "Choose the correctly spelled word.",
    opts: ["Acommodation", "Accomodation", "Accommodation", "Acomodation"], ans: 2,
    why: "Accommodation has a double 'c' and a double 'm'." },
  { cat: "verbal", q: "Fill in the blank: Neither of the boys ____ present.",
    opts: ["were", "was", "are", "be"], ans: 1,
    why: "'Neither' is singular, so it takes 'was'." },
  { cat: "verbal", q: "Convert to passive voice: \"The chef cooked the meal.\"",
    opts: ["The meal is cooked by the chef.", "The meal was cooked by the chef.", "The chef was cooked by the meal.", "The meal had cooked the chef."], ans: 1,
    why: "Past tense active becomes 'was + past participle' in the passive: 'The meal was cooked by the chef.'" }
];

const QUIZ_CATEGORIES = {
  mixed:  { label: "Mixed Round",  emoji: "🎯", desc: "10 random questions" },
  quant:  { label: "Quantitative", emoji: "➗", desc: "Maths & numbers" },
  logic:  { label: "Logical",      emoji: "🧩", desc: "Reasoning & puzzles" },
  verbal: { label: "Verbal",       emoji: "📖", desc: "English & grammar" }
};

const PROBLEMS = [
  {
    id: "two-sum", title: "Two Sum", diff: "easy", topic: "Arrays", fn: "twoSum",
    desc: "Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices <code>[i, j]</code> (with i &lt; j) of the two numbers that add up to the target. Exactly one solution exists.",
    hint: "Store each number's index in an object/Map while looping. For every number, check if <code>target - num</code> was already seen.",
    starter: "function twoSum(nums, target) {\n  // your code here\n}",
    solution: "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}",
    cases: [ { in: [[2,7,11,15], 9], out: [0,1] }, { in: [[3,2,4], 6], out: [1,2] }, { in: [[3,3], 6], out: [0,1] } ]
  },
  {
    id: "reverse-string", title: "Reverse a String", diff: "easy", topic: "Strings", fn: "reverseString",
    desc: "Write a function that returns the given string <code>s</code> reversed.",
    hint: "Split into characters, reverse the array, join back — or loop from the last index to the first.",
    starter: "function reverseString(s) {\n  // your code here\n}",
    solution: "function reverseString(s) {\n  let out = \"\";\n  for (let i = s.length - 1; i >= 0; i--) out += s[i];\n  return out;\n}",
    cases: [ { in: ["hello"], out: "olleh" }, { in: [""], out: "" }, { in: ["a b"], out: "b a" } ]
  },
  {
    id: "palindrome", title: "Valid Palindrome", diff: "easy", topic: "Strings", fn: "isPalindrome",
    desc: "Return <code>true</code> if <code>s</code> reads the same forwards and backwards, considering only letters and digits and ignoring case.",
    hint: "Clean the string with a regex like <code>/[^a-z0-9]/gi</code>, lowercase it, then compare with its reverse (or use two pointers).",
    starter: "function isPalindrome(s) {\n  // your code here\n}",
    solution: "function isPalindrome(s) {\n  const t = s.toLowerCase().replace(/[^a-z0-9]/g, \"\");\n  let i = 0, j = t.length - 1;\n  while (i < j) {\n    if (t[i++] !== t[j--]) return false;\n  }\n  return true;\n}",
    cases: [ { in: ["A man, a plan, a canal: Panama"], out: true }, { in: ["race a car"], out: false }, { in: [""], out: true } ]
  },
  {
    id: "fizzbuzz", title: "FizzBuzz", diff: "easy", topic: "Math", fn: "fizzBuzz",
    desc: "Return an array of strings for numbers 1..n: \"Fizz\" for multiples of 3, \"Buzz\" for multiples of 5, \"FizzBuzz\" for both, otherwise the number as a string.",
    hint: "Check divisibility by 15 first (or by both 3 and 5), then by 3, then by 5.",
    starter: "function fizzBuzz(n) {\n  // your code here\n}",
    solution: "function fizzBuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push(\"FizzBuzz\");\n    else if (i % 3 === 0) out.push(\"Fizz\");\n    else if (i % 5 === 0) out.push(\"Buzz\");\n    else out.push(String(i));\n  }\n  return out;\n}",
    cases: [ { in: [3], out: ["1","2","Fizz"] }, { in: [5], out: ["1","2","Fizz","4","Buzz"] }, { in: [15], out: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] } ]
  },
  {
    id: "binary-search", title: "Binary Search", diff: "easy", topic: "Searching", fn: "binarySearch",
    desc: "Given a sorted array <code>arr</code> and a <code>target</code>, return the index of the target or <code>-1</code> if it is absent. Aim for O(log n).",
    hint: "Keep <code>lo</code> and <code>hi</code> pointers, check the middle element, and discard the half that cannot contain the target.",
    starter: "function binarySearch(arr, target) {\n  // your code here\n}",
    solution: "function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}",
    cases: [ { in: [[1,3,5,7,9], 7], out: 3 }, { in: [[1,3,5,7,9], 4], out: -1 }, { in: [[], 1], out: -1 }, { in: [[2], 2], out: 0 } ]
  },
  {
    id: "climbing-stairs", title: "Climbing Stairs", diff: "easy", topic: "Dynamic Programming", fn: "climbStairs",
    desc: "You can climb 1 or 2 steps at a time. In how many distinct ways can you reach the top of a staircase with <code>n</code> steps?",
    hint: "The answer for n is the answer for n-1 plus the answer for n-2 — it is the Fibonacci sequence.",
    starter: "function climbStairs(n) {\n  // your code here\n}",
    solution: "function climbStairs(n) {\n  let a = 1, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}",
    cases: [ { in: [2], out: 2 }, { in: [3], out: 3 }, { in: [5], out: 8 }, { in: [10], out: 89 } ]
  },
  {
    id: "max-subarray", title: "Maximum Subarray", diff: "medium", topic: "Dynamic Programming", fn: "maxSubArray",
    desc: "Find the contiguous subarray (at least one element) with the largest sum and return that sum.",
    hint: "Kadane's algorithm: at each element, decide whether to extend the running sum or start fresh from the current element.",
    starter: "function maxSubArray(nums) {\n  // your code here\n}",
    solution: "function maxSubArray(nums) {\n  let best = nums[0], cur = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    cur = Math.max(nums[i], cur + nums[i]);\n    best = Math.max(best, cur);\n  }\n  return best;\n}",
    cases: [ { in: [[-2,1,-3,4,-1,2,1,-5,4]], out: 6 }, { in: [[1]], out: 1 }, { in: [[5,4,-1,7,8]], out: 23 }, { in: [[-3,-1,-2]], out: -1 } ]
  },
  {
    id: "valid-parens", title: "Valid Parentheses", diff: "medium", topic: "Stack", fn: "isValid",
    desc: "Given a string containing only <code>()[]{}</code>, determine whether the brackets are correctly opened and closed in the right order.",
    hint: "Push opening brackets onto a stack. On a closing bracket, the top of the stack must be its matching opener.",
    starter: "function isValid(s) {\n  // your code here\n}",
    solution: "function isValid(s) {\n  const pair = { \")\": \"(\", \"]\": \"[\", \"}\": \"{\" };\n  const stack = [];\n  for (const ch of s) {\n    if (pair[ch]) {\n      if (stack.pop() !== pair[ch]) return false;\n    } else stack.push(ch);\n  }\n  return stack.length === 0;\n}",
    cases: [ { in: ["()[]{}"], out: true }, { in: ["(]"], out: false }, { in: ["([)]"], out: false }, { in: ["{[]}"], out: true } ]
  },
  {
    id: "merge-intervals", title: "Merge Intervals", diff: "medium", topic: "Arrays", fn: "mergeIntervals",
    desc: "Given an array of <code>[start, end]</code> intervals, merge all overlapping intervals and return the result sorted by start.",
    hint: "Sort by start. Walk through, and if the current interval starts before the last merged one ends, extend the end.",
    starter: "function mergeIntervals(intervals) {\n  // your code here\n}",
    solution: "function mergeIntervals(intervals) {\n  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);\n  const out = [];\n  for (const cur of sorted) {\n    const last = out[out.length - 1];\n    if (last && cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);\n    else out.push([...cur]);\n  }\n  return out;\n}",
    cases: [ { in: [[[1,3],[2,6],[8,10],[15,18]]], out: [[1,6],[8,10],[15,18]] }, { in: [[[1,4],[4,5]]], out: [[1,5]] }, { in: [[[5,6],[1,2]]], out: [[1,2],[5,6]] } ]
  },
  {
    id: "longest-substring", title: "Longest Unique Substring", diff: "hard", topic: "Sliding Window", fn: "lengthOfLongestSubstring",
    desc: "Return the length of the longest substring of <code>s</code> that contains no repeated characters.",
    hint: "Use a sliding window with a Map of the last index seen for each character; move the left edge past a repeat.",
    starter: "function lengthOfLongestSubstring(s) {\n  // your code here\n}",
    solution: "function lengthOfLongestSubstring(s) {\n  const last = new Map();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    const ch = s[right];\n    if (last.has(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n    last.set(ch, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}",
    cases: [ { in: ["abcabcbb"], out: 3 }, { in: ["bbbbb"], out: 1 }, { in: ["pwwkew"], out: 3 }, { in: [""], out: 0 } ]
  }
];

const INTERVIEW_BANK = [
  /* HR */
  { cat: "hr", q: "Tell me about yourself.",
    a: "Use a Present → Past → Future structure in about 60–90 seconds: your current course and key skills, one or two achievements (a project, internship), then why this role excites you." },
  { cat: "hr", q: "Why should we hire you?",
    a: "Match 2–3 of your strongest skills to the job description, back each with a quick proof (project, result), and show you will learn fast and fit the team." },
  { cat: "hr", q: "What are your strengths and weaknesses?",
    a: "Pick strengths relevant to the role and illustrate with an example. For a weakness, choose a real, non-critical one and describe the concrete steps you are taking to improve it." },
  { cat: "hr", q: "Where do you see yourself in five years?",
    a: "Show ambition aligned with the company: becoming a strong contributor, growing technical depth and perhaps mentoring others. Avoid naming a competitor or an unrelated field." },
  { cat: "hr", q: "Why do you want to work for our company?",
    a: "Research the company's products, culture and recent news. Connect one or two specifics with your own interests and skills rather than giving a generic answer." },
  { cat: "hr", q: "Are you willing to relocate or work in shifts?",
    a: "Answer honestly. If flexible, say so with enthusiasm; if you have constraints, state them politely and focus on what you can do." },

  /* Technical */
  { cat: "tech", q: "What is the difference between an array and a linked list?",
    a: "Arrays give O(1) random access but costly inserts/deletes in the middle and need contiguous memory. Linked lists give O(1) insert/delete at a known node but O(n) access and extra memory for pointers." },
  { cat: "tech", q: "Explain OOP and its four pillars.",
    a: "Object-oriented programming models software as interacting objects. The pillars: Encapsulation (bundling data and methods, hiding internals), Abstraction (exposing only essentials), Inheritance (reusing behaviour) and Polymorphism (one interface, many forms)." },
  { cat: "tech", q: "What is the difference between SQL and NoSQL databases?",
    a: "SQL databases are relational with fixed schemas and strong ACID guarantees (MySQL, PostgreSQL). NoSQL stores (MongoDB, Redis) use flexible models such as documents or key-value pairs and often scale horizontally more easily." },
  { cat: "tech", q: "What happens when you type a URL in the browser and press Enter?",
    a: "DNS resolves the domain to an IP, the browser opens a TCP (and TLS) connection, sends an HTTP request, the server returns a response, and the browser parses HTML, fetches CSS/JS and renders the page." },
  { cat: "tech", q: "What is the difference between a process and a thread?",
    a: "A process is an independent program with its own memory space. Threads are lightweight units of execution inside a process that share its memory, so communication is cheaper but needs synchronisation." },
  { cat: "tech", q: "Explain time complexity of common sorting algorithms.",
    a: "Bubble/insertion/selection sort are O(n²) in the average case. Merge sort and heap sort are O(n log n) always; quick sort is O(n log n) on average but O(n²) in the worst case." },

  /* Behavioural */
  { cat: "behav", q: "Describe a time you faced a difficult challenge in a team project.",
    a: "Use the STAR method: Situation, Task, Action, Result. Be specific about what YOU did and quantify the result if possible." },
  { cat: "behav", q: "Tell me about a time you failed and what you learned.",
    a: "Choose a genuine but recoverable failure, own your part without blaming others, and spend most of your answer on the lesson and how you applied it afterwards." },
  { cat: "behav", q: "How do you handle tight deadlines and pressure?",
    a: "Describe your method: prioritising tasks, breaking work into milestones, communicating early about risks. Give a short example from a hackathon or exam period." },
  { cat: "behav", q: "Describe a conflict with a teammate and how you resolved it.",
    a: "Show empathy and communication: you listened, clarified the real issue, proposed a compromise and focused on the shared goal. Never speak ill of the other person." },
  { cat: "behav", q: "Tell me about a time you showed leadership.",
    a: "Leadership need not mean a title. Talk about taking initiative, organising teammates, or guiding a club event — and the outcome it produced." },
  { cat: "behav", q: "Tell me about something you taught yourself recently.",
    a: "Pick a skill relevant to the role, explain how you learned it (docs, courses, projects) and what you built. This shows curiosity and self-direction." }
];

const INTERVIEW_CATEGORIES = {
  all:   "All Questions",
  hr:    "HR Round",
  tech:  "Technical",
  behav: "Behavioural"
};

/* Sample drives are generated relative to "today" so the countdown always works.
   Company names are fictional. */
const DRIVE_TEMPLATES = [
  { company: "TechNova Solutions",   role: "Software Engineer",      type: "IT",         pkg: "6.5 LPA",  days: 6  },
  { company: "InfraCore Systems",    role: "Cloud Support Associate", type: "IT",         pkg: "4.8 LPA",  days: 11 },
  { company: "DataBridge Analytics", role: "Data Analyst Trainee",    type: "Analytics",  pkg: "5.2 LPA",  days: 15 },
  { company: "Apex Manufacturing",   role: "Graduate Engineer Trainee", type: "Core",     pkg: "4.2 LPA",  days: 21 },
  { company: "FinEdge Capital",      role: "Associate Analyst",       type: "Finance",    pkg: "7.0 LPA",  days: 28 },
  { company: "PixelCraft Studio",    role: "Frontend Developer",      type: "IT",         pkg: "5.8 LPA",  days: 34 }
];
