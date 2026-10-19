import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MisPedidos from './MisPedidos'
import { ProductosProvider } from '../context/ProductosContext'
import { CarritoProvider } from '../context/CarritoContext'

beforeEach(() => {
  localStorage.clear()
})

function renderizar(ui, ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('MisPedidos', () => {
  it('muestra solo los pedidos del cliente con sesión', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Ana', correo: 'ana@correo.cl', rol: 'cliente' }))
    localStorage.setItem('pedidos', JSON.stringify([
      { id: 1001, fecha: '20-10-2026', correo: 'ana@correo.cl', entrega: 'retiro', total: 3990, estado: 'preparacion', items: [] },
      { id: 1002, fecha: '20-10-2026', correo: 'otro@correo.cl', entrega: 'retiro', total: 3990, estado: 'preparacion', items: [] },
    ]))

    renderizar(<MisPedidos />)

    expect(screen.getByText('Pedido N° 1001')).toBeInTheDocument()
    expect(screen.queryByText('Pedido N° 1002')).not.toBeInTheDocument()
  })
})
