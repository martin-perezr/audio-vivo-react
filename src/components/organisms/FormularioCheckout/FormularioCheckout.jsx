import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { Selector } from '../../atoms/Selector/Selector'
import { Boton } from '../../atoms/Boton/Boton'
import { validarCheckout } from '../../../utils/checkout'

const OPCIONES_ENTREGA = [
  { valor: 'despacho', texto: 'Despacho a domicilio' },
  { valor: 'retiro', texto: 'Retiro en tienda' },
]

// Formulario de checkout. "inicial" trae el nombre y el correo de la sesión, para que se complete solo.
export function FormularioCheckout({ inicial, onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: inicial.nombre ?? '',
    apellidos: '',
    correo: inicial.correo ?? '',
    entrega: 'despacho',
    direccion: '',
    comuna: '',
  })
  const [errores, setErrores] = useState({})

  function cambiar(campo) {
    return (valor) => setDatos({ ...datos, [campo]: valor })
  }

  function manejarEnvio(e) {
    e.preventDefault()
    const nuevosErrores = validarCheckout(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) {
      onConfirmar(datos)
    }
  }

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario id="nombre" etiqueta="Nombre" valor={datos.nombre}
        onChange={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="apellidos" etiqueta="Apellidos" valor={datos.apellidos}
        onChange={cambiar('apellidos')} error={errores.apellidos} />
      <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" valor={datos.correo}
        onChange={cambiar('correo')} error={errores.correo} />

      <div className="mb-3">
        <label htmlFor="entrega" className="form-label fw-bold d-block">Forma de entrega</label>
        <Selector id="entrega" valor={datos.entrega} opciones={OPCIONES_ENTREGA} onChange={cambiar('entrega')} />
      </div>

      {datos.entrega === 'despacho' ? (
        <>
          <CampoFormulario id="direccion" etiqueta="Dirección" valor={datos.direccion}
            onChange={cambiar('direccion')} error={errores.direccion} />
          <CampoFormulario id="comuna" etiqueta="Comuna" valor={datos.comuna}
            onChange={cambiar('comuna')} error={errores.comuna} />
        </>
      ) : (
        <p>Retiras tu pedido en nuestra tienda de Viña del Mar.</p>
      )}

      <Boton tipo="submit">Confirmar compra</Boton>
    </Form>
  )
}
