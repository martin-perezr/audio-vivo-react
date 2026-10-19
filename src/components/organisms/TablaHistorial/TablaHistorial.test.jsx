import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TablaHistorial } from './TablaHistorial'

const pedidos = [
  { id: 1001, fecha: '20-10-2026', entrega: 'retiro', total: 3990, estado: 'preparacion' },
]

describe('TablaHistorial', () => {
  it('muestra el estado en texto y avisa qué comprobante abrir', async () => {
    const onVer = vi.fn()
    render(<TablaHistorial pedidos={pedidos} onVer={onVer} />)

    expect(screen.getByText('En preparación')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Ver comprobante' }))
    expect(onVer).toHaveBeenCalledWith(1001)
  })
})
