import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContadorCantidad } from './ContadorCantidad'

describe('ContadorCantidad', () => {
  it('suma uno y no deja bajar del mínimo', async () => {
    const onCambiar = vi.fn()
    render(<ContadorCantidad cantidad={1} max={5} onCambiar={onCambiar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Sumar uno' }))

    expect(onCambiar).toHaveBeenCalledWith(2)
    expect(screen.getByRole('button', { name: 'Resta uno' })).toBeDisabled()
  })
})