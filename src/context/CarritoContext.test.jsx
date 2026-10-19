import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CarritoProvider, useCarrito } from './CarritoContext'

beforeEach(() => {
  localStorage.clear()
})

describe('CarritoContext', () => {
  it('cuenta las unidades y guarda el carrito en localStorage', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: CarritoProvider })
    const pedal = { id: 31, nombre: 'Pedal Distorsión', precio: 79990, imagen: '', stock: 7 }

    act(() => result.current.agregar(pedal))
    act(() => result.current.agregar(pedal))

    expect(result.current.unidades).toBe(2)
    expect(JSON.parse(localStorage.getItem('carrito'))).toHaveLength(1)
  })
})
