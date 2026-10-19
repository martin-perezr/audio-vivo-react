import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Boton } from './Boton'

describe('Boton', () => {
  it('llama a onClick al hacer clic', async () => {
    const onClick = vi.fn()
    render(<Boton onClick={onClick}>Comprar</Boton>)

    await userEvent.click(screen.getByRole('button', { name: 'Comprar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})