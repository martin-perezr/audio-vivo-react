import { Precio } from '../../atoms/Precio/Precio'
import { ContadorCantidad } from '../../atoms/ContadorCantidad/ContadorCantidad'
import { Boton } from '../../atoms/Boton/Boton'
import { formatoPrecio } from '../../../utils/formatoPrecio'

// Una fila del carrito: imagen, nombre, precio, cantidad, subtotal y botón Quitar.
export function ItemCarrito(props) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-3 border-bottom py-3">
      <img src={props.item.imagen} alt={props.item.nombre} width="80" height="80" className="rounded object-fit-cover" />
      <div className="flex-grow-1">
        <h2 className="h6 mb-1">{props.item.nombre}</h2>
        <Precio valor={props.item.precio} />
      </div>
      <ContadorCantidad
        cantidad={props.item.cantidad}
        max={props.item.stock}
        onCambiar={(cantidad) => props.onCambiarCantidad(props.item.id, cantidad)}
      />
      <p className="fw-bold mb-0">Subtotal: {formatoPrecio(props.item.precio * props.item.cantidad)}</p>
      <Boton variante="filtro" onClick={() => props.onQuitar(props.item.id)}>
        Quitar
      </Boton>
    </div>
  )
}
