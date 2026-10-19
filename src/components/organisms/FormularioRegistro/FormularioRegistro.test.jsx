import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioRegistro } from './FormularioRegistro'

describe('FormularioRegistro', () => {
  it('no envía si las contraseñas no coinciden', async () => {
    const onEnviar = vi.fn()
    render(<FormularioRegistro onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Ana Rojas')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'ana@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave-segura-123')
    await userEvent.type(screen.getByLabelText('Repite la contraseña'), 'clave-distinta-123')
    await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })
})