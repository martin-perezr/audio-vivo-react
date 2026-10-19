import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Checkout from './Checkout'
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

describe('Checkout', () => {
  it('pide iniciar sesión si hay productos pero no hay sesión', () => {
    localStorage.setItem('carrito', JSON.stringify([
      { id: 40, nombre: 'Púas', precio: 3990, imagen: '', stock: 50, cantidad: 1 },
    ]))

    renderizar(<Checkout />)

    expect(screen.getByRole('heading', { name: 'Inicia sesión para terminar tu compra' })).toBeInTheDocument()
  })
})
