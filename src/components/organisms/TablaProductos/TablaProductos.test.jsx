import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TablaProductos } from './TablaProductos'

const productos = [
  { id: 1, codigo: 'GA001', nombre: 'Guitarra Folk', categoria: 'Guitarras Acústicas', precio: 129990, stock: 8 },
]

describe('TablaProductos', () => {
  it('avisa al padre qué producto eliminar', async () => {
    const onEliminar = vi.fn()
    render(<TablaProductos productos={productos} onEditar={() => {}} onEliminar={onEliminar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(onEliminar).toHaveBeenCalledWith(productos[0])
  })
})