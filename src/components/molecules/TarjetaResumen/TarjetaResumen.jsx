import Card from 'react-bootstrap/Card'
import { Boton } from '../../atoms/Boton/Boton'

// Tarjeta del dashboard: un título, un número grande y un botón para ir al módulo.
export function TarjetaResumen({ titulo, valor, textoBoton, onVer }) {
  return (
    <Card className="h-100 text-center">
      <Card.Body className="d-flex flex-column gap-2">
        <Card.Title as="h2" className="h6 text-secondary">{titulo}</Card.Title>
        <p className="display-6 fw-bold mb-0">{valor}</p>
        {onVer && (
          <Boton variante="filtro" onClick={onVer}>
            {textoBoton}
          </Boton>
        )}
      </Card.Body>
    </Card>
  )
}