import './ContadorCantidad.css'

export function ContadorCantidad(props){
  const min = props.min === undefined ? 1 : props.min
  const max = props.max === undefined ? Infinity : props.max

    return(
        <div className="contador">
            <button type="button" className="contador-boton" onClick={() => props.onCambiar(props.cantidad - 1)}
            disabled={props.cantidad <= min}
            aria-label="Resta uno">
                -
            </button>
            <span className="contador-numero">{props.cantidad}</span>
            <button type="button" className="contador-boton" onClick={() => props.onCambiar(props.cantidad + 1)}
            disabled={props.cantidad >= max}
            aria-label="Sumar uno">
                +
            </button>
        </div>
    )
}