import * as productoService from './productoService'
import { calcularTotal } from '../utils/carrito'

// pedidoService: CRUD de pedidos en localStorage y la regla del caso:
// al confirmar un pedido el stock baja, y si no alcanza el stock el pedido no se crea.
const CLAVE = 'pedidos'

// Los mismos estados que muestra la molécula EstadoPedido.
export const ESTADOS_PEDIDO = [
  { valor: 'preparacion', texto: 'En preparación' },
  { valor: 'despachado', texto: 'Despachado' },
  { valor: 'entregado', texto: 'Entregado' },
]

function leer() {
  return JSON.parse(localStorage.getItem(CLAVE)) ?? []
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarPedidos() {
  return leer()
}

export function listarPedidosDe(correo) {
  return leer().filter((pedido) => pedido.correo === correo)
}

// datos: nombre, apellidos, correo, entrega, direccion y comuna. items: lo que hay en el carrito.
export function crearPedido(datos, items) {
  // 1) Se revisa el stock actual de cada producto antes de tocar nada.
  const sinStock = items.find((item) => {
    const producto = productoService.obtenerProducto(item.id)
    return !producto || producto.stock < item.cantidad
  })
  if (sinStock) {
    return { ok: false, error: `No hay stock suficiente de "${sinStock.nombre}".` }
  }

  // 2) Se descuenta el stock de cada producto.
  items.forEach((item) => {
    const producto = productoService.obtenerProducto(item.id)
    productoService.actualizarProducto(item.id, { stock: producto.stock - item.cantidad })
  })

  // 3) Se guarda el pedido con estado "En preparación".
  const lista = leer()
  const pedido = {
    id: Math.max(1000, ...lista.map((p) => p.id)) + 1,
    fecha: new Date().toLocaleDateString('es-CL'),
    ...datos,
    items,
    total: calcularTotal(items),
    estado: 'preparacion',
  }
  guardar([...lista, pedido])
  return { ok: true, pedido }
}

export function actualizarEstado(id, estado) {
  guardar(leer().map((pedido) => (pedido.id === id ? { ...pedido, estado } : pedido)))
}
