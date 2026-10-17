import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('muestra el correo de contacto de la tienda', () => {
    render(<Footer />)

    expect(screen.getByText(/atencionalsonido@sonidovivo\.cl/)).toBeInTheDocument()
  })
})