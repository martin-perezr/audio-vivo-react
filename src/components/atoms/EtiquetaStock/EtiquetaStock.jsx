import './EtiquetaStock.css'

export function EtiquetaStock(props) {
  if (props.stock <= 0) {
    return <p className="stock stock-agotado">Sin stock</p>
  }

  return (
    <p className="stock">
      Stock: {props.stock} {props.stock === 1 ? 'disponible' : 'disponibles'}
    </p>
  )
}