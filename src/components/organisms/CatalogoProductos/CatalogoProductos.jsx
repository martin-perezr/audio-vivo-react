import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { TarjetaProducto } from '../../molecules/TarjetaProducto/TarjetaProducto'

export function CatalogoProductos({ productos, onAgregar, onVer}) {

  <TarjetaProducto producto={producto} onAgregar={onAgregar} onVer={onVer} />
  
  if (productos.length === 0) {
    return <p className="text-center my-5">No hay productos en esta categoría.</p>
  }

  return (
    <Row className="g-4">
      {productos.map((producto) => (
        <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
          <TarjetaProducto producto={producto} onAgregar={onAgregar} />
        </Col>
      ))}
    </Row>
  )
}
