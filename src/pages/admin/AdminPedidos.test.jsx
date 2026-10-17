import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminPedidos from './AdminPedidos'
import { ProductosProvider } from '../../context/ProductosContext'


beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('sesion', JSON.stringify({ nombre: 'Admin', correo: 'admin@sonidovivo.cl', rol: 'admin' }))
  localStorage.setItem('pedidos', JSON.stringify([
    { id: 1001, fecha: '20-10-2026', nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl', entrega: 'retiro', total: 3990, estado: 'preparacion', items: [] },
  ]))
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

describe('AdminPedidos', () => {
  it('guarda el estado nuevo del pedido', async () => {
    renderizar(<AdminPedidos />, '/admin/pedidos')

    await userEvent.selectOptions(screen.getByRole('combobox'), 'despachado')

    expect(listarPedidos()[0].estado).toBe('despachado')
  })
})