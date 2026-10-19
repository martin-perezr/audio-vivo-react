import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import NoEncontrada from './pages/NoEncontrada'
import InicioSesion from './pages/InicioSesion'
import Registro from './pages/Registro'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductos from './pages/admin/AdminProductos'
import AdminCriticos from './pages/admin/AdminCriticos'

// App conecta cada dirección (URL) con su página.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categoria/:slug" element={<Catalogo />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NoEncontrada />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/criticos" element={<AdminCriticos />} />
        
      </Routes>
    </BrowserRouter>
  )
}