import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { TablaProductos } from '../../components/organisms/TablaProductos/TablaProductos'
import { useProductos } from '../../context/ProductosContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { esStockCritico, STOCK_CRITICO } from '../../utils/stock'

// Página: productos con poco stock. Ruta: /admin/criticos
export default function AdminCriticos() {
  const { productos } = useProductos()
  useTituloPagina('Admin: stock crítico')

  // Los críticos, del que tiene menos stock al que tiene más.
  const criticos = productos.filter(esStockCritico).sort((a, b) => a.stock - b.stock)

  return (
    <PlantillaAdmin>
      <h1 className="h2">Stock crítico</h1>
      <p>Productos con {STOCK_CRITICO} unidades o menos.</p>
      {criticos.length === 0 ? (
        <p className="fw-bold">No hay productos con stock crítico.</p>
      ) : (
        <TablaProductos productos={criticos} />
      )}
    </PlantillaAdmin>
  )
}