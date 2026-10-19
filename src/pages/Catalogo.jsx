import { useNavigate, useParams } from 'react-router-dom'
import categorias from '../data/categorias.json'
import { useProductos } from '../context/ProductosContext'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { FiltroCategoria } from '../components/molecules/FiltroCategoria/FiltroCategoria'
import { CatalogoProductos } from '../components/organisms/CatalogoProductos/CatalogoProductos'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useCarrito } from '../context/CarritoContext'

export default function Catalogo() {
  const navigate = useNavigate()
  const { slug = '' } = useParams()
  const { productos } = useProductos()
  const { agregar } = useCarrito()

  const categoria = categorias.find((c) => c.slug === slug)
  useTituloPagina(categoria ? categoria.nombre : 'Catálogo')
  const visibles = categoria
    ? productos.filter((p) => p.categoria === categoria.nombre)
    : productos

  function elegirCategoria(nuevoSlug) {
    navigate(nuevoSlug ? `/categoria/${nuevoSlug}` : '/catalogo')
  }

  return (
    <PlantillaPublica>
      <h1 className="h2 text-center mb-4">
        {categoria ? categoria.nombre : 'Catálogo completo'}
      </h1>
      <FiltroCategoria categorias={categorias} activa={slug} onElegir={elegirCategoria} />
      <CatalogoProductos productos={visibles} onAgregar={agregar} onVer={(id) => navigate(`/producto/${id}`)} />

    </PlantillaPublica>
  )

}
