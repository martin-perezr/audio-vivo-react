import Table from 'react-bootstrap/Table'
import { Boton } from '../../atoms/Boton/Boton'
import { formatoPrecio } from '../../../utils/formatoPrecio'

// Tabla de productos del panel. Si recibe onEditar y onEliminar, muestra los botones de acción.
export function TablaProductos({ productos, onEditar, onEliminar }) {
  const conAcciones = Boolean(onEditar && onEliminar)

  return (
    <Table striped bordered hover responsive className="align-middle">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          {conAcciones && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.codigo}</td>
            <td>{producto.nombre}</td>
            <td>{producto.categoria}</td>
            <td>{formatoPrecio(producto.precio)}</td>
            <td>{producto.stock}</td>
            {conAcciones && (
              <td>
                <div className="d-flex gap-2">
                  <Boton variante="filtro" onClick={() => onEditar(producto)}>Editar</Boton>
                  <Boton variante="filtro" onClick={() => onEliminar(producto)}>Eliminar</Boton>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}