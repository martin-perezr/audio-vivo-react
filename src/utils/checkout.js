import { validarCorreo } from './Validaciones'

// Reglas del formulario de checkout. La dirección y la comuna solo se piden si es despacho.
export function validarCheckout(datos) {
  const errores = {}

  if (datos.nombre.trim() === '') errores.nombre = 'Ingresa tu nombre.'
  if (datos.apellidos.trim() === '') errores.apellidos = 'Ingresa tus apellidos.'

  const errorCorreo = validarCorreo(datos.correo)
  if (errorCorreo) errores.correo = errorCorreo

  if (datos.entrega === 'despacho') {
    if (datos.direccion.trim() === '') errores.direccion = 'Ingresa la dirección de despacho.'
    if (datos.comuna.trim() === '') errores.comuna = 'Ingresa la comuna.'
  }

  return errores
}
