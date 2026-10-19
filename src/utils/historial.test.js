import { describe, it, expect } from 'vitest'
import { clientesConPedidos, resumenCliente } from './historial'

const pedidos = [
  { id: 1001, correo: 'luis@correo.cl', nombre: 'Luis', apellidos: 'Soto', total: 10000 },
  { id: 1002, correo: 'ana@correo.cl', nombre: 'Ana', apellidos: 'Rojas', total: 5000 },
  { id: 1003, correo: 'ana@correo.cl', nombre: 'Ana', apellidos: 'Rojas', total: 2990 },
]

describe('clientesConPedidos', () => {
  it('no repite clientes y los ordena por correo', () => {
    expect(clientesConPedidos(pedidos)).toEqual([
      { correo: 'ana@correo.cl', nombre: 'Ana Rojas' },
      { correo: 'luis@correo.cl', nombre: 'Luis Soto' },
    ])
  })
})

describe('resumenCliente', () => {
  it('cuenta los pedidos y suma el total comprado', () => {
    const deAna = pedidos.filter((p) => p.correo === 'ana@correo.cl')

    expect(resumenCliente(deAna)).toEqual({ cantidad: 2, total: 7990 })
  })
})
