# IA#1 - cartTotal coding brief

## Task

Implement and test `cartTotal(items, options)` using plain JavaScript ES modules, Node.js 22+, and Node's built-in `node:test`. Add no dependencies. Read the course instructions, assignment rubric, `README.md`, and `AGENTS.md` before working.

## File scope

- `src/cart.js`: calculation and input validation.
- `test/cart.test.js`: focused behavior and error-case tests; preserve the original example test.
- `.github/workflows/ci.yml`: run `npm test` on pushes and pull requests using Node 24 on Ubuntu.
- `README.md` and `AGENTS.md`: document the contract and available checks.
- `AI-LOG.md` and `SELF_ASSESSMENT_REPORT.md`: record actual work, verification evidence, and unfinished requirements.

Keep changes within this scope. Do not change Git remotes, push, submit, or modify unrelated files.

## Function contract

Export `cartTotal` as a named function. Items contain `price` and `qty`; options contain `vatRate`, `freeShipFrom`, and `shipFee`. Item names are optional and do not affect the calculation.

1. Calculate subtotal as the sum of `price * qty`.
2. Apply `vatRate` to the subtotal.
3. Charge zero shipping when `subtotal >= freeShipFrom`; otherwise charge `shipFee`.
4. Return `Math.round(subtotal + VAT + shipping)` as a number. Do not round components separately or return a string.
5. An empty items array returns numeric `0` without reading or validating options.
6. Do not mutate items or options.

Worked example: items priced at 180000 with quantity 2 and 45000 with quantity 1, with options `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }`, return **467400**.

## Input validation

The additional type and missing-value checks extend the assignment's minimum error requirements.

| Input condition | Behavior |
| --- | --- |
| Missing or non-array items | Throw `TypeError` |
| Nonempty cart containing a missing, null, non-object, or array item | Throw `TypeError` |
| Nonempty cart with missing, null, non-object, or array options | Throw `TypeError` |
| Missing numeric fields or wrong types, including numeric strings | Throw `TypeError` |
| `NaN`, infinities, or negative numeric values | Throw `RangeError` |
| Zero or fractional quantity | Throw `RangeError` |
| Zero price or zero option values | Accept |
| VAT rate above one | Accept; no upper limit |

For a nonempty cart, require finite numeric `price` and positive integer `qty` for every item. Require finite nonnegative numeric `vatRate`, `freeShipFrom`, and `shipFee`, even if shipping would be free. Do not coerce types or invent defaults.

## Workflow and acceptance checks

Follow Plan -> Implement -> Validate. Explain the plan and wait for approval before editing; keep implementation steps small and review the diff. Use simple, readable code.

- Run the existing tests before implementation to establish the baseline.
- Cover the worked example, empty carts, shipping below/at/above the threshold, invalid quantities and prices, rounding, numeric output, and input preservation.
- Cover missing fields, wrong types, invalid containers, nonfinite values, option ranges, and the empty-cart options bypass.
- Each test should target one behavior and assert the specification rather than reproduce the calculation.
- Run `npm test` and `git diff --check`; fix failures and report actual results.
- Configure CI locally. Distinguish passing local tests from a verified GitHub Actions run; do not claim remote CI passed without evidence.

No TypeScript or formatting/linting script is in scope. Record the rubric's separate formatting/linting requirement as unfinished.