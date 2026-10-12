import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

test('an empty cart costs nothing', () => {
  assert.equal(cartTotal([], options), 0)
})

test('shipping is charged below the subtotal threshold', () => {
  assert.equal(cartTotal([{ price: 499999, qty: 1 }], options), 569999)
})

test('shipping is free at the subtotal threshold', () => {
  assert.equal(cartTotal([{ price: 500000, qty: 1 }], options), 540000)
})

test('shipping is free above the subtotal threshold', () => {
  assert.equal(cartTotal([{ price: 500001, qty: 1 }], options), 540001)
})

test('a negative price throws RangeError', () => {
  assert.throws(() => cartTotal([{ price: -1, qty: 1 }], options), RangeError)
})

test('zero quantity throws RangeError', () => {
  assert.throws(() => cartTotal([{ price: 100, qty: 0 }], options), RangeError)
})

test('negative quantity throws RangeError', () => {
  assert.throws(() => cartTotal([{ price: 100, qty: -1 }], options), RangeError)
})

test('fractional quantity throws RangeError', () => {
  assert.throws(() => cartTotal([{ price: 100, qty: 1.5 }], options), RangeError)
})

test('an invalid later item throws RangeError', () => {
  const items = [{ price: 100, qty: 1 }, { price: -1, qty: 1 }]
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('a total below half a dong rounds down', () => {
  const roundingOptions = { vatRate: 0.004, freeShipFrom: 0, shipFee: 0 }
  assert.equal(cartTotal([{ price: 100, qty: 1 }], roundingOptions), 100)
})

test('a total at half a dong rounds up', () => {
  const roundingOptions = { vatRate: 0.005, freeShipFrom: 0, shipFee: 0 }
  assert.equal(cartTotal([{ price: 100, qty: 1 }], roundingOptions), 101)
})

test('rounding happens after subtotal and VAT are added', () => {
  const roundingOptions = { vatRate: 0.004, freeShipFrom: 0, shipFee: 0 }
  assert.equal(cartTotal([{ price: 100.2, qty: 1 }], roundingOptions), 101)
})

test('the total is a number', () => {
  assert.equal(typeof cartTotal([{ price: 100, qty: 1 }], options), 'number')
})

test('items are not mutated', () => {
  const items = [{ name: 'Notebook', price: 100, qty: 2 }]
  const originalItems = structuredClone(items)
  cartTotal(items, options)
  assert.deepEqual(items, originalItems)
})

test('options are not mutated', () => {
  const originalOptions = { ...options }
  const cartOptions = { ...options }
  cartTotal([{ price: 100, qty: 2 }], cartOptions)
  assert.deepEqual(cartOptions, originalOptions)
})


const invalidObjects = [
  ['missing', undefined],
  ['null', null],
  ['array', []],
  ['string', 'invalid'],
  ['number', 100],
  ['boolean', true],
]

for (const [label, value] of invalidObjects) {
  if (label !== 'array') {
    test(`items rejects ${label} with TypeError`, () => {
      assert.throws(() => cartTotal(value, options), TypeError)
    })
  }
  test(`a cart item rejects ${label} with TypeError`, () => {
    assert.throws(() => cartTotal([value], options), TypeError)
  })
  test(`options rejects ${label} with TypeError for a nonempty cart`, () => {
    assert.throws(() => cartTotal([{ price: 100, qty: 1 }], value), TypeError)
  })
}

test('items rejects an object with TypeError', () => {
  assert.throws(() => cartTotal({}, options), TypeError)
})

test('an empty cart ignores missing options', () => {
  assert.equal(cartTotal([]), 0)
})

test('an empty cart ignores null options', () => {
  assert.equal(cartTotal([], null), 0)
})

test('an empty cart ignores invalid option values', () => {
  assert.equal(cartTotal([], { vatRate: 'invalid', freeShipFrom: -1, shipFee: NaN }), 0)
})

const invalidNumberTypes = [
  ['missing', undefined],
  ['null', null],
  ['numeric string', '100'],
  ['boolean', true],
  ['object', {}],
  ['array', []],
  ['bigint', 100n],
]
const nonfiniteNumbers = [['NaN', NaN], ['Infinity', Infinity], ['-Infinity', -Infinity]]

for (const field of ['price', 'qty']) {
  test(`an item missing ${field} throws TypeError`, () => {
    const item = { price: 100, qty: 1 }
    delete item[field]
    assert.throws(() => cartTotal([item], options), TypeError)
  })
  for (const [label, value] of invalidNumberTypes) {
    test(`${field} rejects ${label} with TypeError`, () => {
      assert.throws(() => cartTotal([{ price: 100, qty: 1, [field]: value }], options), TypeError)
    })
  }
  for (const [label, value] of nonfiniteNumbers) {
    test(`${field} rejects ${label} with RangeError`, () => {
      assert.throws(() => cartTotal([{ price: 100, qty: 1, [field]: value }], options), RangeError)
    })
  }
}

for (const field of ['vatRate', 'freeShipFrom', 'shipFee']) {
  test(`options missing ${field} throws TypeError`, () => {
    const cartOptions = { ...options }
    delete cartOptions[field]
    assert.throws(() => cartTotal([{ price: 100, qty: 1 }], cartOptions), TypeError)
  })
  for (const [label, value] of invalidNumberTypes) {
    test(`${field} rejects ${label} with TypeError`, () => {
      assert.throws(() => cartTotal([{ price: 100, qty: 1 }], { ...options, [field]: value }), TypeError)
    })
  }
  for (const [label, value] of nonfiniteNumbers) {
    test(`${field} rejects ${label} with RangeError`, () => {
      assert.throws(() => cartTotal([{ price: 100, qty: 1 }], { ...options, [field]: value }), RangeError)
    })
  }
  test(`${field} rejects a negative value with RangeError`, () => {
    assert.throws(() => cartTotal([{ price: 100, qty: 1 }], { ...options, [field]: -1 }), RangeError)
  })
}

test('zero price is valid for a nonempty cart', () => {
  assert.equal(cartTotal([{ price: 0, qty: 1 }], options), 30000)
})

test('all option values may be zero', () => {
  assert.equal(cartTotal([{ price: 100, qty: 1 }], { vatRate: 0, freeShipFrom: 0, shipFee: 0 }), 100)
})

test('VAT rates above one are allowed', () => {
  assert.equal(cartTotal([{ price: 100, qty: 1 }], { vatRate: 1.5, freeShipFrom: 0, shipFee: 0 }), 250)
})

test('missing shipping fee is rejected even when shipping would be free', () => {
  assert.throws(() => cartTotal([{ price: 500000, qty: 1 }], { vatRate: 0.08, freeShipFrom: 500000 }), TypeError)
})
