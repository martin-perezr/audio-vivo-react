import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { TarjetaResumen } from '../../components/molecules/TarjetaResumen/TarjetaResumen'
import { useProductos } from '../../context/ProductosContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { esStockCritico } from '../../utils/stock'


// Página: resumen del panel. Ruta: /admin
export default function AdminDashboard() {
  const navigate = useNavigate()
  const { productos } = useProductos()
  useTituloPagina('Admin: resumen')

  const criticos = productos.filter(esStockCritico).length
  const unidades = productos.reduce((total, p) => total + p.stock, 0)
  const enPreparacion = listarPedidos().filter((p) => p.estado === 'preparacion').length

  return (
    <PlantillaAdmin>
      <h1 className="h2 mb-4">Resumen</h1>
      <Row className="g-4">
        <Col xs={12} sm={6} lg={4}>
          <TarjetaResumen titulo="Productos" valor={productos.length}
            textoBoton="Administrar" onVer={() => navigate('/admin/productos')} />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <TarjetaResumen titulo="Con stock crítico" valor={criticos}
            textoBoton="Ver críticos" onVer={() => navigate('/admin/criticos')} />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <TarjetaResumen titulo="Pedidos en preparación" valor={enPreparacion}
            textoBoton="Ver pedidos" onVer={() => navigate('/admin/pedidos')} />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <TarjetaResumen titulo="Unidades en bodega" valor={unidades} />
        </Col>
      </Row>
    </PlantillaAdmin>
  )
}