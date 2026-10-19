import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { ComprobantePedido } from '../../components/organisms/ComprobantePedido/ComprobantePedido'
import { Boton } from '../../components/atoms/Boton/Boton'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { obtenerPedido } from '../../services/pedidoService'

// Página: comprobante de un pedido. Ruta: /admin/pedidos/:id
export default function AdminComprobante() {
  const navigate = useNavigate()
  const { id } = useParams()
  useTituloPagina(`Comprobante ${id}`)

  // params.id llega como texto ("1001"): se convierte a número para buscar el pedido.
  const pedido = obtenerPedido(Number(id))

  return (
    <PlantillaAdmin>
      {pedido ? (
        <ComprobantePedido pedido={pedido} />
      ) : (
        <>
          <h1 className="h2">Pedido no encontrado</h1>
          <p>No existe un pedido con el número "{id}".</p>
        </>
      )}
      <div className="d-flex flex-wrap gap-2 mt-3">
        <Boton variante="filtro" onClick={() => navigate(-1)}>Volver</Boton>
        {pedido && <Boton onClick={() => window.print()}>Imprimir comprobante</Boton>}
      </div>
    </PlantillaAdmin>
  )
}
