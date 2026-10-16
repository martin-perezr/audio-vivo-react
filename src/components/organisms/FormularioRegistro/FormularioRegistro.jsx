import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { Boton } from '../../atoms/Boton/Boton'
import {
    validarNombre,
    validarCorreo,
    validarPassword,
    validarConfirmacion,
} from '../../../utils/Validaciones'

export function FormularioRegistro({ onEnviar, error }) {
    const [datos, setDatos] = useState({ nombre: '', correo: '', password: '', confirmacion: '' })
    const [errores, setErrores] = useState({})

    function cambiar(campo) {
        return (valor) => setDatos({ ...datos, [campo]: valor })
    }

    function manejarEnvio(e) {
        e.preventDefault()
        const nuevosErrores = {
            nombre: validarNombre(datos.nombre),
            correo: validarCorreo(datos.correo),
            password: validarPassword(datos.password),
            confirmacion: validarConfirmacion(datos.password, datos.confirmacion),
        }
        setErrores(nuevosErrores)

        if (Object.values(nuevosErrores).some((mensaje) => mensaje !== '')) {
            return
        }
        onEnviar(datos)
    }

    return (
        <Form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario id="nombre" etiqueta="Nombre completo" valor={datos.nombre}
                onChange={cambiar('nombre')} error={errores.nombre} />
            <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" valor={datos.correo}
                onChange={cambiar('correo')} placeholder="ejemplo@correo.cl" error={errores.correo} />
            <CampoFormulario id="password" etiqueta="Contraseña" tipo="password" valor={datos.password}
                onChange={cambiar('password')} placeholder="Mínimo 12 caracteres" error={errores.password} />
            <CampoFormulario id="confirmacion" etiqueta="Repite la contraseña" tipo="password"
                valor={datos.confirmacion} onChange={cambiar('confirmacion')} error={errores.confirmacion} />

            <Boton tipo="submit" variante="login">Crear cuenta</Boton>

            {error && (
                <p className="text-danger fw-bold text-center mt-3 mb-0" role="alert">
                    {error}
                </p>
            )}
        </Form>
    )
}