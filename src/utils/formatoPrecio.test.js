import { describe, it, expect } from 'vitest'
import { formatoPrecio } from './formatoPrecio'

describe('formatoPrecio', () => {
  it('agrega el símbolo $ y el separador de miles', () => {
    expect(formatoPrecio(129990)).toBe('$129.990')
  })
})
