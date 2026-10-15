import { describe, it, expect } from 'vitest'
import { hayStock } from './stock'

describe('hayStock', () => {
  it('responde false si el producto tiene stock 0', () => {
    expect(hayStock({ stock: 0 })).toBe(false)
  })
})
