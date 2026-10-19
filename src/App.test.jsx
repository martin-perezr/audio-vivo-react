import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { ProductosProvider } from './context/ProductosContext'
import { CarritoProvider } from './context/CarritoContext'

describe('App', () => {
  it('muestra la página no encontrada en una dirección que no existe', () => {
    window.history.pushState({}, '', '/loquesea')
    render(
      <ProductosProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </ProductosProvider>
    )

    expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()
  })
})
