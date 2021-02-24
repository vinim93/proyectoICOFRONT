import React from 'react';
import moneda from "../../images/moneda.png";
import 'bootstrap/dist/css/bootstrap.css';


const Banner = () => {
    return (
        <div className="row fondogalaxy pb-md-5 pb-lg-5 pb-xl-5">
            <div className=" col-lg-7 parte col-md-7 col-12 ">
                <p className="moneda1 text-lg-left text-center">
                    SE PARTE DE NUESTRA <br/>
                    <p className=" revo1">REVOLUCION</p>
                    <p className="   tec1"><br/>TECNOLOGICA</p>
                    <img className="moneda d-block d-sm-block d-md-none" src={moneda}/>
                    <p className="  hometext1  d-none d-sm-none d-md-block"><br/>UNA NUEVA ERA DE EN EL MERCADO
                        DIGITAL,
                        <br/>basado en cadenas de bloques inteligentes
                        <br/>para el intercambio de tokens de utilidad. <br/></p>
                    <p className="  hometext1 text-left  text-sm-center d-block d-sm-block d-md-none"><br/>UNA
                        NUEVA ERA DE EN EL MERCADO <br/>
                        DIGITAL, basado en cadenas de <br/> bloques inteligentes
                        para el <br/>intercambio de tokens de utilidad. <br/></p>
                    <div className="text-lg-center text-left text-sm-center">

                        <button className="btn   btn-light-moon boton1  " data-toggle="modal"
                                data-target="#staticBackdrop">SE PARTE DE SUNSHINE
                        </button>
                    </div>

                </p>

            </div>
            <div className=" col-lg-5 col-md-5 d-none d-sm-none d-md-block co  contenedor">
                <img className="moneda  " src={moneda}/>
            </div>
        </div>
    );
};

export default Banner;