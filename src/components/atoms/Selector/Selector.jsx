import './Selector.css'

export function Selector(props) {
  const opciones = props.opciones === undefined ? [] : props.opciones

  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <select
      id={props.id}
      value={props.valor}
      onChange={handleChange}
      className="selector-atom"
    >
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  )
}