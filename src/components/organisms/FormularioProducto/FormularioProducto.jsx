import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import categorias from '../../../data/categorias.json'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { Selector } from '../../atoms/Selector/Selector'
import { Boton } from '../../atoms/Boton/Boton'
import { validarProducto } from '../../../utils/validacionesProducto'

const VACIO = {
  codigo: '', categoria: categorias[0].nombre, nombre: '', marca: '', modelo: '',
  precio: '', stock: '', descripcion: '', imagen: '',
}

// Formulario para crear o editar un producto. "inicial" trae los datos al editar ({} al crear).
export function FormularioProducto({ inicial, productos, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState({ ...VACIO, ...inicial })
  const [errores, setErrores] = useState({})

  function cambiar(campo) {
    return (valor) => setDatos({ ...datos, [campo]: valor })
  }

  function manejarEnvio(e) {
    e.preventDefault()
    const nuevosErrores = validarProducto(datos, productos, inicial.id ?? null)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) {
      onGuardar(datos)
    }
  }

  const opciones = categorias.map((c) => ({ valor: c.nombre, texto: c.nombre }))

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <Row>
        <Col md={4}>
          <CampoFormulario id="codigo" etiqueta="Código" valor={datos.codigo}
            onChange={cambiar('codigo')} error={errores.codigo} />
        </Col>
        <Col md={8} className="mb-3">
          <label htmlFor="categoria" className="form-label fw-bold d-block">Categoría</label>
          <Selector id="categoria" valor={datos.categoria} opciones={opciones} onChange={cambiar('categoria')} />
        </Col>
        <Col md={6}>
          <CampoFormulario id="nombre" etiqueta="Nombre" valor={datos.nombre}
            onChange={cambiar('nombre')} error={errores.nombre} />
        </Col>
        <Col md={3}>
          <CampoFormulario id="marca" etiqueta="Marca" valor={datos.marca}
            onChange={cambiar('marca')} error={errores.marca} />
        </Col>
        <Col md={3}>
          <CampoFormulario id="modelo" etiqueta="Modelo" valor={datos.modelo}
            onChange={cambiar('modelo')} error={errores.modelo} />
        </Col>
        <Col md={3}>
          <CampoFormulario id="precio" etiqueta="Precio (CLP)" tipo="number" valor={datos.precio}
            onChange={cambiar('precio')} error={errores.precio} />
        </Col>
        <Col md={3}>
          <CampoFormulario id="stock" etiqueta="Stock" tipo="number" valor={datos.stock}
            onChange={cambiar('stock')} error={errores.stock} />
        </Col>
        <Col md={6}>
          <CampoFormulario id="imagen" etiqueta="Imagen (ruta, opcional)" valor={datos.imagen}
            onChange={cambiar('imagen')} placeholder="/img/logo.png" />
        </Col>
        <Col xs={12}>
          <CampoFormulario id="descripcion" etiqueta="Descripción" valor={datos.descripcion}
            onChange={cambiar('descripcion')} error={errores.descripcion} />
        </Col>
      </Row>
      <div className="d-flex gap-2">
        <Boton tipo="submit">Guardar</Boton>
        <Boton variante="filtro" onClick={onCancelar}>Cancelar</Boton>
      </div>
    </Form>
  )
}