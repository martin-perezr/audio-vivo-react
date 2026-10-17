import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Selector } from './Selector'

describe('Selector', () => {
  it('avisa al padre la opción elegida', async () => {
    const onChange = vi.fn()
    const opciones = [{ valor: 'a', texto: 'Opción A' }, { valor: 'b', texto: 'Opción B' }]
    render(<Selector id="prueba" valor="a" opciones={opciones} onChange={onChange} />)

    await userEvent.selectOptions(screen.getByRole('combobox'), 'b')

    expect(onChange).toHaveBeenCalledWith('b')
  })
})