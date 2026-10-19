import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TarjetaProducto } from './TarjetaProducto'

const producto = { id: 4, nombre: 'Guitarra Electroacústica', marca: 'Yamaha', modelo: 'FX', precio: 349990, stock: 0, imagen: '' }

describe('TarjetaProducto', () => {
  it('deshabilita Agregar al carrito sin stock y avisa al ver el detalle', async () => {
    const onVer = vi.fn()
    render(<TarjetaProducto producto={producto} onAgregar={() => {}} onVer={onVer} />)

    expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Ver detalle' }))
    expect(onVer).toHaveBeenCalledWith(4)
  })
})
