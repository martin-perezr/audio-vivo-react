import { describe, it, expect } from 'vitest'
import { validarNombre, validarConfirmacion } from './Validaciones'

describe('validarNombre', () => {
    it('rechaza un nombre con solo espacios', () => {
        expect(validarNombre('   ')).toBe('Ingresa tu nombre.')
    })
})

describe('validarConfirmacion', () => {
    it('avisa cuando las contraseñas no coinciden', () => {
        expect(validarConfirmacion('clave-segura-123', 'clave-distinta-123')).toBe('Las contraseñas no coinciden.')
    })
})