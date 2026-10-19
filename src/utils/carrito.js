import { hayStock } from './stock'

// Reglas del carrito: funciones puras (reciben la lista y devuelven una lista nueva).
// Aquí vive la regla del caso: sin stock no se agrega, y nunca más unidades que el stock.

export function agregarItem(items, producto) {
  if (!hayStock(producto)) {
    return items
  }

  const existente = items.find((item) => item.id === producto.id)
  if (existente) {
    if (existente.cantidad >= producto.stock) {
      return items
    }
    return items.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
    )
  }

  const nuevo = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    stock: producto.stock,
    cantidad: 1,
  }
  return [...items, nuevo]
}

export function cambiarCantidad(items, id, cantidad) {
  // La cantidad queda entre 1 y el stock del producto.
  return items.map((item) =>
    item.id === id ? { ...item, cantidad: Math.min(Math.max(cantidad, 1), item.stock) } : item
  )
}

export function quitarItem(items, id) {
  return items.filter((item) => item.id !== id)
}

export function calcularTotal(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0)
}

export function contarUnidades(items) {
  return items.reduce((total, item) => total + item.cantidad, 0)
}
