# Project Rules — CSC13008 IA#1: cartTotal

## Stack and scope
- Use plain JavaScript (ES modules), Node.js 22+, and Node's built-in `node:test` runner. **No new dependencies.**
- Read `README.md`, the starter tests, and this file before coding. Follow the assignment specification; ask about genuine ambiguities instead of inventing behavior.
- Keep changes small, readable, and relevant. Use named exports and avoid unnecessary abstractions.
- File permissions: You may create and modify files necessary for the assignment, but keep changes focused, request approval for significant changes or new dependencies, and never delete or overwrite existing work without permission. Every modification should be notified of what have been done or changed
- Never alter existing tests merely to make incorrect code pass, commit secrets or `node_modules/`, or claim unverified results.

## `cartTotal(items, options)` contract
- Export `cartTotal` from `src/cart.js` as a named function.
- Compute `subtotal = sum(price * qty)`; add VAT on the subtotal and shipping unless `subtotal >= freeShipFrom`.
- Worked example: `405000` subtotal + `32400` VAT + `30000` shipping = **`467400`**.
- An empty cart returns numeric `0` without VAT or shipping. Return a **number**, rounded to the nearest whole Vietnamese đồng (not a `toFixed()` string).
- Throw `RangeError` for negative prices and for quantities that are not positive integers (including `0` and fractions).
- Do not mutate `items` or `options`. Test boundary cases and apply any further input rules specified by the starter repository; do not silently invent defaults.

## Workflow — Plan → Implement → Validate
1. State a brief plan and permitted files; run `npm test` first to observe the starter's failing baseline.
2. Implement one concern at a time; inspect the diff for unrelated edits and verify the negative/error cases.
3. Run `npm test` again and report actual pass/fail results, including command errors. Do not say a check passed without running it.
4. For full harness work, **request approval** to add focused tests covering the example, empty cart, threshold (below/at/above), both `RangeError` cases, and rounding. Each test should target one behavior.
5. Also request approval to configure at least one **real formatting or linting gate**, alongside `npm test`, and GitHub Actions CI that runs these checks on push. Keep tools dependency-free. Do not confuse `node --check` (syntax) with formatting or linting.
6. Run any configured gates locally; distinguish local results from verified GitHub Actions results. CI is not green until its run is actually confirmed.

## AI usage and deliverables
- Maintain a concise `AI-LOG.md` **after approval to edit it**: date, AI tool, request, files/output, AI suggestions accepted/changed/rejected, and contributions the student confirms writing by hand. Preserve previous entries; never invent decisions or history.
- Record checks performed and unresolved issues accurately. The log is a factual summary, not a chat transcript.
- Save the original **coding brief** used to direct the AI; it must state allowed files, function contract, invalid-input behavior, and no dependencies.
- Prepare `SELF_ASSESSMENT_REPORT.md` only with approval, using the Classroom template if available. Give evidence for each rubric category: behavior (30), tests (20), harness (20), brief (15), AI log (15). State unfinished work; do not fabricate scores or contributions.
- Before finishing, summarize edits, verified tests/checks, remaining issues, and any proposed changes needing approval. The student must review and be able to explain every submitted line.

## Additional input validation approved by the student

These rules extend the course's minimum specification; they are not additional requirements quoted from the assignment.

- `items` must be an array. Missing values and other types throw `TypeError`.
- An empty array returns numeric `0` before reading or validating `options`, even if options are missing or invalid.
- For a nonempty cart, each item and `options` must be non-null objects, not arrays. Invalid containers throw `TypeError`.
- Each item requires numeric `price` and `qty`. Options require numeric `vatRate`, `freeShipFrom`, and `shipFee`, even when shipping would be free.
- Missing numeric fields and wrong types, including numeric strings, throw `TypeError`; values are not coerced or defaulted.
- `NaN`, infinities, and negative numeric values throw `RangeError`. Quantity must additionally be a positive integer.
- Zero prices and zero option values are valid. VAT rates have no additional upper limit. `name` is not used in the calculation and is not required.

- Run `npm test` to execute all 99 cases. The existing CI workflow uses the same command on Node 24; remote execution is still unverified.
- Preserve the student's existing AI-log entries. New entries use `Tool`, `Asked for`, `Changed`, `Not used`, and `Insight`; leave personal reflections for the student instead of inventing them.
- The student excluded `check-format`; the rubric's formatting/linting gate remains unfinished. The later request to create a conversation brief authorizes `BRIEF.md`; preserve the original workflow request and distinguish summarized plans from verbatim instructions.
