export function validarProducto(datos, productos = [], idActual = null) {
  const errores = {}

  if (String(datos.codigo).trim() === '') errores.codigo = 'Ingresa el código.'
  if (String(datos.nombre).trim() === '') errores.nombre = 'Ingresa el nombre.'
  if (String(datos.marca).trim() === '') errores.marca = 'Ingresa la marca.'
  if (String(datos.modelo).trim() === '') errores.modelo = 'Ingresa el modelo.'
  if (String(datos.descripcion).trim() === '') errores.descripcion = 'Ingresa la descripción.'

  if (!(Number(datos.precio) > 0)) {
    errores.precio = 'El precio debe ser mayor que 0.'
  }

  const stock = Number(datos.stock)
  if (datos.stock === '' || !Number.isInteger(stock) || stock < 0) {
    errores.stock = 'El stock debe ser un número entero mayor o igual a 0.'
  }

  // El código no se puede repetir (salvo que sea el mismo producto que se está editando).
  const codigo = String(datos.codigo).trim()
  if (!errores.codigo && productos.some((p) => p.codigo === codigo && p.id !== idActual)) {
    errores.codigo = 'Ese código ya existe.'
  }

  return errores
}