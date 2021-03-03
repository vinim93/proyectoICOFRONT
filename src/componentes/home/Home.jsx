import '../../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Footer from '../footer/Footer';
import Banner from "./Banner";
import Video from "./Video";
import Countdown from "./Countdown";
import Proyectos from "../proyectos/Proyectos";
import Soporte from "./Soporte";
import PreguntasFrecuentes from "./PreguntasFrecuentes";
import Newsletter from "./Newsletter";
import MapaApp from "./MapaApp";
import Ventajas from "./Ventajas";
import WhitepaperHome from "./WhitepaperHome";


const Home = () => {

    return (
        <div className="container-fluid" className="" >

            <Banner/>
            <Video/>
            <Countdown/>
            <WhitepaperHome />
            <Ventajas />
            <Proyectos />
            <MapaApp />
            <Soporte />
            <PreguntasFrecuentes />
            <Newsletter />
            <Footer/>


        </div>
    )
}


export default Home;

