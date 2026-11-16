import './Boton.css'

export function Boton(props) {
  const variante = props.variante === undefined ? 'comprar' : props.variante

  return (
    <button
      type={props.tipo === undefined ? 'button' : props.tipo}
      className={`btn-${variante}`}
      onClick={props.onClick}
      disabled={props.deshabilitado === undefined ? false : props.deshabilitado}
    >
      {props.children}
    </button>
  )
}