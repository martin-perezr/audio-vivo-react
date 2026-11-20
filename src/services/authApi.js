import axios from 'axios'

const base = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')
const api = axios.create({
  baseURL: base ? base + '/api/v1' : undefined,
  timeout: 10000,
  validateStatus: () => true,
})

export async function solicitarApi(method, url, { data, token } = {}) {
  if (!base) throw new Error('Configura VITE_API_URL en .env.local.')

  try {
    return await api.request({
      url,
      method,
      data,
      headers: token ? { Authorization: 'Bearer ' + token } : undefined,
    })
  } catch (error) {
    if (error?.code === 'ECONNABORTED' || error?.code === 'ETIMEDOUT') {
      throw new Error('El servidor tardó demasiado en responder.')
    }
    throw new Error('No pudimos conectar con el servidor.')
  }
}

export function enviarAuth(operacion, datos) {
  return solicitarApi('POST', '/auth/' + operacion, { data: datos })
}
