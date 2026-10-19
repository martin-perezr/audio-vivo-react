import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioCheckout } from './FormularioCheckout'

describe('FormularioCheckout', () => {
  it('trae los datos de la sesión y oculta la dirección al elegir retiro', async () => {
    render(<FormularioCheckout inicial={{ nombre: 'Ana', correo: 'ana@correo.cl' }} onConfirmar={() => {}} />)

    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('ana@correo.cl')
    await userEvent.selectOptions(screen.getByLabelText('Forma de entrega'), 'retiro')
    expect(screen.queryByLabelText('Dirección')).not.toBeInTheDocument()
  })
})
