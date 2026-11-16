import Card from 'react-bootstrap/Card'
import { Precio } from '../../atoms/Precio/Precio'
import { EtiquetaStock } from '../../atoms/EtiquetaStock/EtiquetaStock'
import { Boton } from '../../atoms/Boton/Boton'
import { hayStock } from '../../../utils/stock'
import './TarjetaProducto.css'

export function TarjetaProducto(props) {
  return (
    <Card className="tarjeta-producto h-100">
      <Card.Img
        className="img-producto"
        variant="top"
        src={props.producto.imagen}
        alt={props.producto.nombre}
      />
      <Card.Body className="info-producto">
        <Card.Title as="h3">{props.producto.nombre}</Card.Title>
        <p className="producto-detalle">
          {props.producto.marca} · {props.producto.modelo}
        </p>
        <Precio valor={props.producto.precio} />
        <EtiquetaStock stock={props.producto.stock} />
        <Boton variante="filtro" onClick={() => props.onVer(props.producto.id)}>
          Ver detalle
        </Boton>
        <Boton
          variante="comprar"
          deshabilitado={!hayStock(props.producto)}
          onClick={() => props.onAgregar(props.producto)}
        >
          Agregar al carrito
        </Boton>
      </Card.Body>
    </Card>
  )
}