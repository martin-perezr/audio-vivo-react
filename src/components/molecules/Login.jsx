import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { CampoFormulario } from './CampoFormulario/CampoFormulario'
import { Boton } from '../atoms/Boton/Boton'
import { validarCorreo } from '../../utils/Validaciones'


function Login(props) {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({ correo: '', password: '' })

  function manejarEnvio(e) {
    e.preventDefault()

    const nuevosErrores = {
      correo: validarCorreo(correo),
      password: password.trim() ? '' : 'Ingresa tu contraseña.',
    }
    setErrores(nuevosErrores)

    if (nuevosErrores.correo || nuevosErrores.password) {
      return
    }

    props.onEnviar({ correo, password })
  }

  return (
    <Form id="form-login" onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        id="correo"
        etiqueta="Correo electrónico"
        tipo="email"
        valor={correo}
        onChange={setCorreo}
        placeholder="ejemplo@correo.cl"
        error={errores.correo}
      />

      <CampoFormulario
        id="password"
        etiqueta="Contraseña"
        tipo="password"
        valor={password}
        onChange={setPassword}
        error={errores.password}
      />

      <Boton tipo="submit" variante="login" deshabilitado={props.enviando}>
        {props.enviando ? 'Ingresando…' : 'Ingresar'}
      </Boton>

      {props.error && (
        <p className="text-danger fw-bold text-center mt-3 mb-0" role="alert">
          {props.error}
        </p>
      )}
    </Form>
  )
}

export default Login
