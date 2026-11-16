import Form from 'react-bootstrap/Form'
import './CampoTexto.css'

export function CampoTexto(props) {
  const invalido = props.invalido === undefined ? false : props.invalido

  return (
    <Form.Control
      id={props.id}
      name={props.id}
      type={props.tipo === undefined ? 'text' : props.tipo}
      value={props.valor}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={invalido ? 'campo-texto campo-error' : 'campo-texto'}
    />
  )
}