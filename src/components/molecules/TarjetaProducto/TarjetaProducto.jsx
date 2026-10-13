import Card from 'react-bootstrap/Card'
import { Precio } from '../../atoms/Precio/Precio'
import { EtiquetaStock } from '../../atoms/EtiquetaStock/EtiquetaStock'
import { Boton } from '../../atoms/Boton/Boton'
import { hayStock } from '../../../utils/stock'
import './TarjetaProducto.css'

export function TarjetaProducto({ producto, onAgregar, onVer }) {
  return (
    <Card className="tarjeta-producto h-100">
      <Card.Img
        className="img-producto"
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
      />
      <Card.Body className="info-producto">
        <Card.Title as="h3">{producto.nombre}</Card.Title>
        <p className="producto-detalle">
          {producto.marca} · {producto.modelo}
        </p>
        <Precio valor={producto.precio} />
        <EtiquetaStock stock={producto.stock} />
        <Boton variante="filtro" onClick={() => onVer(producto.id)}>
          Ver detalle
        </Boton>
        <Boton
          variante="comprar"
          deshabilitado={!hayStock(producto)}
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </Boton>
      </Card.Body>
    </Card>
  )
}