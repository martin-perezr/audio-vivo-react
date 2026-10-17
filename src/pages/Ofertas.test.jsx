import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Ofertas from './Ofertas'
import { ProductosProvider } from '../context/ProductosContext'


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

describe('Ofertas', () => {
  it('muestra solo los 6 productos en oferta', () => {
    renderizar(<Ofertas />, '/ofertas')

    expect(screen.getAllByText(/de descuento/)).toHaveLength(6)
  })
})