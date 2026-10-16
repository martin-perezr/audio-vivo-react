import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { FormularioRegistro } from '../components/organisms/FormularioRegistro/FormularioRegistro'
import { registrarUsuario, iniciarSesion } from '../services/usuarioService'
import { useTituloPagina } from '../hooks/useTituloPagina'
import './InicioSesion.css'

export default function Registro() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  useTituloPagina('Registro')

  function registrar(datos) {
    const resultado = registrarUsuario(datos)
    if (!resultado.ok) {
      setError(resultado.error)
      return
    }
    // Al registrarse, queda con la sesión iniciada y vuelve al inicio.
    iniciarSesion(datos.correo, datos.password)
    navigate('/')
  }

  return (
    <PlantillaPublica>
      <section className="caja-login">
        <h1 className="h2 text-center mb-4">Crear cuenta</h1>
        <FormularioRegistro onEnviar={registrar} error={error} />
        <p className="text-center mt-4 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </PlantillaPublica>
  )
}