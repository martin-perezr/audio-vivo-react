import { describe, it, expect } from 'vitest'
import { validarCheckout } from './checkout'

const base = {
  nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl',
  entrega: 'despacho', direccion: '', comuna: '',
}

describe('validarCheckout', () => {
  it('pide dirección y comuna solo cuando es despacho', () => {
    expect(validarCheckout(base).direccion).toBe('Ingresa la dirección de despacho.')
    expect(validarCheckout({ ...base, entrega: 'retiro' })).toEqual({})
  })
})
