import ListGroup from 'react-bootstrap/ListGroup'
import { formatoPrecio } from '../../../utils/formatoPrecio'

// Resumen de la compra: cada producto con su cantidad y subtotal, y el total.
export function ResumenCompra({ items, total }) {
  return (
    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item key={item.id} className="d-flex justify-content-between gap-2">
          <span>{item.nombre} × {item.cantidad}</span>
          <span>{formatoPrecio(item.precio * item.cantidad)}</span>
        </ListGroup.Item>
      ))}
      <ListGroup.Item className="d-flex justify-content-between fw-bold">
        <span>Total</span>
        <span>{formatoPrecio(total)}</span>
      </ListGroup.Item>
    </ListGroup>
  )
}
