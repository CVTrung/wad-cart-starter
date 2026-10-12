# Self-assessment - IA#1

Submitted by: 24127256 - Chau Vu Trung

Total I claim: 87 / 100

| Criterion | Max | I claim | Evidence |
| --- | --- | --- | --- |
| Behaviour | 30 | 30 | `src/cart.js`; `test/cart.test.js`: "the example from the slides", "an empty cart costs nothing", shipping threshold, RangeError, and rounding tests. Latest recorded local result: 99 passed, 0 failed; no instructor tests were run. |
| Tests | 20 | 20 | `test/cart.test.js`: the original example, 15 Part 2 tests, and 83 additional validation tests. Covers missing fields, wrong types, nonfinite values, options, and input preservation. Latest recorded `npm test`: 99 passed, 0 failed. |
| Harness | 20 | 12 | `AGENTS.md` documents the stack, scope, rules, and checks; `package.json` provides `npm test`. `.github/workflows/ci.yml` runs tests on push and pull requests. I think CI is not verified correctly than run it and check if it work, Some information was not stated clearly causing extra work or modification |
| Brief | 15 | 12 | `BRIEF.md`: "Task", "File scope", "Function contract", "Input validation", and "Workflow and acceptance checks". Includes permitted files, error cases, and no dependencies. Written from the conversation after implementation and revised into a standalone task brief. Using the brief i created another project but does not have the exact work but still get the same result  |
| AI-LOG.md | 15 | 13 | `AI-LOG.md`: Part 1, Part 2, local CI/documents, additional validation, and conversation brief entries. Uses Tool / Asked for / Changed / Not used / Insight. Only insight was written by me, other information is AI generated based on the conversation. |

## What I did not manage

- I couldn't fully control the amount of code AI generated causing test file having extra tests (could only be useful in some cases)
- I did not very satisfied with the harness and prompting, there are some problems i did not aware of
- AI context window management was not very well. I noticed that it has forgot some previous instructions
- I still fall for inconsistent workflow and make some changes halfway through that could have been avoided

## What I would do differently

- More properly stated instruction in AGENTS.md
- Make better prompting than lazy one line prompting after the initiate prompt
- Control the work amount AI should do and focus on what mainly matter rather than search for every cases (Still, having every cases included might result better validation but make the test unnecessary complicated)