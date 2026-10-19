import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CatalogoProductos } from './CatalogoProductos'

describe('CatalogoProductos', () => {
  it('avisa cuando no hay productos que mostrar', () => {
    render(<CatalogoProductos productos={[]} onAgregar={() => {}} onVer={() => {}} />)

    expect(screen.getByText('No hay productos en esta categoría.')).toBeInTheDocument()
  })
})
