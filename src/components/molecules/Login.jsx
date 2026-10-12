import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { CampoFormulario } from './CampoFormulario/CampoFormulario'
import { Boton } from '../atoms/Boton/Boton'
import { validarCorreo, validarPassword } from "../../utils/Validaciones";

function Login({ onExito }) {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({ correo: '', password: '' })
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()

    const nuevosErrores = {
      correo: validarCorreo(correo),
      password: validarPassword(password),
    }
    setErrores(nuevosErrores)

    if (nuevosErrores.correo || nuevosErrores.password) {
      setMensaje('')
      return
    }

    localStorage.setItem('sesionIniciada', 'true')
    setMensaje('¡Sesión iniciada correctamente!')

    if (onExito) {
      setTimeout(onExito, 1000)
    }
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
        placeholder="Mínimo 12 caracteres"
        error={errores.password}
      />

      <Boton tipo="submit" variante="login">Ingresar</Boton>

      {mensaje && (
        <p className="text-success fw-bold text-center mt-3 mb-0" role="status">
          {mensaje}
        </p>
      )}
    </Form>
  )
}

export default Login