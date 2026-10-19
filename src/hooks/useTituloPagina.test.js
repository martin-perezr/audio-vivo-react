import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTituloPagina } from './useTituloPagina'

describe('useTituloPagina', () => {
  it('cambia el título de la pestaña', () => {
    renderHook(() => useTituloPagina('Ofertas'))

    expect(document.title).toBe('Ofertas | Sonido Vivo')
  })
})