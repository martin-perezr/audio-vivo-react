import { createContext, useContext, useEffect, useState } from 'react'
import * as reglas from '../utils/carrito'

// CarritoContext: guarda el carrito en el estado de React y en localStorage,
// para que el contador del menú y la página Carrito muestren siempre lo mismo.
const CLAVE = 'carrito'
const CarritoContext = createContext(null)

function leerGuardado() {
  return JSON.parse(localStorage.getItem(CLAVE)) ?? []
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerGuardado)

  // Cada vez que cambian los items, se guardan en localStorage.
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  }, [items])

  function agregar(producto) {
    setItems((actual) => reglas.agregarItem(actual, producto))
  }

  function cambiarCantidad(id, cantidad) {
    setItems((actual) => reglas.cambiarCantidad(actual, id, cantidad))
  }

  function quitar(id) {
    setItems((actual) => reglas.quitarItem(actual, id))
  }

  function vaciar() {
    setItems([])
  }

  const total = reglas.calcularTotal(items)
  const unidades = reglas.contarUnidades(items)

  return (
    <CarritoContext.Provider value={{ items, total, unidades, agregar, cambiarCantidad, quitar, vaciar }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  return contexto
}
