import { TarjetaCategoria } from '../../molecules/TarjetaCategoria/TarjetaCategoria'
import './CarruselCategorias.css'

export function CarruselCategorias(props) {
  return (
    <div className="carrusel-categorias">
      {props.categorias.map((categoria) => (
        <TarjetaCategoria key={categoria.slug} categoria={categoria} onVer={props.onVer} />
      ))}
    </div>
  )
}