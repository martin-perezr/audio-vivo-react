import BarraBootstrap from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import './Navbar.css'

export function Navbar({ cantidadCarrito, onNavegar, usuario, onCerrarSesion }) {
  // Cada enlace es un <a href> real, pero el clic lo maneja el router (sin recargar la página).
  function ir(ruta) {
    return (e) => {
      e.preventDefault()
      onNavegar(ruta)
    }
  }

  return (
    <BarraBootstrap expand="lg" variant="dark" className="navbar-sonido-vivo">
      <Container>
        <BarraBootstrap.Brand href="/" onClick={ir('/')}>
          <img className="marca-logo" src="/img/logo.png" alt="" />
          <span>
            <span className="marca-titulo d-block">Sonido Vivo</span>
            <span className="marca-lema d-block">
              Instrumentos y Equipos Musicales • Viña del Mar
            </span>
          </span>
        </BarraBootstrap.Brand>
        <BarraBootstrap.Toggle aria-controls="menu-principal" />
        <BarraBootstrap.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link href="/" onClick={ir('/')}>
              Inicio
            </Nav.Link>
            <Nav.Link href="/catalogo" onClick={ir('/catalogo')}>
              Catálogo
            </Nav.Link>
            <Nav.Link href="/carrito" onClick={ir('/carrito')}>
              <img className="icono-carrito" src="/img/shopping-cart.png" alt="Carrito de compras" />
              <span className="contador-carrito">{cantidadCarrito}</span>
            </Nav.Link>
            <Nav.Link href="/contacto" onClick={ir('/contacto')}>
              Contáctanos
            </Nav.Link>
            {usuario ? (
              <>
                {usuario.rol === 'admin' && (
                  <Nav.Link href="/admin" onClick={ir('/admin')}>
                    Administración
                  </Nav.Link>
                )}
                <Nav.Link href="/mis-pedidos" onClick={ir('/mis-pedidos')}>
                  Mis pedidos
                </Nav.Link>
                <Nav.Link as="button" type="button" onClick={onCerrarSesion}>
                  Cerrar sesión ({usuario.nombre})
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login" onClick={ir('/login')}>
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </BarraBootstrap.Collapse>
      </Container>
    </BarraBootstrap>
  )
}