import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminComprobante from './AdminComprobante'
import { ProductosProvider } from '../../context/ProductosContext'
import { CarritoProvider } from '../../context/CarritoContext'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('sesion', JSON.stringify({ nombre: 'Admin', correo: 'admin@sonidovivo.cl', rol: 'admin' }))
  localStorage.setItem('pedidos', JSON.stringify([
    { id: 1001, fecha: '20-10-2026', nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl', entrega: 'retiro', total: 3990, estado: 'despachado', items: [{ id: 40, nombre: 'Púas', precio: 3990, cantidad: 1 }] },
  ]))
})

function renderizar(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <CarritoProvider>
          <Routes>
            <Route path="/admin/pedidos/:id" element={<AdminComprobante />} />
          </Routes>
        </CarritoProvider>
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('AdminComprobante', () => {
  it('muestra el comprobante del pedido de la dirección y avisa si no existe', () => {
    const { unmount } = renderizar('/admin/pedidos/1001')
    expect(screen.getByRole('heading', { name: 'Comprobante N° 1001' })).toBeInTheDocument()
    unmount()

    renderizar('/admin/pedidos/999')
    expect(screen.getByRole('heading', { name: 'Pedido no encontrado' })).toBeInTheDocument()
  })
})
