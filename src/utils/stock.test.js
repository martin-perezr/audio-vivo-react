import { describe, it, expect } from 'vitest'
import { hayStock, esStockCritico } from './stock'

describe('hayStock', () => {
  it('responde false si el producto tiene stock 0', () => {
    expect(hayStock({ stock: 0 })).toBe(false)
  })
})

describe('esStockCritico', () => {
  it('marca como crítico un producto con 2 unidades', () => {
    expect(esStockCritico({ stock: 2 })).toBe(true)
  })
})