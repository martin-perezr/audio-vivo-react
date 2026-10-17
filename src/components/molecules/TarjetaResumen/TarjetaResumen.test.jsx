import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TarjetaResumen } from './TarjetaResumen'

describe('TarjetaResumen', () => {
  it('muestra el número y avisa al apretar el botón', async () => {
    const onVer = vi.fn()
    render(<TarjetaResumen titulo="Productos" valor={51} textoBoton="Administrar" onVer={onVer} />)

    expect(screen.getByText('51')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Administrar' }))
    expect(onVer).toHaveBeenCalledTimes(1)
  })
})