import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminProductos from './AdminProductos'
import { ProductosProvider } from '../../context/ProductosContext'


beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('sesion', JSON.stringify({ nombre: 'Admin', correo: 'admin@sonidovivo.cl', rol: 'admin' }))
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

describe('AdminProductos', () => {
  it('pide confirmación antes de eliminar un producto', async () => {
    renderizar(<AdminProductos />, '/admin/productos')

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.getByText(/No se puede deshacer/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sí, eliminar' })).toBeInTheDocument()
  })
})