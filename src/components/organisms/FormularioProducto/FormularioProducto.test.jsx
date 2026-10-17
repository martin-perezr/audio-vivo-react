import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioProducto } from './FormularioProducto'

describe('FormularioProducto', () => {
  it('muestra los errores y no guarda si está vacío', async () => {
    const onGuardar = vi.fn()
    render(<FormularioProducto inicial={{}} productos={[]} onGuardar={onGuardar} onCancelar={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Ingresa el código.')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })
})