import { describe, it, expect } from 'vitest'
import { agregarItem, calcularTotal } from './carrito'

const guitarra = { id: 1, nombre: 'Guitarra', precio: 100000, imagen: '', stock: 2 }

describe('agregarItem', () => {
  it('no agrega un producto sin stock', () => {
    const sinStock = { ...guitarra, stock: 0 }
    expect(agregarItem([], sinStock)).toEqual([])
  })

  it('no deja agregar más unidades que el stock', () => {
    // Arrange: ya hay 2 guitarras en el carrito y el stock es 2
    const items = [{ ...guitarra, cantidad: 2 }]
    // Act: se intenta agregar una más
    const resultado = agregarItem(items, guitarra)
    // Assert: la cantidad sigue en 2
    expect(resultado[0].cantidad).toBe(2)
  })
})

describe('calcularTotal', () => {
  it('suma precio por cantidad de cada producto', () => {
    const items = [
      { precio: 100000, cantidad: 2 },
      { precio: 5990, cantidad: 1 },
    ]
    expect(calcularTotal(items)).toBe(205990)
  })
})
