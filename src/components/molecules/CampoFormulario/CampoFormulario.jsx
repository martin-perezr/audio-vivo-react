import { CampoTexto } from '../../atoms/CampoTexto/CampoTexto'

export function CampoFormulario(props) {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label fw-bold">
        {props.etiqueta}
      </label>
      <CampoTexto invalido={!!props.error} {...props} />
      {props.error && <div className="invalid-feedback d-block">{props.error}</div>}
    </div>
  )
}