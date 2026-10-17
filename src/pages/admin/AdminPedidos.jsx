import { useState } from 'react'
import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { TablaPedidos } from '../../components/organisms/TablaPedidos/TablaPedidos'
import { useTituloPagina } from '../../hooks/useTituloPagina'


// Página: pedidos recibidos y su estado. Ruta: /admin/pedidos
export default function AdminPedidos() {
  // useState con una función: la lista se lee del service solo la primera vez.
  const [pedidos, setPedidos] = useState(() => listarPedidos())
  useTituloPagina('Admin: pedidos')

  function cambiarEstado(id, estado) {
    actualizarEstado(id, estado)
    setPedidos(listarPedidos()) // vuelve a leer para que la tabla muestre el cambio
  }

  return (
    <PlantillaAdmin>
      <h1 className="h2 mb-4">Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Todavía no hay pedidos.</p>
      ) : (
        <TablaPedidos pedidos={pedidos} onCambiarEstado={cambiarEstado} />
      )}
    </PlantillaAdmin>
  )
}