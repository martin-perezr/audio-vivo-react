import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Categorias from './Categorias'
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

describe('Categorias', () => {
  it('muestra las 10 categorías', () => {
    renderizar(<Categorias />, '/categorias')

    expect(screen.getByText('Guitarras Acústicas')).toBeInTheDocument()
    expect(screen.getByText('Estudio y Grabación')).toBeInTheDocument()
  })
})