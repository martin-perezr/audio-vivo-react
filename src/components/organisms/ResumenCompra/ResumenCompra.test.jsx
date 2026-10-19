import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResumenCompra } from './ResumenCompra'

describe('ResumenCompra', () => {
  it('muestra cada producto con su cantidad y el total', () => {
    const items = [{ id: 40, nombre: 'Púas', precio: 3990, cantidad: 2 }]
    render(<ResumenCompra items={items} total={7980} />)

    expect(screen.getByText('Púas × 2')).toBeInTheDocument()
    expect(screen.getAllByText('$7.980')).toHaveLength(2) // subtotal y total
  })
})
