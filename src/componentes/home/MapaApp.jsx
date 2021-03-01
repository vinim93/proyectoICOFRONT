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
                <div className="">
                    <img src={Mapa} className=" mapaes "/>
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