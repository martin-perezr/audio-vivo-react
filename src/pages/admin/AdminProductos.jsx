import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import { PlantillaAdmin } from '../../components/templates/PlantillaAdmin/PlantillaAdmin'
import { TablaProductos } from '../../components/organisms/TablaProductos/TablaProductos'
import { FormularioProducto } from '../../components/organisms/FormularioProducto/FormularioProducto'
import { Boton } from '../../components/atoms/Boton/Boton'
import { useProductos } from '../../context/ProductosContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'

// Página: CRUD de productos. Ruta: /admin/productos
export default function AdminProductos() {
  const { productos, crear, actualizar, eliminar } = useProductos()
  // editando: null = sin formulario, {} = producto nuevo, un producto = editar ese producto.
  const [editando, setEditando] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  useTituloPagina('Admin: productos')

  function guardar(datos) {
    const producto = {
      ...datos,
      codigo: String(datos.codigo).trim(),
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: String(datos.imagen).trim() || '/img/logo.png',
    }
    if (editando.id) {
      actualizar(editando.id, producto)
    } else {
      crear(producto)
    }
    setEditando(null)
  }

  function confirmarEliminar() {
    eliminar(porEliminar.id)
    setPorEliminar(null)
  }

  return (
    <PlantillaAdmin>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h2 mb-0">Productos</h1>
        <Boton onClick={() => setEditando({})}>Nuevo producto</Boton>
      </div>

      {porEliminar && (
        <Alert variant="warning" className="d-flex flex-wrap align-items-center gap-2">
          <span className="me-auto">¿Eliminar "{porEliminar.nombre}"? No se puede deshacer.</span>
          <Boton variante="filtro" onClick={() => setPorEliminar(null)}>Cancelar</Boton>
          <Boton onClick={confirmarEliminar}>Sí, eliminar</Boton>
        </Alert>
      )}

      {editando && (
        <Card className="mb-4">
          <Card.Body>
            <h2 className="h4 mb-3">{editando.id ? 'Editar producto' : 'Nuevo producto'}</h2>
            <FormularioProducto
              key={editando.id ?? 'nuevo'}
              inicial={editando}
              productos={productos}
              onGuardar={guardar}
              onCancelar={() => setEditando(null)}
            />
          </Card.Body>
        </Card>
      )}

      <TablaProductos productos={productos} onEditar={setEditando} onEliminar={setPorEliminar} />
    </PlantillaAdmin>
  )
}