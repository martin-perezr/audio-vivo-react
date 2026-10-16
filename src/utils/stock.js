export function hayStock(producto) {
  return producto.stock > 0
}

// Un producto es crítico cuando le quedan STOCK_CRITICO unidades o menos (pero aún tiene stock).
export const STOCK_CRITICO = 3

export function esStockCritico(producto) {
  return producto.stock > 0 && producto.stock <= STOCK_CRITICO
}