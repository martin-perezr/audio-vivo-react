import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { CatalogoProductos } from '../components/organisms/CatalogoProductos/CatalogoProductos'
import { useProductos } from '../context/ProductosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { esOferta } from '../utils/ofertas'

// Página: productos en oferta. Ruta: /ofertas
export default function Ofertas() {
  const navigate = useNavigate()
  const { productos } = useProductos()
  const { agregar } = useCarrito()
  useTituloPagina('Ofertas')

  const ofertas = productos.filter(esOferta)

  return (
    <PlantillaPublica>
      <h1 className="h2 text-center mb-2">Ofertas</h1>
      <p className="text-center mb-4">Productos con precio rebajado.</p>
      <CatalogoProductos
        productos={ofertas}
        onAgregar={agregar}
        onVer={(id) => navigate(`/producto/${id}`)}
      />
    </PlantillaPublica>
  )
}