import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
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

describe('AdminDashboard', () => {
  it('muestra la cantidad de productos del catálogo', () => {
    renderizar(<AdminDashboard />, '/admin')

    expect(screen.getByText('51')).toBeInTheDocument()
  })
})