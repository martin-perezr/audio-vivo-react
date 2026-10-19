import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { ItemCarrito } from '../components/molecules/ItemCarrito/ItemCarrito'
import { Boton } from '../components/atoms/Boton/Boton'
import { useCarrito } from '../context/CarritoContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { formatoPrecio } from '../utils/formatoPrecio'

// Página: carrito. Ruta: /carrito
export default function Carrito() {
  const navigate = useNavigate()
  const carrito = useCarrito()
  useTituloPagina('Carrito')

  if (carrito.items.length === 0) {
    return (
      <PlantillaPublica>
        <div className="text-center my-5">
          <h1 className="h2">Tu carrito está vacío</h1>
          <p>Agrega productos desde el catálogo.</p>
          <Boton onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <h1 className="h2 mb-4">Tu carrito</h1>
      {carrito.items.map((item) => (
        <ItemCarrito
          key={item.id}
          item={item}
          onCambiarCantidad={carrito.cambiarCantidad}
          onQuitar={carrito.quitar}
        />
      ))}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
        <p className="h4 mb-0">Total: {formatoPrecio(carrito.total)}</p>
        <div className="d-flex gap-2">
          <Boton variante="filtro" onClick={carrito.vaciar}>Vaciar carrito</Boton>
          <Boton onClick={() => navigate('/checkout')}>Ir a pagar</Boton>
        </div>
      </div>
    </PlantillaPublica>
  )
}
