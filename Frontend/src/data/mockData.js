export const mockComparisons = [
  {
    id: 'comp-1',
    problem: '',
    solution_1: `## JavaScript Factorial (Iterative)

Use a loop when you want predictable performance and no recursion depth issues.

\`factorial(n)\` requirements:
- non-negative integer input
- return \`1\` for \`0\`
- throw for invalid values

\`\`\`js
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('n must be a non-negative integer');
  }

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}
\`\`\`

Example:
- \`factorial(5)\` -> \`120\`
- time complexity: \`O(n)\`
- space complexity: \`O(1)\``,

    solution_2: `## JavaScript Factorial (Recursive)

Recursive version is concise and easier to map to the math definition:

\`n! = n * (n - 1)!\` and \`0! = 1\`

\`\`\`js
const factorial = (n) => {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('Expected a non-negative integer');
  }
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
\`\`\`

Notes:
1. Very readable for interviews.
2. For large \`n\`, recursion can overflow the call stack.
3. Prefer iterative approach in production if limits are unknown.`,

    judge_recommendation: {
      solution_1_score: 8.8,
      solution_2_score: 8.2,
      solution_1_reasoning:
        'Iterative version is robust for runtime constraints, includes clear input validation, and explains complexity. Practical and production-friendly.',
      solution_2_reasoning:
        'Recursive explanation is clear and mathematically intuitive. It correctly warns about stack limits, but it is slightly less resilient than the iterative version.',
    },
  },

  {
    id: 'comp-2',
    problem: '',
    solution_1: `## Debugging the Function

Bug:

\`\`\`js
function sum(a, b) {
  return a - b;
}
\`\`\`

Fix:

\`\`\`js
function sum(a, b) {
  return a + b;
}
\`\`\`

Quick checks:
- \`sum(2, 3) === 5\`
- \`sum(-1, 1) === 0\`
- \`sum(0, 0) === 0\`

If this came from a calculator feature, also add tests for string inputs and reject invalid values.`,

    solution_2: '',

    judge_recommendation: {
      solution_1_score: 9.0,
      solution_2_score: 0,
      solution_1_reasoning:
        'Response A directly identifies the operator bug, provides corrected code, and includes simple validation checks.',
      solution_2_reasoning:
        'Response B contains no output, so it cannot be evaluated for correctness or clarity.',
    },
  },

  {
    id: 'comp-3',
    problem: '',
    solution_1: `## Reasoning: Which plan is cheaper?

Given:
- Plan A: \`$12/month\`
- Plan B: \`$90/year\`

Convert Plan B to monthly cost:

\`\`\`text
$90 / 12 = $7.50 per month
\`\`\`

Conclusion:
- Plan B is cheaper by \`$4.50/month\`
- Over a year, Plan A costs \`$144\`, so Plan B saves \`$54\`

Recommendation: choose Plan B if you can commit annually.`,

    solution_2: `## Cost Comparison

Let's compare the totals for one year:

1. Plan A total: \`12 * 12 = $144\`
2. Plan B total: \`$90\`

So Plan B is lower cost.

Extra note: if cash flow is tight, Plan A spreads payments monthly, but it is still more expensive overall.`,

    judge_recommendation: {
      solution_1_score: 8.1,
      solution_2_score: 8.4,
      solution_1_reasoning:
        'Correct arithmetic and clear recommendation. Slightly verbose for a straightforward comparison.',
      solution_2_reasoning:
        'Concise and correct. It includes a practical caveat about payment flexibility while keeping the answer focused.',
    },
  },

  {
    id: 'comp-4',
    problem: '',
    solution_1: null,
    solution_2: `## Summary in 3 bullets

- The team launched a beta and collected user feedback.
- Most users liked speed improvements, but reported onboarding confusion.
- Next sprint should prioritize onboarding clarity while preserving performance gains.

If needed, I can rewrite this for email or slide format.`,
    model_1_failed: true,
    judge_recommendation: null,
  },
];
