import usuariosIniciales from '../data/usuarios.json'

const CLAVE = 'usuarios'
const CLAVE_SESION = 'sesion'

function leer() {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === null) {
        localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales))
        return [...usuariosIniciales]
    }
    return JSON.parse(guardado)
}


export function registrarUsuario({ nombre, correo, password }) {
    const lista = leer()
    const correoLimpio = correo.trim().toLowerCase()

    if (lista.some((u) => u.correo === correoLimpio)) {
        return { ok: false, error: 'Ese correo ya está registrado.' }
    }

    const nuevo = {
        id: Math.max(0, ...lista.map((u) => u.id)) + 1,
        nombre: nombre.trim(),
        correo: correoLimpio,
        password,
        rol: 'cliente',
    }
    localStorage.setItem(CLAVE, JSON.stringify([...lista, nuevo]))
    return { ok: true, usuario: nuevo }
}


export function iniciarSesion(correo, password){
    const correoLimpio = correo.trim().toLowerCase()

    const usuario = leer().find((u) => 
        u.correo === correoLimpio &&
        u.password === password
    )
    if (!usuario){
        return null
    }

    const sesion = {nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol}
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    return sesion
}

export function obtenerSesion(){
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
}

export function cerrarSesion(){
    localStorage.removeItem(CLAVE_SESION)
}