import Container from 'react-bootstrap/Container'
import BarraBootstrap from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom'

// Plantilla del panel de administración: menú propio y el contenido de cada página.
export function PlantillaAdmin({ children }) {
  const navigate = useNavigate()

  // Enlaces reales (<a href>) que navegan sin recargar la página.
  function ir(ruta) {
    return (e) => {
      e.preventDefault()
      navigate(ruta)
    }
  }

  return (
    <>
      <BarraBootstrap expand="lg" variant="dark" bg="dark">
        <Container>
          <BarraBootstrap.Brand href="/admin" onClick={ir('/admin')}>
            Sonido Vivo · Administración
          </BarraBootstrap.Brand>
          <BarraBootstrap.Toggle aria-controls="menu-admin" />
          <BarraBootstrap.Collapse id="menu-admin">
            <Nav className="ms-auto">
              <Nav.Link href="/admin" onClick={ir('/admin')}>Resumen</Nav.Link>
              <Nav.Link href="/admin/productos" onClick={ir('/admin/productos')}>Productos</Nav.Link>
              <Nav.Link href="/admin/historial" onClick={ir('/admin/historial')}>Historial</Nav.Link>
              <Nav.Link href="/admin/criticos" onClick={ir('/admin/criticos')}>Stock crítico</Nav.Link>
              <Nav.Link href="/" onClick={ir('/')}>Ver tienda</Nav.Link>
            </Nav>
          </BarraBootstrap.Collapse>
        </Container>
      </BarraBootstrap>
      <Container as="main" className="flex-grow-1 my-4">
        {children}
      </Container>
    </>
  )
}