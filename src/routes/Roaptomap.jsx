import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component, useEffect} from "react";
import Footer from '../components/Footer';
import DemoCarousel from '../components/Carousel.jsx';
import maparoad from '../images/road-map.png';
import monedafinal from "../images/monedafinal.png";
import {useTranslation} from 'react-i18next';
import lineascar from "../images/lineas.svg";
import {useAuth} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

const RoaptoMapa = () => {
    const {t} = useTranslation();
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    useEffect(() => {
        try {
            let email = currentUser.email;
            history.push("/");
        } catch (e) {}
    }, []);

    return (

        <div className=" road ">
            <div className="row ">
            <img  className="img-fluid linea-car-1 d-flex d-md-none"src={lineascar} alt="linacarrusel"/>
                <p className="text-roap-map  ">
                    <h1 align="center">ROAD MAP</h1>
                   
                    <p className="text-roap-1 d-none d-md-flex">{t('RoadToMap.0')}</p>
                    <p className="text-roap-2 d-none d-md-flex">{t('RoadToMap.1')}</p>
                    <p className="text-roap-3 d-none d-md-flex">{t('RoadToMap.2')}</p>
                    <p className="text-roap-4 d-none d-md-flex">{t('RoadToMap.3')}</p>
                    <p className="text-roap-5 d-none d-md-flex">{t('RoadToMap.4')}</p>
                    <p className="text-roap-6 d-none d-md-flex">{t('RoadToMap.5')}</p>
                    <p className="text-roap-7 d-none d-md-flex">{t('RoadToMap.6')}</p>
                    <p className="text-roap-8 d-none d-md-flex">{t('RoadToMap.7')}</p>
                    
                </p>
                
                <img src={maparoad} className=" d-none d-md-flex  maparoad " alt=""/>
                 
            </div>
           
<DemoCarousel/>
            <Footer/>
        </div>


    )
}


export default RoaptoMapa;