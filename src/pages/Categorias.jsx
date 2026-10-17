import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import categorias from '../data/categorias.json'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { TarjetaCategoria } from '../components/molecules/TarjetaCategoria/TarjetaCategoria'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página: todas las categorías. Al elegir una, lleva al catálogo filtrado (/categoria/:slug).
export default function Categorias() {
  const navigate = useNavigate()
  useTituloPagina('Categorías')

  return (
    <PlantillaPublica>
      <h1 className="h2 text-center mb-4">Categorías</h1>
      <Row className="g-4">
        {categorias.map((categoria) => (
          <Col key={categoria.slug} xs={12} sm={6} lg={4}>
            <TarjetaCategoria
              categoria={categoria}
              onVer={(slug) => navigate(`/categoria/${slug}`)}
            />
          </Col>
        ))}
      </Row>
    </PlantillaPublica>
  )
}