import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CampoFormulario } from './CampoFormulario'

describe('CampoFormulario', () => {
  it('une la etiqueta con su campo y muestra el error', () => {
    render(<CampoFormulario id="correo" etiqueta="Correo" valor="" onChange={() => {}} error="Ingresa tu correo." />)

    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu correo.')).toBeInTheDocument()
  })
})