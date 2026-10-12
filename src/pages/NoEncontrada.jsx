import { useNavigate } from "react-router-dom";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { Boton } from "../components/atoms/Boton/Boton";

export default function NoEncontrada() {
  const navigate = useNavigate()
  return (
    <PlantillaPublica>
      <div className="text-center my-5">
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe.</p>
      <Boton onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
      </div>
    </PlantillaPublica>
  )
}