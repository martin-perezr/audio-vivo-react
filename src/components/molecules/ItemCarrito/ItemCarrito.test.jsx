import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ItemCarrito } from './ItemCarrito'

describe('ItemCarrito', () => {
  it('avisa al padre con el id al hacer clic en Quitar', async () => {
    const onQuitar = vi.fn() // mock: función falsa que registra sus llamadas
    const item = { id: 7, nombre: 'Púas', precio: 2990, imagen: '', stock: 10, cantidad: 2 }
    render(<ItemCarrito item={item} onCambiarCantidad={() => {}} onQuitar={onQuitar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Quitar' }))

    expect(onQuitar).toHaveBeenCalledWith(7)
    expect(screen.getByText('Subtotal: $5.980')).toBeInTheDocument()
  })
})
