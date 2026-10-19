import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { Selector } from '../../atoms/Selector/Selector'
import { Boton } from '../../atoms/Boton/Boton'
import { validarNombre, validarCorreo, validarMensaje } from '../../../utils/Validaciones'

const ASUNTOS = [
  { valor: 'producto', texto: 'Consulta sobre un producto' },
  { valor: 'pedido', texto: 'Estado de un pedido' },
  { valor: 'otro', texto: 'Otro' },
]

const VACIO = { nombre: '', correo: '', asunto: 'producto', mensaje: '' }

export function FormularioContacto({ onEnviar }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})

  function cambiar(campo) {
    return (valor) => setDatos({ ...datos, [campo]: valor })
  }

  function manejarEnvio(e) {
    e.preventDefault()
    const nuevosErrores = {
      nombre: validarNombre(datos.nombre),
      correo: validarCorreo(datos.correo),
      mensaje: validarMensaje(datos.mensaje),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((mensaje) => mensaje !== '')) {
      return
    }
    onEnviar(datos)
    setDatos(VACIO) // limpia el formulario
  }

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario id="nombre" etiqueta="Nombre" valor={datos.nombre}
        onChange={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" valor={datos.correo}
        onChange={cambiar('correo')} placeholder="ejemplo@correo.cl" error={errores.correo} />

      <div className="mb-3">
        <label htmlFor="asunto" className="form-label fw-bold d-block">Asunto</label>
        <Selector id="asunto" valor={datos.asunto} opciones={ASUNTOS} onChange={cambiar('asunto')} />
      </div>

      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label fw-bold">Mensaje</label>
        <Form.Control
          id="mensaje"
          as="textarea"
          rows={4}
          value={datos.mensaje}
          onChange={(e) => cambiar('mensaje')(e.target.value)}
          isInvalid={Boolean(errores.mensaje)}
        />
        {errores.mensaje && <div className="invalid-feedback d-block">{errores.mensaje}</div>}
      </div>

      <Boton tipo="submit" variante="login">Enviar mensaje</Boton>
    </Form>
  )
}