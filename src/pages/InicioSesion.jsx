import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import Login from '../components/molecules/Login'
import { iniciarSesion } from '../services/usuarioService'
import { useTituloPagina } from '../hooks/useTituloPagina'
import './InicioSesion.css'

export default function InicioSesion() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    useTituloPagina('Iniciar sesión')

    function ingresar({ correo, password }) {
        const sesion = iniciarSesion(correo, password)
        if (!sesion) {
            setError('Correo o contraseña incorrectos.')
            return
        }
        navigate(sesion.rol === 'admin' ? '/admin' : '/')
    }

    return (
        <PlantillaPublica>
            <section className="caja-login">
                <h1 className="h2 text-center mb-4">Iniciar Sesión</h1>
                <Login onEnviar={ingresar} error={error} />
                <p className="text-center mt-4 mb-0">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                </p>
            </section>
        </PlantillaPublica>
    )
}