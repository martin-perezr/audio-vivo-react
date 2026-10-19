// contactoService: guarda los mensajes del formulario Contáctanos en localStorage.
const CLAVE = 'mensajes'

function leer() {
  return JSON.parse(localStorage.getItem(CLAVE)) ?? []
}

export function listarMensajes() {
  return leer()
}

export function guardarMensaje(datos) {
  const lista = leer()
  const mensaje = {
    id: Math.max(0, ...lista.map((m) => m.id)) + 1,
    fecha: new Date().toLocaleDateString('es-CL'),
    ...datos,
  }
  localStorage.setItem(CLAVE, JSON.stringify([...lista, mensaje]))
  return mensaje
}