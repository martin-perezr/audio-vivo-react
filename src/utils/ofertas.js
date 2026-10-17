// Un producto está en oferta cuando tiene un precio anterior mayor que su precio actual.
export function esOferta(producto) {
  return Boolean(producto.precioAnterior) && producto.precioAnterior > producto.precio
}

// Porcentaje de descuento redondeado: de $100.000 a $80.000 es un 20 %.
export function porcentajeDescuento(producto) {
  return Math.round((1 - producto.precio / producto.precioAnterior) * 100)
}