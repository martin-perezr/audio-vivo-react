import { Precio } from '../../atoms/Precio/Precio'
import { ContadorCantidad } from '../../atoms/ContadorCantidad/ContadorCantidad'
import { Boton } from '../../atoms/Boton/Boton'
import { formatoPrecio } from '../../../utils/formatoPrecio'

// Una fila del carrito: imagen, nombre, precio, cantidad, subtotal y botón Quitar.
export function ItemCarrito({ item, onCambiarCantidad, onQuitar }) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-3 border-bottom py-3">
      <img src={item.imagen} alt={item.nombre} width="80" height="80" className="rounded object-fit-cover" />
      <div className="flex-grow-1">
        <h2 className="h6 mb-1">{item.nombre}</h2>
        <Precio valor={item.precio} />
      </div>
      <ContadorCantidad
        cantidad={item.cantidad}
        max={item.stock}
        onCambiar={(cantidad) => onCambiarCantidad(item.id, cantidad)}
      />
      <p className="fw-bold mb-0">Subtotal: {formatoPrecio(item.precio * item.cantidad)}</p>
      <Boton variante="filtro" onClick={() => onQuitar(item.id)}>
        Quitar
      </Boton>
    </div>
  )
}
