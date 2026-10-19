import { describe, it, expect, beforeEach } from 'vitest'
import { actualizarProducto, obtenerProducto } from './productoService'

beforeEach(() => {
  localStorage.clear()
})

describe('productoService', () => {
  it('actualizarProducto cambia solo los campos indicados', () => {
    const nombre = obtenerProducto(1).nombre

    actualizarProducto(1, { stock: 99 })

    expect(obtenerProducto(1).stock).toBe(99)
    expect(obtenerProducto(1).nombre).toBe(nombre)
  })
})
