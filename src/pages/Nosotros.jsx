import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Boton } from '../components/atoms/Boton/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página informativa: quiénes somos. Ruta: /nosotros (los datos salen del documento del caso).
export default function Nosotros() {
  const navigate = useNavigate()
  useTituloPagina('Nosotros')

  return (
    <PlantillaPublica>
      <h1 className="h2 text-center mb-4">Nosotros</h1>
      <p className="lead text-center mb-4">
        Sonido Vivo es una tienda especializada en instrumentos musicales, equipos de sonido y
        accesorios para músicos, en Viña del Mar, Región de Valparaíso.
      </p>
      <Row className="g-4 mb-4">
        <Col xs={12} md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h2" className="h5">11 años con los músicos</Card.Title>
              <Card.Text>Nos atiende el dueño junto a dos vendedores que conocen cada instrumento.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h2" className="h5">Todo para tocar</Card.Title>
              <Card.Text>
                Guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos y accesorios.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h2" className="h5">Reparaciones</Card.Title>
              <Card.Text>También reparamos instrumentos de cuerda.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <Boton onClick={() => navigate('/catalogo')}>Ver el catálogo</Boton>
        <Boton variante="filtro" onClick={() => navigate('/contacto')}>Escríbenos</Boton>
      </div>
    </PlantillaPublica>
  )
}