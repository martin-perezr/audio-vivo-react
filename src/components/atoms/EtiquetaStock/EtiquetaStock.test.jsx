import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EtiquetaStock } from './EtiquetaStock'

describe('EtiquetaStock', () => {
  it('usa singular cuando queda una unidad', () => {
    render(<EtiquetaStock stock={1} />)

    expect(screen.getByText('Stock: 1 disponible')).toBeInTheDocument()
  })
})