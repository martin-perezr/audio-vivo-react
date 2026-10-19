import { describe, it, expect, beforeEach } from 'vitest'
import { crearPedido, listarPedidos } from './pedidoService'
import { obtenerProducto } from './productoService'

const datos = {
  nombre: 'Ana', apellidos: 'Rojas', correo: 'ana@correo.cl',
  entrega: 'retiro', direccion: '', comuna: '',
}

// Cada caso parte con localStorage vacío: el service vuelve a cargar productos.json.
beforeEach(() => {
  localStorage.clear()
})

describe('pedidoService', () => {
  it('crea el pedido y descuenta el stock', () => {
    const antes = obtenerProducto(1).stock
    const items = [{ id: 1, nombre: 'Guitarra', precio: 129990, cantidad: 2 }]

    const resultado = crearPedido(datos, items)

    expect(resultado.ok).toBe(true)
    expect(resultado.pedido.estado).toBe('preparacion')
    expect(obtenerProducto(1).stock).toBe(antes - 2)
  })

  it('no crea el pedido si no alcanza el stock', () => {
    const antes = obtenerProducto(1).stock
    const items = [{ id: 1, nombre: 'Guitarra', precio: 129990, cantidad: antes + 1 }]

    const resultado = crearPedido(datos, items)

    expect(resultado.ok).toBe(false)
    expect(listarPedidos()).toHaveLength(0)
    expect(obtenerProducto(1).stock).toBe(antes)
  })
})
