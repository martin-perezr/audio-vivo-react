import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EstadoPedido } from './EstadoPedido'

describe('EstadoPedido', () => {
  it('marca como cumplidos los pasos hasta el estado actual', () => {
    render(<EstadoPedido estado="despachado" />)

    expect(screen.getByText('Despachado')).toHaveClass('estado-paso-cumplido')
    expect(screen.getByText('Entregado')).not.toHaveClass('estado-paso-cumplido')
  })
})