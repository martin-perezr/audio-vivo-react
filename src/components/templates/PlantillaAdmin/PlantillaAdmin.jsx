import Container from 'react-bootstrap/Container'
import BarraBootstrap from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Navigate, useNavigate } from 'react-router-dom'
import { obtenerSesion } from '../../../services/usuarioService'

// Plantilla del panel de administración: menú propio y el contenido de cada página.
export function PlantillaAdmin({ children }) {
  const navigate = useNavigate()
  const sesion = obtenerSesion()

  // Enlaces reales (<a href>) que navegan sin recargar la página.
  function ir(ruta) {
    return (e) => {
      e.preventDefault()
      navigate(ruta)
    }
  }

  // Si no hay sesión de administrador, se va al login (sin mostrar el panel).
  if (!sesion || sesion.rol !== 'admin') {
    return <Navigate to="/login" replace />
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