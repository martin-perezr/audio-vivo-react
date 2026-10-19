import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ResultadoCompra from './ResultadoCompra'
import { ProductosProvider } from '../context/ProductosContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('ResultadoCompra', () => {
  it('muestra el error que le pasa el checkout', () => {
    // initialEntries también acepta el "state" que manda navigate(ruta, { state }).
    const entrada = { pathname: '/compra-fallida', state: { error: 'No hay stock suficiente de "Púas".' } }
    render(
      <MemoryRouter initialEntries={[entrada]}>
        <ProductosProvider>
          <CarritoProvider>
            <ResultadoCompra exito={false} />
          </CarritoProvider>
        </ProductosProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('No hay stock suficiente de "Púas".')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Volver al carrito e intentar de nuevo' })).toBeInTheDocument()
  })
})
