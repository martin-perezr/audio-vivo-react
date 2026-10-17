import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nosotros from './Nosotros'
import { ProductosProvider } from '../context/ProductosContext'


function renderizar(ui, ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('Nosotros', () => {
  it('presenta la tienda', () => {
    renderizar(<Nosotros />, '/nosotros')

    expect(screen.getByRole('heading', { name: '11 años con los músicos' })).toBeInTheDocument()
  })
})
