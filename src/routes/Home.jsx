import React, {Suspense, lazy, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import monedag from "../images/moneda.gif";
import Banner from "../components/Banner";
import {useAuth} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

const Video = lazy(() => import ('../components/Video'));
const Countdown = lazy(() => import ('../components/Countdown'));
const Proyectos = lazy(() => import ('../components/ProyectosComponent'));
const Soporte = lazy(() => import ('../components/Soporte'));
const PreguntasFrecuentes = lazy(() => import ('../components/PreguntasFrecuentes'));
const Newsletter = lazy(() => import ('../components/Newsletter'));
const MapaApp = lazy(() => import ('../components/MapaApp'));
const Ventajas = lazy(() => import ('../components/Ventajas'));
const WhitepaperHome = lazy(() => import ('../components/WhitepaperHome'));
const Footer = lazy(() => import ('../components/Footer'));


const Home = () => {

    const {currentUser} = useAuth();
    const history = useHistory();

    useEffect(() => {
        try {
            if('email' in currentUser){
                history.push("/");
            }
        } catch (e) {
        }
    }, [currentUser, history]);

    return (
        <div className="container-fluid">
            <Banner/>
            <Suspense fallback={
                <div className="  container mt-5 text-center   justify-content-center">
                    <img className="moneda-carga" align="top" alt="Coin loading" src={monedag}/><p>CARGANDO...</p>
                </div>
            }>
                <Video/>
                <Countdown/>
                <WhitepaperHome/>
                <Ventajas/>
                <Proyectos/>
                <MapaApp/>
                <Soporte/>
                <PreguntasFrecuentes/>
                <Newsletter/>
                <Footer/>
            </Suspense>
        </div>
    )
}

export default Home;
