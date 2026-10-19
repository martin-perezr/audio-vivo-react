import { describe, it, expect, beforeEach } from 'vitest'
import { guardarMensaje, listarMensajes } from './contactoService'

beforeEach(() => {
  localStorage.clear()
})

describe('contactoService', () => {
  it('guarda cada mensaje con un id nuevo', () => {
    const primero = guardarMensaje({ nombre: 'Ana', mensaje: 'Primera consulta' })
    const segundo = guardarMensaje({ nombre: 'Luis', mensaje: 'Segunda consulta' })

    expect(primero.id).toBe(1)
    expect(segundo.id).toBe(2)
    expect(listarMensajes()).toHaveLength(2)
  })
})