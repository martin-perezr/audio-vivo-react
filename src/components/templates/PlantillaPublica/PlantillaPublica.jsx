import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../organisms/Navbar/Navbar'
import { Footer } from '../../organisms/Footer/Footer'
import { useCarrito } from '../../../context/CarritoContext'

export function PlantillaPublica({ children }) {
  const navigate = useNavigate()
  const { unidades } = useCarrito()

  return (
    <>
      <Navbar cantidadCarrito={unidades} onNavegar={navigate} />
      <Container as="main" className="flex-grow-1 my-4">
        {children}
      </Container>
      <Footer />
    </>
  )
}
