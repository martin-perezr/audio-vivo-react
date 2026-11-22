import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import {
  cerrarSesion,
  desactivarUsuario,
  listarUsuarios,
  modificarUsuario,
  obtenerSesion,
} from '../../services/usuarioService'

export default function AdminUsuarios() {
  const navigate = useNavigate()
  const sesion = obtenerSesion()
  const token = sesion?.token
  const [usuarios, setUsuarios] = useState([])
  const [edicion, setEdicion] = useState(null)
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(true)
  useTituloPagina('Admin: usuarios')

  const comprobar = useCallback((respuesta, esperado) => {
    if (respuesta.status === esperado) return true
    if (respuesta.status === 401) {
      cerrarSesion()
      navigate('/login', { replace: true })
      return false
    }
    if (respuesta.status === 403) throw new Error('No tienes permiso para esta operación.')
    if (respuesta.status === 409) throw new Error('Ese correo ya está registrado.')
    if (respuesta.status === 404) throw new Error('El usuario ya no está disponible.')
    if (respuesta.status === 400) throw new Error('Revisa el nombre y el correo.')
    throw new Error('No se pudo completar la operación.')
  }, [navigate])

  const cargarUsuarios = useCallback(async () => {
    const respuesta = await listarUsuarios(token)
    if (comprobar(respuesta, 200)) setUsuarios(respuesta.data)
  }, [comprobar, token])

  useEffect(() => {
    cargarUsuarios()
      .catch((error) => setError(error.message))
      .finally(() => setOcupado(false))
  }, [cargarUsuarios])

  async function guardarCambio(operacion) {
    setError('')
    setOcupado(true)
    try {
      const respuesta = await operacion()
      if (comprobar(respuesta, 204)) {
        setEdicion(null)
        await cargarUsuarios()
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setOcupado(false)
    }
  }

  function guardar(evento) {
    evento.preventDefault()
    const datos = { nombre: edicion.nombre.trim(), correo: edicion.correo.trim() }
    guardarCambio(() => modificarUsuario(edicion.id, datos, token))
  }

  function desactivar(usuario) {
    if (window.confirm(`¿Desactivar a ${usuario.nombre}?`)) {
      guardarCambio(() => desactivarUsuario(usuario.id, token))
    }
  }

  return (
    <PlantillaAdmin>
      <h1 className="h2 mb-4">Usuarios</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {ocupado && <p role="status">Cargando usuarios…</p>}

      {edicion && (
        <Form onSubmit={guardar} className="mb-4">
          <Form.Group className="mb-3" controlId="usuario-nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required maxLength={100} value={edicion.nombre}
              onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="usuario-correo">
            <Form.Label>Correo</Form.Label>
            <Form.Control required type="email" maxLength={150} value={edicion.correo}
              onChange={(e) => setEdicion({ ...edicion, correo: e.target.value })} />
          </Form.Group>
          <Button type="submit" disabled={ocupado}>Guardar</Button>{' '}
          <Button type="button" variant="secondary" disabled={ocupado}
            onClick={() => setEdicion(null)}>Cancelar</Button>
        </Form>
      )}

      <Table responsive>
        <thead>
          <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.activo ? 'Activo' : 'Inactivo'}</td>
              <td>
                <Button size="sm" disabled={ocupado}
                  onClick={() => setEdicion(usuario)}>Editar</Button>{' '}
                <Button size="sm" variant="outline-danger"
                  disabled={ocupado || !usuario.activo || usuario.id === sesion?.id}
                  onClick={() => desactivar(usuario)}>Desactivar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PlantillaAdmin>
  )
}