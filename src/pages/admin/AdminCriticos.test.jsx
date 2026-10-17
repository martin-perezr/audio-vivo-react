import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminCriticos from './AdminCriticos'
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

describe('AdminCriticos', () => {
  it('lista solo los productos con 3 unidades o menos', () => {
    renderizar(<AdminCriticos />, '/admin/criticos')

    expect(screen.getByText('Guitarra Electroacústica')).toBeInTheDocument() // stock 3
    expect(screen.queryByText('Guitarra Acústica Folk')).not.toBeInTheDocument() // stock 8
  })
})