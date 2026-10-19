import Card from 'react-bootstrap/Card'
import { ResumenCompra } from '../ResumenCompra/ResumenCompra'
import { EstadoPedido } from '../../molecules/EstadoPedido/EstadoPedido'

// Comprobante de un pedido: cliente, entrega, productos, total y estado.
export function ComprobantePedido({ pedido }) {
  const entrega = pedido.entrega === 'despacho'
    ? `Despacho a ${pedido.direccion}, ${pedido.comuna}`
    : 'Retiro en tienda'

  return (
    <Card>
      <Card.Body className="d-flex flex-column gap-3">
        <div className="d-flex flex-wrap justify-content-between gap-2">
          <h2 className="h4 mb-0">Comprobante N° {pedido.id}</h2>
          <span>Fecha: {pedido.fecha}</span>
        </div>
        <div>
          <p className="mb-1">
            <strong>Cliente:</strong> {pedido.nombre} {pedido.apellidos} ({pedido.correo})
          </p>
          <p className="mb-0">
            <strong>Entrega:</strong> {entrega}
          </p>
        </div>
        <ResumenCompra items={pedido.items} total={pedido.total} />
        <EstadoPedido estado={pedido.estado} />
      </Card.Body>
    </Card>
  )
}
