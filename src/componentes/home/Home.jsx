import React, {Suspense, lazy, useEffect, useState} from 'react';
import '../../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import monedag from "../../images/moneda.gif";
import Banner from "./Banner";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

/*const Banner =lazy(()=>import ('./Banner'));*/
const Video = lazy(() => import ('./Video'));
const Countdown = lazy(() => import ('./Countdown'));
const Proyectos = lazy(() => import ('../proyectos/Proyectos'));
const Soporte = lazy(() => import ('./Soporte'));
const PreguntasFrecuentes = lazy(() => import ('./PreguntasFrecuentes'));
const Newsletter = lazy(() => import ('./Newsletter'));
const MapaApp = lazy(() => import ('./MapaApp'));
const Ventajas = lazy(() => import ('./Ventajas'));
const WhitepaperHome = lazy(() => import ('./WhitepaperHome'));
const Footer = lazy(() => import ('../footer/Footer'));


const Home = () => {

    const {currentUser, logout} = useAuth();
    const history = useHistory();

    useEffect(() => {
        try {
            let email = currentUser.email;
            history.push("/");
        } catch (e) {}
    }, []);

    return (
        <div className="container-fluid" className="">
            <Banner/>
            <Suspense fallback={
                <div className="  container mt-5 text-center   justify-content-center">

                    <img className="moneda-carga" align="top" src={monedag}/><p className="">CARGANDO...</p>

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

