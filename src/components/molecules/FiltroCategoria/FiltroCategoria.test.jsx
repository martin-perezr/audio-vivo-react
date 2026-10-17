import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FiltroCategoria } from './FiltroCategoria'

describe('FiltroCategoria', () => {
  it('avisa al padre el slug de la categoría elegida', async () => {
    const onElegir = vi.fn()
    const categorias = [{ nombre: 'Micrófonos', slug: 'microfonos' }]
    render(<FiltroCategoria categorias={categorias} activa="" onElegir={onElegir} />)

    await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'microfonos')

    expect(onElegir).toHaveBeenCalledWith('microfonos')
  })
})