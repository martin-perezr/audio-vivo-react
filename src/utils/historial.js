// Funciones puras para el historial de pedidos por cliente.

// Clientes que tienen al menos un pedido, sin repetir y ordenados por correo.
export function clientesConPedidos(pedidos) {
  const vistos = new Map()
  pedidos.forEach((pedido) => {
    if (!vistos.has(pedido.correo)) {
      vistos.set(pedido.correo, `${pedido.nombre} ${pedido.apellidos}`)
    }
  })
  return [...vistos]
    .map(([correo, nombre]) => ({ correo, nombre }))
    .sort((a, b) => a.correo.localeCompare(b.correo))
}

// Cuántos pedidos tiene un cliente y cuánto ha comprado en total.
export function resumenCliente(pedidos) {
  return {
    cantidad: pedidos.length,
    total: pedidos.reduce((total, pedido) => total + pedido.total, 0),
  }
}
