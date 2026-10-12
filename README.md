# cart — session 2 starter

Run the test first and watch it fail:

```bash
npm test
```

## What to implement

`cartTotal(items, options)` in `src/cart.js`. Plain JavaScript, **no dependencies**.

- `items`: `[{ name, price, qty }]` · `options`: `{ vatRate, freeShipFrom, shipFee }`
- `subtotal` = sum of `price × qty`
- VAT = `vatRate` applied to the subtotal
- shipping = `0` when `subtotal >= freeShipFrom`, otherwise `shipFee`
- return `subtotal + VAT + shipping`, **a number**, rounded to the whole đồng
- an empty cart returns `0` — no VAT, no shipping
- a negative `price`, or a `qty` that is not a positive integer, throws `RangeError`

Worked example: 2 × 180000 + 1 × 45000 = 405000 subtotal, VAT 32400,
shipping 30000 (below the 500000 threshold) → **467400**.

## What you hand in

One zip named `<StudentID>_<total>.zip` — the total being the mark you give
yourself against the rubric — containing:

1. This repository, with `npm test` green
2. The brief you gave your assistant
3. `AI-LOG.md` — template on Classroom
4. `SELF_ASSESSMENT_REPORT.md` — template on Classroom, one row per rubric
   criterion with evidence

The rubric is attached to the assignment on Classroom. Read it before you start:
30 of the 100 marks are for behaviour, and they are checked by running your code.

## Local checks and CI

Run `npm test` using Node.js 22+; CI uses Node 24, matching the local validation major version. The suite contains 99 tests for the original behavior and the student-approved container, missing-value, numeric-type, finite-value, and options validation rules.

`.github/workflows/ci.yml` runs `npm test` on pushes and pull requests using GitHub's Ubuntu runner. No dependency installation or cache is needed because this project has no dependencies or lockfile. The workflow uses read-only repository permissions.

CI is configured locally only. The current remote points to the course starter; the student's repository URL will be supplied later. No push or GitHub Actions run has been verified for these changes.

Only behavior tests are configured. No formatting/linting gate or TypeScript check was added. The rubric's formatting/linting requirement remains unfinished.

`AI-LOG.md` records the work in this chat. `SELF_ASSESSMENT_REPORT.md` contains the rubric evidence and pending student details. `BRIEF.md` preserves the original workflow request and summarizes the approved coding contract, scope, and conversation; include it with the submission. Claimed scores and hand-written contributions must be confirmed by the student.

## Additional input validation approved by the student

These rules extend the course's minimum specification; they are not additional requirements quoted from the assignment.

- `items` must be an array. Missing values and other types throw `TypeError`.
- An empty array returns numeric `0` before reading or validating `options`, even if options are missing or invalid.
- For a nonempty cart, each item and `options` must be non-null objects, not arrays. Invalid containers throw `TypeError`.
- Each item requires numeric `price` and `qty`. Options require numeric `vatRate`, `freeShipFrom`, and `shipFee`, even when shipping would be free.
- Missing numeric fields and wrong types, including numeric strings, throw `TypeError`; values are not coerced or defaulted.
- `NaN`, infinities, and negative numeric values throw `RangeError`. Quantity must additionally be a positive integer.
- Zero prices and zero option values are valid. VAT rates have no additional upper limit. `name` is not used in the calculation and is not required.
