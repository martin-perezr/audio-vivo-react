import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CampoTexto } from './CampoTexto'

describe('CampoTexto', () => {
  it('avisa al padre lo que se escribe', async () => {
    const onChange = vi.fn()
    render(<CampoTexto id="nombre" valor="" onChange={onChange} />)

    await userEvent.type(screen.getByRole('textbox'), 'a')

    expect(onChange).toHaveBeenCalledWith('a')
  })
})