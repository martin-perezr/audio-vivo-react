import { useNavigate, useParams } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Precio } from '../components/atoms/Precio/Precio'
import { EtiquetaStock } from '../components/atoms/EtiquetaStock/EtiquetaStock'
import { Boton } from '../components/atoms/Boton/Boton'

// Página: detalle de un producto. Ruta: /producto/:id
export default function DetalleProducto() {
  const navigate = useNavigate()
  const params = useParams()
  const { productos } = useProductos()

  // params.id llega como texto ("3"), por eso se convierte a número.
  const producto = productos.find((p) => p.id === Number(params.id))

  if (!producto) {
    return (
      <PlantillaPublica>
        <h1 className="h2 text-center">Producto no encontrado</h1>
        <p className="text-center">No existe un producto con el código "{params.id}".</p>
        <div className="text-center">
          <Boton onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-6">
          <img className="img-fluid rounded" src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column gap-2">
          <h1 className="h2">{producto.nombre}</h1>
          <p className="mb-0">{producto.marca} · {producto.modelo}</p>
          <p className="mb-0">Categoría: {producto.categoria}</p>
          <p>{producto.descripcion}</p>
          <Precio valor={producto.precio} />
          <EtiquetaStock stock={producto.stock} />
          {/* navigate(-1) vuelve a la página anterior, como el botón Atrás. */}
          <Boton variante="filtro" onClick={() => navigate(-1)}>Volver</Boton>
        </div>
      </div>
    </PlantillaPublica>
  )
}