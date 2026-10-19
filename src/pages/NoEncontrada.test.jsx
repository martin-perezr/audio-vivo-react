import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import NoEncontrada from './NoEncontrada'
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

describe('NoEncontrada', () => {
  it('el botón lleva al catálogo', async () => {
    renderizar(
      <Routes>
        <Route path="*" element={<NoEncontrada />} />
        <Route path="/catalogo" element={<p>Página del catálogo</p>} />
      </Routes>,
      '/loquesea'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Ir al catálogo' }))

    expect(screen.getByText('Página del catálogo')).toBeInTheDocument()
  })
})
