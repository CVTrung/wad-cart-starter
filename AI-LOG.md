# AI usage log

## 2026-10-12 - Part 1: cartTotal

Tool: Chatgpt Sol-6.1.
Asked for: Read the course, rubric, README.md, and AGENTS.md; follow Plan -> Implement -> Validate; wait for approval before editing
Changed: src/cart.js with a simple loop, RangeError validation, subtotal-based shipping, VAT, and Math.round on the final total. Inputs are not mutated; no dependencies were added.
Not used: No TypeScript, new libraries, unspecified defaults, or test-file edits during Part 1.
Insight: The AI understood the assignments given and followed the coding rule a bit too "restrict" which will be cover later after the core tests is properly implemented

## 2026-10-12 - Part 2: focused tests

Tool: Chatgpt Sol-6.1.
Asked for: Continue to Part 2, adding focused tests while preserving the original example.
Changed: 15 additional node:test cases in test/cart.test.js covering empty carts, shipping boundaries, negative prices, zero/negative/fractional quantities, validation of a later item, rounding, numeric output, and input preservation.
Not used: No dependencies or assertions that recompute the implementation's formula as the expected result.
Insight: I thought a bit of should i let the AI decide the test case based on the provided slide show because it is heavily depended on it's thought. But i think it is required to let it add more tests in case of function failure due to some changed which happened before in other projects

## 2026-10-12 - Local CI and submission documents

Tool: Chatgpt Sol-6.1.
Asked for: Configure CI locally and prepare documents using the course AI-log example and assignment self-assessment structure
Changed: .github/workflows/ci.yml, AI-LOG.md, SELF_ASSESSMENT_REPORT.md, and CI documentation in README.md and AGENTS.md.
Not used: Rejected the proposed check-format script and BRIEF.md. No TypeScript, package.json edits, formatting/linting gate, or new dependencies were added.
Insight: AI requested to write format script checker and brief.md to summarize the work but i think it is not necessary. AGENTS.md already provided all the similar instructions, or i misunderstood and it should act as sumary file for the changes  

## 2026-10-12 - Additional input validation

Tool: Chatgpt Sol-6.1.
Asked for: Follow the revised AI-log format; handle missing values, incorrect data types, and invalid options in src/cart.js; add focused tests. Keep an empty cart returning 0 without validating options. The student approved the proposed error contract and scope.
Changed: src/cart.js now checks array/object containers, required numeric fields, finite nonnegative values, and positive integer quantities. test/cart.test.js adds 83 validation cases, preserving the existing 16. README.md, AGENTS.md, and SELF_ASSESSMENT_REPORT.md describe the approved extension. The expanded suite initially reported 38 passed and 61 failed; after implementation, npm test reported 99 passed and 0 failed.
Not used: No automatic type conversion, default values, VAT upper limit, dependencies, TypeScript, format script, BRIEF.md, CI changes, or remote publishing. Existing log entries and student reflections were preserved.
Insight: 
- I might have not limited it's test should focus on main feature and main errors check so it throw a test set identify every single case could happen. 
- The reason for this addtional change is because i noticed that the cases provided by the instructor were not fully cover the errors might happen

## 2026-10-12 - Conversation brief

Tool: Chatgpt Sol-6.1.
Asked for: Make a brief of the conversation as stated in the instruction files.
Changed: Created BRIEF.md with the original workflow request, summarized approved coding contract, file scope, error cases, no-dependency constraint, actual previous verification results, and unfinished submission work. Updated README.md, AGENTS.md, and SELF_ASSESSMENT_REPORT.md to reference the new brief and remove outdated statements that it was not created.
Not used: No source, test, CI, dependency, or remote changes. Existing AI-log entries and student reflections were preserved. The brief is identified as prepared after implementation rather than an original prewritten prompt.
Insight: The brief could technically generate my project work but as i reviewed there some problem with it: 
- The Project folder path for my computer was included 
- My approvement for each part is also stated in the Brief.md for some reason which cause the Agent will work with extra information    