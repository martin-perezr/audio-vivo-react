import axios from 'axios'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

vi.mock('axios', () => ({ default: { create: vi.fn() } }))

const request = vi.fn()
let authApi

beforeEach(async () => {
  vi.stubEnv('VITE_API_URL', 'http://localhost:8080/')
  axios.create.mockReturnValue({ request })
  vi.resetModules()
  authApi = await import('./authApi')
})

afterEach(() => {
  vi.resetAllMocks()
  vi.unstubAllEnvs()
})

it('reutiliza una instancia con la URL base y 10 segundos de espera', async () => {
  request.mockResolvedValue({ status: 200 })

  await authApi.enviarAuth('login', {})
  await authApi.solicitarApi('GET', '/usuarios', { token: 'token-de-prueba' })

  expect(axios.create).toHaveBeenCalledTimes(1)
  expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
  }))
  expect(request).toHaveBeenCalledTimes(2)
})

it.each([
  ['login', 200, { correo: 'ana@example.com', password: 'ClavePrueba123' }],
  ['register', 201, { nombre: 'Ana Rojas', correo: 'ana@example.com', password: 'ClavePrueba123' }],
])('envía POST a %s con Axios', async (operacion, status, datos) => {
  request.mockResolvedValue({ status, data: {} })

  const respuesta = await authApi.enviarAuth(operacion, datos)

  expect(respuesta.status).toBe(status)
  expect(request).toHaveBeenCalledWith(expect.objectContaining({
    url: '/auth/' + operacion,
    method: 'POST',
    data: datos,
    headers: undefined,
  }))
})

it('envía el Bearer a la API de usuarios', async () => {
  request.mockResolvedValue({ status: 200, data: [] })

  await authApi.solicitarApi('GET', '/usuarios', { token: 'token-de-prueba' })

  expect(request).toHaveBeenCalledWith(expect.objectContaining({
    url: '/usuarios',
    method: 'GET',
    headers: { Authorization: 'Bearer token-de-prueba' },
  }))
})

it.each([401, 409])('deja al servicio manejar la respuesta HTTP %s', async (status) => {
  const { validateStatus } = axios.create.mock.calls[0][0]
  request.mockImplementation(() => {
    if (validateStatus(status)) return Promise.resolve({ status })
    return Promise.reject(new Error('Estado rechazado por Axios'))
  })

  await expect(authApi.enviarAuth('login', {})).resolves.toMatchObject({ status })
})

it('avisa si falta la URL de la API', async () => {
  vi.stubEnv('VITE_API_URL', '')
  vi.resetModules()
  const { enviarAuth } = await import('./authApi')

  await expect(enviarAuth('login', {})).rejects.toThrow('Configura VITE_API_URL')
  expect(request).not.toHaveBeenCalled()
})

it.each(['ECONNABORTED', 'ETIMEDOUT'])('distingue el timeout %s', async (code) => {
  request.mockRejectedValue({ code })

  await expect(authApi.enviarAuth('login', {})).rejects.toThrow('El servidor tardó demasiado en responder.')
})

it('muestra un error claro cuando Axios no logra conectar', async () => {
  request.mockRejectedValue(new Error('Network Error'))

  await expect(authApi.enviarAuth('login', {})).rejects.toThrow('No pudimos conectar con el servidor.')
})
