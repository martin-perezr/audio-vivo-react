import './TarjetaCategoria.css'

export function TarjetaCategoria(props) {
  return (
    <article className="tarjeta-categoria">
      <button
        type="button"
        className="tarjeta-categoria-boton"
        onClick={() => props.onVer(props.categoria.slug)}
      >
        <img src={props.categoria.imagen} alt="" />
        <span>{props.categoria.nombre}</span>
      </button>
    </article>
  )
}