import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminHistorial from './AdminHistorial'
import { ProductosProvider } from '../../context/ProductosContext'
import { CarritoProvider } from '../../context/CarritoContext'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('sesion', JSON.stringify({ nombre: 'Admin', correo: 'admin@sonidovivo.cl', rol: 'admin' }))
  localStorage.setItem('pedidos', JSON.stringify([
    { id: 1001, fecha: '20-10-2026', nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl', entrega: 'retiro', total: 3990, estado: 'entregado', items: [] },
    { id: 1002, fecha: '21-10-2026', nombre: 'Luis', apellidos: 'Soto', correo: 'luis@correo.cl', entrega: 'retiro', total: 10000, estado: 'preparacion', items: [] },
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

describe('AdminHistorial', () => {
  it('muestra los pedidos del cliente elegido en el selector', async () => {
    renderizar(<AdminHistorial />, '/admin/historial')
    expect(screen.getByText('1001')).toBeInTheDocument() // parte con Ana

    await userEvent.selectOptions(screen.getByLabelText('Cliente'), 'luis@correo.cl')

    expect(screen.getByText('1002')).toBeInTheDocument()
    expect(screen.queryByText('1001')).not.toBeInTheDocument()
    expect(screen.getByText(/1 pedido · Total comprado: \$10\.000/)).toBeInTheDocument()
  })
})
