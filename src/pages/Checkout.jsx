import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { FormularioCheckout } from '../components/organisms/FormularioCheckout/FormularioCheckout'
import { ResumenCompra } from '../components/organisms/ResumenCompra/ResumenCompra'
import { Boton } from '../components/atoms/Boton/Boton'
import { useCarrito } from '../context/CarritoContext'
import { useProductos } from '../context/ProductosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerSesion } from '../services/usuarioService'
import { crearPedido } from '../services/pedidoService'

// Página: confirmar la compra. Ruta: /checkout
export default function Checkout() {
  const navigate = useNavigate()
  const carrito = useCarrito()
  const { recargar } = useProductos()
  useTituloPagina('Checkout')
  const sesion = obtenerSesion()

  function confirmar(datos) {
    const resultado = crearPedido(datos, carrito.items)
    recargar() // el stock cambió: el catálogo vuelve a leer los productos
    if (resultado.ok) {
      carrito.vaciar()
      navigate('/compra-exitosa', { state: { pedido: resultado.pedido } })
    } else {
      navigate('/compra-fallida', { state: { error: resultado.error } })
    }
  }

  if (carrito.items.length === 0) {
    return (
      <PlantillaPublica>
        <div className="text-center my-5">
          <h1 className="h2">No hay productos para pagar</h1>
          <Boton onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  if (!sesion) {
    return (
      <PlantillaPublica>
        <div className="text-center my-5">
          <h1 className="h2">Inicia sesión para terminar tu compra</h1>
          <p>Tu carrito se mantiene guardado.</p>
          <Boton onClick={() => navigate('/login')}>Iniciar sesión</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <h1 className="h2 mb-4">Confirmar compra</h1>
      <Row className="g-4">
        <Col xs={12} md={7}>
          <FormularioCheckout inicial={sesion} onConfirmar={confirmar} />
        </Col>
        <Col xs={12} md={5}>
          <h2 className="h5">Resumen</h2>
          <ResumenCompra items={carrito.items} total={carrito.total} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}
