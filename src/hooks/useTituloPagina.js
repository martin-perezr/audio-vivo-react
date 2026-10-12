import { useEffect } from 'react'

// useEffect corre después de dibujar la pantalla
export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Sonido Vivo`
  }, [titulo])
}