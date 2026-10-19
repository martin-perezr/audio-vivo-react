import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CarruselCategorias } from './CarruselCategorias'

describe('CarruselCategorias', () => {
  it('dibuja una tarjeta por cada categoría', () => {
    const categorias = [
      { nombre: 'Bajos Eléctricos', slug: 'bajos-electricos', imagen: '' },
      { nombre: 'Micrófonos', slug: 'microfonos', imagen: '' },
    ]
    render(<CarruselCategorias categorias={categorias} onVer={() => {}} />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})