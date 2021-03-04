import React from 'react';
import monedag from "../../images/moneda.gif";

import monedafinal from "../../images/monedafinal.png";
import 'bootstrap/dist/css/bootstrap.css';


const Banner = () => {
    return (
        <div className="row fondogalaxy ">
            <div className=" col-lg-7 parte col-md-7   ">
                <p className="moneda1 text-lg-left text-center">
                    SE PARTE DE NUESTRA <br/>
                    <p className=" revo1">REVOLUCION</p>
                    <p className="   tec1"><br/>TECNOLOGICA</p>
                    <img className="moneda d-block  d-md-none" loading="lazy" src={monedafinal}/>
                    <p className="  hometext1  d-none  d-md-block"><br/>UNA NUEVA ERA DE EN EL MERCADO
                        DIGITAL,
                        <br/>basado en cadenas de bloques inteligentes
                        <br/>para el intercambio de tokens de utilidad. <br/></p>
                    <p className="hometext1 text-left  text-sm-center d-block  d-md-none"><br/>UNA
                        NUEVA ERA DE EN EL MERCADO <br/>
                        DIGITAL, basado en cadenas de <br/> bloques inteligentes
                        para el <br/>intercambio de tokens de utilidad. <br/></p>
                    <div className="text-lg-center text-left text-sm-center">

                        <button className="btn btn-light-moon boton1 disabled " disabled="disabled" aria-disabled="true" role="button"data-toggle="modal"
                                >SE PARTE DE SUNSHINE
                        </button>
                    </div>

                </p>

            </div>
            <div className=" col-lg-5 col-md-5 d-none col-sm-5 d-md-block   contenedor">
        
                <img className="moneda   " loading="lazy" src={monedag}/>
               
            </div>
        </div>
    );
};

export default Banner;