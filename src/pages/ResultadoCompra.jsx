import { useLocation, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { ResumenCompra } from '../components/organisms/ResumenCompra/ResumenCompra'
import { Boton } from '../components/atoms/Boton/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página: resultado de la compra. Rutas: /compra-exitosa y /compra-fallida (ver App.jsx).
// El checkout le pasa el pedido o el error con navigate(ruta, { state }).
export default function ResultadoCompra({ exito }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  useTituloPagina(exito ? 'Compra exitosa' : 'No se pudo completar la compra')

  if (exito && state?.pedido) {
    const { pedido } = state
    return (
      <PlantillaPublica>
        <Alert variant="success">
          <h1 className="h3">¡Compra exitosa!</h1>
          <p className="mb-0">Tu pedido N° {pedido.id} quedó en preparación.</p>
        </Alert>
        <ResumenCompra items={pedido.items} total={pedido.total} />
        <div className="d-flex gap-2 mt-4">
          <Boton onClick={() => navigate('/mis-pedidos')}>Ver mis pedidos</Boton>
          <Boton variante="filtro" onClick={() => navigate('/catalogo')}>Seguir comprando</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <Alert variant="danger">
        <h1 className="h3">No se pudo completar la compra</h1>
        <p className="mb-0">{state?.error ?? 'Ocurrió un problema con tu pedido.'}</p>
      </Alert>
      <Boton onClick={() => navigate('/carrito')}>Volver al carrito e intentar de nuevo</Boton>
    </PlantillaPublica>
  )
}
