import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComprobantePedido } from './ComprobantePedido'

const pedido = {
  id: 1001, fecha: '20-10-2026', nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl',
  entrega: 'despacho', direccion: 'Av. Libertad 100', comuna: 'Viña del Mar',
  items: [{ id: 40, nombre: 'Púas', precio: 3990, cantidad: 2 }], total: 7980, estado: 'preparacion',
}

describe('ComprobantePedido', () => {
  it('muestra el número, el cliente, la entrega y los productos', () => {
    render(<ComprobantePedido pedido={pedido} />)

    expect(screen.getByRole('heading', { name: 'Comprobante N° 1001' })).toBeInTheDocument()
    expect(screen.getByText(/Ana Rojas \(ana@correo\.cl\)/)).toBeInTheDocument()
    expect(screen.getByText(/Despacho a Av\. Libertad 100, Viña del Mar/)).toBeInTheDocument()
    expect(screen.getByText('Púas × 2')).toBeInTheDocument()
  })
})
