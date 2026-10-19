import Table from 'react-bootstrap/Table'
import { Boton } from '../../atoms/Boton/Boton'
import { formatoPrecio } from '../../../utils/formatoPrecio'
import { ESTADOS_PEDIDO } from '../../../services/pedidoService'

// Pedidos de un cliente. "Ver comprobante" avisa al padre el número del pedido.
export function TablaHistorial({ pedidos, onVer }) {
  // Convierte la clave del estado ('preparacion') en su texto ('En preparación').
  function textoEstado(estado) {
    return ESTADOS_PEDIDO.find((e) => e.valor === estado)?.texto ?? estado
  }

  return (
    <Table striped bordered hover responsive className="align-middle">
      <thead>
        <tr>
          <th>N°</th>
          <th>Fecha</th>
          <th>Entrega</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Comprobante</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.id}</td>
            <td>{pedido.fecha}</td>
            <td>{pedido.entrega === 'despacho' ? 'Despacho' : 'Retiro en tienda'}</td>
            <td>{formatoPrecio(pedido.total)}</td>
            <td>{textoEstado(pedido.estado)}</td>
            <td>
              <Boton variante="filtro" onClick={() => onVer(pedido.id)}>Ver comprobante</Boton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
