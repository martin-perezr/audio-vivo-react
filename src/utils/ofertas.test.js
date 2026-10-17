import { describe, it, expect } from 'vitest'
import { esOferta, porcentajeDescuento } from './ofertas'

describe('ofertas', () => {
  it('calcula el porcentaje de descuento', () => {
    expect(porcentajeDescuento({ precio: 80000, precioAnterior: 100000 })).toBe(20)
  })

  it('no marca como oferta un producto sin precio anterior', () => {
    expect(esOferta({ precio: 80000 })).toBe(false)
  })
})