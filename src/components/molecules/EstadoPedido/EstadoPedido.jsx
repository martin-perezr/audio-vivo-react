import './EstadoPedido.css'

const PASOS = [
  { clave: 'preparacion', texto: 'En preparación' },
  { clave: 'despachado', texto: 'Despachado' },
  { clave: 'entregado', texto: 'Entregado' },
]

export function EstadoPedido(props) {
  const actual = PASOS.findIndex((paso) => paso.clave === props.estado)

  return (
    <ol className="estado-pedido">
      {PASOS.map((paso, indice) => (
        <li
          key={paso.clave}
          className={indice <= actual ? 'estado-paso estado-paso-cumplido' : 'estado-paso'}
        >
          {paso.texto}
        </li>
      ))}
    </ol>
  )
}