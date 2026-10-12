import { useNavigate } from 'react-router-dom'
import categorias from '../data/categorias.json'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { CarruselCategorias } from '../components/organisms/CarruselCategorias/CarruselCategorias'
import { useTituloPagina } from '../hooks/useTituloPagina'
import './Inicio.css'

export default function Inicio() {
  const navigate = useNavigate()
  useTituloPagina('Inicio')
  return (
    <PlantillaPublica>
      <section className="seccion-video">
        <div className="titulo-categorias">
          <h2>Nuestros Instrumentos</h2>
        </div>
        <div className="ratio ratio-16x9 video-inicio">
          <iframe
            src="https://www.youtube.com/embed/tRv9VuFd4L8"
            title="Nuestros instrumentos"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section>
        <div className="titulo-categorias">
          <h2>Explorar Catálogo</h2>
        </div>
        <CarruselCategorias
          categorias={categorias}
          onVer={(slug) => navigate(`/categoria/${slug}`)}
        />
      </section>
    </PlantillaPublica>
  )
}