import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProductosProvider, useProductos } from './ProductosContext'

beforeEach(() => {
  localStorage.clear()
})

describe('ProductosContext', () => {
  it('crear agrega el producto a la lista que comparten todas las pantallas', () => {
    // renderHook prueba un hook; wrapper le pone el provider alrededor.
    const { result } = renderHook(() => useProductos(), { wrapper: ProductosProvider })
    const antes = result.current.productos.length

    act(() => {
      result.current.crear({ nombre: 'Producto de prueba', precio: 1000, stock: 1 })
    })

    expect(result.current.productos).toHaveLength(antes + 1)
  })
})
