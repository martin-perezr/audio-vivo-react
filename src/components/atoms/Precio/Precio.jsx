import './Precio.css'
import { formatoPrecio } from '../../../utils/formatoPrecio'

export function Precio(props) {
  return <p className="precio fw-bold mb-0">{formatoPrecio(props.valor)}</p>
}