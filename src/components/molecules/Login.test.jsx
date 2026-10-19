import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

describe('Login', () => {
  it('no avisa a la página si el correo no es válido', async () => {
    const onEnviar = vi.fn()
    render(<Login onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'correo-malo')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave-segura-123')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Ingresa un correo válido, por ejemplo ejemplo@correo.cl.')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })
})