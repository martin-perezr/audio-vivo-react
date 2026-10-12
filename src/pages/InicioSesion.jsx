import {Link, useNavigate} from 'react-router-dom'
import {PlantillaPublica} from '../components/templates/PlantillaPublica/PlantillaPublica'
import Login from '../components/molecules/Login'
import './InicioSesion.css'

export default function InicioSesion() {
    const navigate = useNavigate()

    return(
        <PlantillaPublica>
            <section className='caja-login'> 
                <h1 className="h2 text-center mb-4">Iniciar Sesión</h1>
                <Login onExito={() => navigate('/')} />
                <p className="text-center mt-4 mb-0">
                    <Link to="/">Volver al inicio</Link>  
                </p>
            </section>
        </PlantillaPublica>
    )

}