import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { EstadoPedido } from '../components/molecules/EstadoPedido/EstadoPedido'
import { Boton } from '../components/atoms/Boton/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerSesion } from '../services/usuarioService'
import { listarPedidosDe } from '../services/pedidoService'
import { formatoPrecio } from '../utils/formatoPrecio'

// Página: pedidos del cliente con su estado. Ruta: /mis-pedidos
export default function MisPedidos() {
  const navigate = useNavigate()
  useTituloPagina('Mis pedidos')
  const sesion = obtenerSesion()

  if (!sesion) {
    return (
      <PlantillaPublica>
        <div className="text-center my-5">
          <h1 className="h2">Inicia sesión para ver tus pedidos</h1>
          <Boton onClick={() => navigate('/login')}>Iniciar sesión</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  const pedidos = listarPedidosDe(sesion.correo)

  return (
    <PlantillaPublica>
      <h1 className="h2 mb-4">Mis pedidos</h1>
      {pedidos.length === 0 && <p>Todavía no tienes pedidos.</p>}
      {pedidos.map((pedido) => (
        <Card key={pedido.id} className="mb-3">
          <Card.Body>
            <div className="d-flex flex-wrap justify-content-between gap-2 mb-2">
              <h2 className="h5 mb-0">Pedido N° {pedido.id}</h2>
              <span>{pedido.fecha} · {formatoPrecio(pedido.total)}</span>
            </div>
            <p className="mb-2">
              {pedido.entrega === 'despacho' ? `Despacho a ${pedido.direccion}, ${pedido.comuna}` : 'Retiro en tienda'}
            </p>
            <EstadoPedido estado={pedido.estado} />
          </Card.Body>
        </Card>
      ))}
    </PlantillaPublica>
  )
}
