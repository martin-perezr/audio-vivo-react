import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../organisms/Navbar/Navbar'
import { Footer } from '../../organisms/Footer/Footer'
import { useCarrito } from '../../../context/CarritoContext'
import { obtenerSesion, cerrarSesion } from '../../../services/usuarioService'

export function PlantillaPublica({ children }) {
  const navigate = useNavigate()
  const { unidades } = useCarrito()
  const [usuario, setUsuario] = useState(obtenerSesion)

  function salir() {
    cerrarSesion()
    setUsuario(null)
    navigate('/')
  }

  return (
    <>
      <Navbar cantidadCarrito={unidades} onNavegar={navigate} usuario={usuario} onCerrarSesion={salir} />
      <Container as="main" className="flex-grow-1 my-4">
        {children}
      </Container>
      <Footer />
    </>
  )
}
