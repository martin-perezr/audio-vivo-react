import { Selector } from '../../atoms/Selector/Selector'

export function FiltroCategoria(props) {
  const opciones = [
    { valor: '', texto: 'Todas' },
    ...props.categorias.map((c) => ({ valor: c.slug, texto: c.nombre })),
  ]

  return (
    <div className="d-flex align-items-center gap-2 mb-4">
      <label htmlFor="filtro-categoria" className="fw-bold">
        Categoría
      </label>
      <Selector
        id="filtro-categoria"
        valor={props.activa}
        opciones={opciones}
        onChange={props.onElegir}
      />
    </div>
  )
}