import React from 'react';
import Textmoneda from "../../images/textmoneda.svg";
import Nuestraapp from "../../images/nuestraapp.svg";
import Google from "../../images/google.png";
import Apple from "../../images/apple.png";
import Mapa from "../../images/mapacirculo.svg"

const MapaApp = () => {
    return (
        <>
            <div className="row mapacon">
                <div className="col-12">
                    <p className="dis-fondos">Distribución de fondos</p>
                    <p className="dis-tokens">Distribución de tokens</p>
                    <img src={Mapa} className=" mapaes "/>
                    <p className="por-syn">40% <br/><p className="por-syn2">Symphony</p></p>
                    <p className="por-hawk">30% <br/><p className="por-hawk2">Hawk</p></p>
                    <p className="por-lion">30% <br/><p className="por-lion2">Lion</p></p>

                    <p className="por-reinversion">70% <br/><p className="por-reinversion2">Reinversión</p></p>
                    <p className="por-sunholders">27% <br/><p className="por-sunholders2">Sunholders</p></p>
                    <p className="por-equipo">3% <br/><p className="por-equipo2">Equipo Sun</p></p>
                    <p className="text-center sun-usd">El costo inicial del SUN es de 1 USD</p>
                    
                </div>
            </div>
            <div className="row text-moneda pt-3 pb-5">
                <div className="col-12">
                    <img src={Textmoneda} className="img-fluid "/>
                </div>
            </div>

            <div className="row textappcon ">
                <div className="col-12">
                    <img src={Nuestraapp} className="d-none d-sm-block text-App-g "/>
                    <img src={Nuestraapp} className="d-block d-sm-none  text-App"/>

                </div>
                <div className="col-12 goo-aple">
                    <img src={Google} className="img-goo"/>
                </div>
                <div className="col-12 goo-aple">

                    <img src={Apple} className="img-aple"/>
                </div>
            </div>
        </>
    );
};

export default MapaApp;