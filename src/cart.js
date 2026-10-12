export function cartTotal(items, options) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array')
  if (items.length === 0) return 0

  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('options must be an object')
  }
  for (const field of ['vatRate', 'freeShipFrom', 'shipFee']) {
    validateNumber(options[field], field)
  }

  let subtotal = 0
  for (const item of items) {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      throw new TypeError('each item must be an object')
    }
    validateNumber(item.price, 'price')
    validateNumber(item.qty, 'qty')
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('qty must be a positive integer')
    }
    subtotal += item.price * item.qty
  }

  const vat = subtotal * options.vatRate
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee
  return Math.round(subtotal + vat + shipping)
}

function validateNumber(value, field) {
  if (typeof value !== 'number') throw new TypeError(`${field} must be a number`)
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${field} must be finite and nonnegative`)
  }
}
