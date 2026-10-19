import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import DetalleProducto from './DetalleProducto'
import { ProductosProvider } from '../context/ProductosContext'
import { CarritoProvider } from '../context/CarritoContext'

function renderizar(ui, ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('DetalleProducto', () => {
  it('avisa cuando el producto no existe', () => {
    renderizar(
      <Routes>
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>,
      '/producto/999'
    )

    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeInTheDocument()
  })
})
