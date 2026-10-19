import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { FormularioContacto } from '../components/organisms/FormularioContacto/FormularioContacto'
import { guardarMensaje } from '../services/contactoService'
import { useTituloPagina } from '../hooks/useTituloPagina'
import './InicioSesion.css'

export default function Contacto() {
  const [enviado, setEnviado] = useState(false)
  useTituloPagina('Contáctanos')

  function enviar(datos) {
    guardarMensaje(datos)
    setEnviado(true)
  }

  return (
    <PlantillaPublica>
      <section className="caja-login">
        <h1 className="h2 text-center mb-2">Contáctanos</h1>
        <p className="text-center">¿Tienes dudas sobre un producto o un pedido? Escríbenos.</p>
        {enviado && (
          <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
            Gracias por escribirnos, te responderemos pronto.
          </Alert>
        )}
        <FormularioContacto onEnviar={enviar} />
      </section>
    </PlantillaPublica>
  )
}