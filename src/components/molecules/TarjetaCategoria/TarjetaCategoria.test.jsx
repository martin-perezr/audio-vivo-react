import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TarjetaCategoria } from './TarjetaCategoria'

describe('TarjetaCategoria', () => {
  it('avisa al padre el slug de la categoría elegida', async () => {
    const onVer = vi.fn()
    const categoria = { nombre: 'Bajos Eléctricos', slug: 'bajos-electricos', imagen: '' }
    render(<TarjetaCategoria categoria={categoria} onVer={onVer} />)

    await userEvent.click(screen.getByRole('button', { name: 'Bajos Eléctricos' }))

    expect(onVer).toHaveBeenCalledWith('bajos-electricos')
  })
})