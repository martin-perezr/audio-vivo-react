import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioContacto } from './FormularioContacto'

describe('FormularioContacto', () => {
  it('muestra los errores y no envía si el formulario está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByText('Ingresa tu nombre.')).toBeInTheDocument()
    expect(screen.getByText('El mensaje debe tener al menos 10 caracteres.')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('envía los datos cuando todo está bien', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana Rojas')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@correo.cl')
    await userEvent.type(screen.getByLabelText('Mensaje'), '¿Tienen cuerdas para bajo?')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(onEnviar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledWith({
      nombre: 'Ana Rojas', correo: 'ana@correo.cl', asunto: 'producto', mensaje: '¿Tienen cuerdas para bajo?',
    })
  })
})