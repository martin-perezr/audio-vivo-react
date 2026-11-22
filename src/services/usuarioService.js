import { enviarAuth, solicitarApi } from './authApi'

const CLAVE_SESION = 'sesion'

export async function registrarUsuario({ nombre, correo, password }) {
    const respuesta = await enviarAuth('register', {
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        password,
    })

    if (respuesta.status === 409) {
        return { ok: false, error: 'Ese correo ya está registrado.' }
    }
    if (respuesta.status < 200 || respuesta.status >= 300) {
        return { ok: false, error: 'No se pudo crear la cuenta.' }
    }
    return { ok: true, usuario: respuesta.data }
}

export async function iniciarSesion(correo, password) {
    const correoLimpio = correo.trim().toLowerCase()
    const respuesta = await enviarAuth('login', { correo: correoLimpio, password })
    if (respuesta.status === 401) return null
    if (respuesta.status < 200 || respuesta.status >= 300) {
        throw new Error('No se pudo iniciar sesión.')
    }

    const datos = respuesta.data
    if (!Number.isInteger(datos?.id) || datos.id <= 0 ||
        typeof datos.nombre !== 'string' || !datos.nombre.trim() ||
        typeof datos.rol !== 'string' || !datos.rol.trim() ||
        typeof datos.token !== 'string' || !datos.token.trim() ||
        !Number.isFinite(datos.expiraEnSegundos) || datos.expiraEnSegundos <= 0) {
        throw new Error('El servidor devolvió una sesión incompleta.')
    }

    const sesion = {
        id: datos.id,
        nombre: datos.nombre,
        correo: correoLimpio,
        rol: datos.rol.toLowerCase(),
        token: datos.token,
        venceEn: Date.now() + datos.expiraEnSegundos * 1000,
    }
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    return sesion
}

export function obtenerSesion() {
    // El demo anterior persistía usuarios y sesión en el navegador.
    localStorage.removeItem('usuarios')
    localStorage.removeItem(CLAVE_SESION)

    let sesion
    try {
        sesion = JSON.parse(sessionStorage.getItem(CLAVE_SESION))
    } catch {
        cerrarSesion()
        return null
    }

    if (!sesion?.token || !Number.isFinite(sesion.venceEn) || sesion.venceEn <= Date.now()) {
        cerrarSesion()
        return null
    }
    return sesion
}

export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION)
}

export function listarUsuarios(token) {
    return solicitarApi('GET', '/usuarios', { token })
}

export function modificarUsuario(id, datos, token) {
    return solicitarApi('PUT', '/usuarios/' + id, { data: datos, token })
}

export function desactivarUsuario(id, token) {
    return solicitarApi('DELETE', '/usuarios/' + id, { token })
}