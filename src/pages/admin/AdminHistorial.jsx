import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { TablaHistorial } from '../../components/organisms/TablaHistorial/TablaHistorial'
import { Selector } from '../../components/atoms/Selector/Selector'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { listarPedidos, listarPedidosDe } from '../../services/pedidoService'
import { clientesConPedidos, resumenCliente } from '../../utils/historial'
import { formatoPrecio } from '../../utils/formatoPrecio'

// Página: historial de pedidos de un cliente. Ruta: /admin/historial
export default function AdminHistorial() {
  const navigate = useNavigate()
  useTituloPagina('Admin: historial')

  const clientes = clientesConPedidos(listarPedidos())
  // El cliente elegido en el selector; parte con el primero de la lista.
  const [correo, setCorreo] = useState(clientes[0]?.correo ?? '')

  // Sus pedidos, del más nuevo al más antiguo.
  const pedidos = listarPedidosDe(correo).sort((a, b) => b.id - a.id)
  const resumen = resumenCliente(pedidos)
  const opciones = clientes.map((c) => ({ valor: c.correo, texto: `${c.nombre} (${c.correo})` }))

  return (
    <PlantillaAdmin>
      <h1 className="h2 mb-3">Historial por cliente</h1>
      {clientes.length === 0 ? (
        <p>Todavía no hay pedidos.</p>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="cliente" className="form-label fw-bold d-block">Cliente</label>
            <Selector id="cliente" valor={correo} opciones={opciones} onChange={setCorreo} />
          </div>
          <p>
            {resumen.cantidad} {resumen.cantidad === 1 ? 'pedido' : 'pedidos'} · Total comprado: {formatoPrecio(resumen.total)}
          </p>
          <TablaHistorial pedidos={pedidos} onVer={(id) => navigate(`/admin/pedidos/${id}`)} />
        </>
      )}
    </PlantillaAdmin>
  )
}
