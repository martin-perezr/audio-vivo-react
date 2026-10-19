import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Catalogo from './Catalogo'
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

describe('Catalogo', () => {
  it('muestra solo los productos de la categoría de la dirección', () => {
    renderizar(
      <Routes>
        <Route path="/categoria/:slug" element={<Catalogo />} />
      </Routes>,
      '/categoria/bajos-electricos'
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Bajos Eléctricos' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
  })
})
