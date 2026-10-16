import { describe, it, expect, beforeEach } from "vitest";
import { registrarUsuario, iniciarSesion, obtenerSesion } from "./usuarioService";

beforeEach(() => {
    localStorage.clear()
})

describe('usuarioService', () => {
    it('no registra un correo que ya existe', () => {
        registrarUsuario({ nombre: 'Ana', correo: 'ana@correo.cl', password: 'clave-segura-123' })

        const repetido = registrarUsuario({ nombre: 'Ana 2', correo: 'ANA@correo.cl', password: 'otra-clave-123' })

        expect(repetido.ok).toBe(false)
        expect(repetido.error).toBe('Ese correo ya está registrado.')
    })

    it('no inicia sesión con una contraseña incorrecta', () => {
        registrarUsuario({ nombre: 'Ana', correo: 'ana@correo.cl', password: 'clave-segura-123' })

        expect(iniciarSesion('ana@correo.cl', 'clave-equivocada')).toBeNull()
        expect(obtenerSesion()).toBeNull()

    })
})