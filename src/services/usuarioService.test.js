import { beforeEach, expect, it, vi } from 'vitest'
import { enviarAuth } from './authApi'
import { cerrarSesion, iniciarSesion, obtenerSesion, registrarUsuario } from './usuarioService'

vi.mock('./authApi', () => ({ enviarAuth: vi.fn() }))

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  vi.resetAllMocks()
})

it('guarda la sesión del login y la elimina al cerrar', async () => {
  enviarAuth.mockResolvedValue({
    status: 200,
    data: { id: 7, nombre: 'Ana', rol: 'CLIENTE', token: 'jwt-de-prueba', expiraEnSegundos: 3600 },
  })

  const sesion = await iniciarSesion(' ANA@correo.cl ', 'clave-de-prueba')

  expect(enviarAuth).toHaveBeenCalledWith('login', {
    correo: 'ana@correo.cl',
    password: 'clave-de-prueba',
  })
  expect(sesion).toMatchObject({ id: 7, nombre: 'Ana', correo: 'ana@correo.cl', rol: 'cliente', token: 'jwt-de-prueba' })
  expect(sesion.venceEn).toBeGreaterThan(Date.now())
  expect(sesion).not.toHaveProperty('password')
  expect(obtenerSesion()).toEqual(sesion)
  cerrarSesion()
  expect(sessionStorage.getItem('sesion')).toBeNull()
})

it('devuelve null cuando el login responde 401', async () => {
  enviarAuth.mockResolvedValue({ status: 401 })

  await expect(iniciarSesion('ana@correo.cl', 'incorrecta')).resolves.toBeNull()
  expect(obtenerSesion()).toBeNull()
})

it('rechaza una respuesta de login sin los datos de sesión', async () => {
  enviarAuth.mockResolvedValue({ status: 200, data: { token: 'jwt-de-prueba' } })

  await expect(iniciarSesion('ana@correo.cl', 'clave-de-prueba'))
    .rejects.toThrow('El servidor devolvió una sesión incompleta.')
  expect(obtenerSesion()).toBeNull()
})

it('elimina la sesión vencida cuando se lee', () => {
  sessionStorage.setItem('sesion', JSON.stringify({ token: 'jwt-de-prueba', venceEn: Date.now() - 1000 }))

  expect(obtenerSesion()).toBeNull()
  expect(sessionStorage.getItem('sesion')).toBeNull()
})

it('elimina un registro de sesión que no es JSON válido', () => {
  sessionStorage.setItem('sesion', '{')

  expect(obtenerSesion()).toBeNull()
  expect(sessionStorage.getItem('sesion')).toBeNull()
})

it('limpia la autenticación del demo y conserva el carrito', () => {
  localStorage.setItem('usuarios', '[]')
  localStorage.setItem('sesion', '{}')
  localStorage.setItem('carrito', '[1]')

  expect(obtenerSesion()).toBeNull()
  expect(localStorage.getItem('usuarios')).toBeNull()
  expect(localStorage.getItem('sesion')).toBeNull()
  expect(localStorage.getItem('carrito')).toBe('[1]')
})

it('registra la cuenta usando solo los campos que espera la API', async () => {
  const usuario = { id: 7, nombre: 'Ana', correo: 'ana@correo.cl', rol: 'CLIENTE' }
  enviarAuth.mockResolvedValue({ status: 201, data: usuario })

  await expect(registrarUsuario({
    nombre: ' Ana ', correo: ' ANA@correo.cl ', password: 'clave-de-prueba', confirmacion: 'clave-de-prueba',
  })).resolves.toEqual({ ok: true, usuario })
  expect(enviarAuth).toHaveBeenCalledWith('register', {
    nombre: 'Ana', correo: 'ana@correo.cl', password: 'clave-de-prueba',
  })
})

it('avisa cuando el correo del registro ya existe', async () => {
  enviarAuth.mockResolvedValue({ status: 409 })

  await expect(registrarUsuario({
    nombre: 'Ana', correo: 'ana@correo.cl', password: 'clave-de-prueba',
  })).resolves.toEqual({ ok: false, error: 'Ese correo ya está registrado.' })
})
