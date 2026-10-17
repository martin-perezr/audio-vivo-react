import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TablaPedidos } from './TablaPedidos'

const pedidos = [
  { id: 1001, fecha: '20-10-2026', nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl', entrega: 'retiro', total: 3990, estado: 'preparacion' },
]

describe('TablaPedidos', () => {
  it('avisa al padre el estado nuevo del pedido', async () => {
    const onCambiarEstado = vi.fn()
    render(<TablaPedidos pedidos={pedidos} onCambiarEstado={onCambiarEstado} />)

    await userEvent.selectOptions(screen.getByRole('combobox'), 'entregado')

    expect(onCambiarEstado).toHaveBeenCalledWith(1001, 'entregado')
  })
})