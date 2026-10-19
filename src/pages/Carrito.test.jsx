import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Carrito from './Carrito'
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

describe('Carrito', () => {
  it('muestra el total de lo que hay guardado en el carrito', () => {
    localStorage.setItem('carrito', JSON.stringify([
      { id: 40, nombre: 'Púas', precio: 3990, imagen: '', stock: 50, cantidad: 2 },
    ]))

    renderizar(<Carrito />)

    expect(screen.getByText('Total: $7.980')).toBeInTheDocument()
  })
})
