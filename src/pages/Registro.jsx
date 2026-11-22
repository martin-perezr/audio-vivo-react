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
  const [enviando, setEnviando] = useState(false)
  useTituloPagina('Registro')

  async function registrar(datos) {
    if (enviando) return
    setError('')
    setEnviando(true)
    try {
      const resultado = await registrarUsuario(datos)
      if (!resultado.ok) {
        setError(resultado.error)
        return
      }

      const sesion = await iniciarSesion(datos.correo, datos.password).catch(() => null)
      navigate(sesion ? '/' : '/login')
    } catch (error) {
      setError(error.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PlantillaPublica>
      <section className="caja-login">
        <h1 className="h2 text-center mb-4">Crear cuenta</h1>
        <FormularioRegistro onEnviar={registrar} error={error} enviando={enviando} />
        <p className="text-center mt-4 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </PlantillaPublica>
  )
}
