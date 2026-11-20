import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import { CarritoProvider } from '../context/CarritoContext'
import { ProductosProvider } from '../context/ProductosContext'
import { enviarAuth } from '../services/authApi'
import InicioSesion from './InicioSesion'
import Registro from './Registro'

vi.mock('../services/authApi', () => ({ enviarAuth: vi.fn() }))

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  vi.resetAllMocks()
})

function renderizar(ruta = '/login') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <CarritoProvider>
          <Routes>
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/" element={<h1>Tienda</h1>} />
            <Route path="/admin" element={<h1>Panel de administración</h1>} />
          </Routes>
        </CarritoProvider>
      </ProductosProvider>
    </MemoryRouter>
  )
}

async function enviarFormulario(user) {
  await user.type(screen.getByLabelText('Correo electrónico'), 'ana@correo.cl')
  await user.type(screen.getByLabelText('Contraseña'), 'clave-a-validar')
  await user.click(screen.getByRole('button', { name: 'Ingresar' }))
}

it.each([['CLIENTE', 'Tienda'], ['ADMIN', 'Panel de administración']])(
  'espera la respuesta y navega según el rol %s', async (rol, titulo) => {
    let responder
    enviarAuth.mockReturnValue(new Promise((resolve) => { responder = resolve }))
    const user = userEvent.setup()
    renderizar()

    await enviarFormulario(user)

    expect(screen.getByRole('button', { name: 'Ingresando…' })).toBeDisabled()
    expect(enviarAuth).toHaveBeenCalledTimes(1)
    await act(async () => responder({
      status: 200,
      data: { id: 7, nombre: 'Ana', rol, token: 'jwt-de-prueba', expiraEnSegundos: 3600 },
    }))
    expect(screen.getByRole('heading', { name: titulo })).toBeInTheDocument()
  },
)

it('muestra el error de credenciales y vuelve a habilitar el formulario', async () => {
  enviarAuth.mockResolvedValue({ status: 401 })
  const user = userEvent.setup()
  renderizar()

  await enviarFormulario(user)

  expect(await screen.findByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  expect(screen.getByRole('button', { name: 'Ingresar' })).toBeEnabled()
})

it('si la cuenta se creó y el login automático falla, permite entrar desde el login', async () => {
  enviarAuth.mockResolvedValueOnce({ status: 201 }).mockResolvedValueOnce({ status: 401 })
  const user = userEvent.setup()
  renderizar('/registro')

  await user.type(screen.getByLabelText('Nombre completo'), 'Ana Rojas')
  await user.type(screen.getByLabelText('Correo electrónico'), 'ana@correo.cl')
  await user.type(screen.getByLabelText('Contraseña'), 'clave-de-prueba')
  await user.type(screen.getByLabelText('Repite la contraseña'), 'clave-de-prueba')
  await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

  expect(await screen.findByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  expect(enviarAuth).toHaveBeenNthCalledWith(1, 'register', {
    nombre: 'Ana Rojas', correo: 'ana@correo.cl', password: 'clave-de-prueba',
  })
  expect(enviarAuth).toHaveBeenNthCalledWith(2, 'login', {
    correo: 'ana@correo.cl', password: 'clave-de-prueba',
  })
})
