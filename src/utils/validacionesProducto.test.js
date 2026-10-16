import { describe, it, expect } from 'vitest'
import { validarProducto } from './validacionesProducto'

const valido = {
  codigo: 'GA099', nombre: 'Guitarra de prueba', marca: 'Yamaha', modelo: 'X1',
  precio: '99990', stock: '5', descripcion: 'Solo para la prueba.',
}

describe('validarProducto', () => {
  it('no devuelve errores con un producto válido', () => {
    expect(validarProducto(valido)).toEqual({})
  })

  it('rechaza un precio en 0 y un código repetido', () => {
    const productos = [{ id: 1, codigo: 'GA099' }]

    const errores = validarProducto({ ...valido, precio: '0' }, productos)

    expect(errores.precio).toBe('El precio debe ser mayor que 0.')
    expect(errores.codigo).toBe('Ese código ya existe.')
  })
})