import Table from 'react-bootstrap/Table'
import { Selector } from '../../atoms/Selector/Selector'
import { formatoPrecio } from '../../../utils/formatoPrecio'


// Tabla de pedidos del panel. El selector de cada fila avisa al padre el estado nuevo.
export function TablaPedidos({ pedidos, onCambiarEstado }) {
  return (
    <Table striped bordered hover responsive className="align-middle">
      <thead>
        <tr>
          <th>N°</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Entrega</th>
          <th>Total</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.id}</td>
            <td>{pedido.fecha}</td>
            <td>{pedido.nombre} {pedido.apellidos}<br />{pedido.correo}</td>
            <td>{pedido.entrega === 'despacho' ? `${pedido.direccion}, ${pedido.comuna}` : 'Retiro en tienda'}</td>
            <td>{formatoPrecio(pedido.total)}</td>
            <td>
              <Selector
                id={`estado-${pedido.id}`}
                valor={pedido.estado}
                opciones={ESTADOS_PEDIDO}
                onChange={(estado) => onCambiarEstado(pedido.id, estado)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
