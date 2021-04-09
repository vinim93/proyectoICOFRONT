import React, {useEffect, Component } from 'react';
import ReactDOM from "react-dom";
import monedag from "../../images/moneda2.gif";
import monedafinal from "../../images/monedafinal.png";
import 'bootstrap/dist/css/bootstrap.css';
import Zoom from 'react-reveal/Zoom';

import {useTranslation} from "react-i18next";
import ParticlesBackground from './particlesbackground';
import Fade from 'react-reveal/Fade';

const Banner  = () => {
    useEffect(() => {
        <ParticlesBackground />   
    }, []);
    
    
    
   
    const { t } = useTranslation();

    return (
       <div className="fondogalaxy" >
            <div className="position-absolute  particles-cont">
          

            <ParticlesBackground >   
            </ParticlesBackground>
        </div>
           

        <div className="row fondogalaxy pl-5 " >
        <Zoom top>
            <div className=" col-lg-7 parte col-md-7" >
                <p className="moneda1 text-lg-left ">
                    {t('Banner.Titulo.0')}
                    <p className="revo1">{t('Banner.Titulo.1')}</p>
                    <p className="tec1">{t('Banner.Titulo.2')}</p>
                    <img className="moneda d-block  d-md-none"  src={monedafinal}/>
                    <p className="  hometext1   d-none  d-md-block">
                        {t('Banner.Texto')}
                    </p>
                    <p className="hometext1 col-12 text-left  d-block  d-md-none">
                        {t('Banner.Texto')} </p>
                    <div className="text-lg-center text-left text-sm-center">

                        <button className="btn btn-light-moon btn-link boton1 disabled " 
                                role="button" data-toggle="modal">
                            {t('Banner.TextoBoton')}
                        </button>
                    </div>

                </p>

            </div>
            </Zoom>
           
            <div className=" col-lg-5 col-md-5 d-none col-sm-5 d-md-block   contenedor">

                <img className="moneda   "  src={monedag}/>

            </div>
            
           
        </div>
        </div>
    );
};

export default Banner;