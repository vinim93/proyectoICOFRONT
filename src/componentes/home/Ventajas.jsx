import React from 'react';
import facil from "../../images/FACIL.png";
import Facilmovil from "../../images/facilmovil.svg";
import seguro from "../../images/seguro.png";
import Seguromovil from "../../images/seguromovil.svg";
import transp from "../../images/transparante.png";
import Transmovil from "../../images/transmovil.svg";

const Ventajas = () => {
    return (
        <div className="  row ventajascont ">
            <div className="col-md-4 col-12 ventajas  p-0">
                <img src={facil} alt="FACIL" className="d-none d-md-block img-vent"/>
                <img src={Facilmovil} alt="FACIL" className="d-block d-md-none img-vent"/>
            </div>
            <div className="col-md-4   col-12 ventajas d-flex flex-row-reverse ventajas-seg p-0">
                <img src={seguro} alt="segurp" className="d-none d-md-block img-vent"/>
                <img src={Seguromovil} alt="FACIL" className="d-block d-md-none img-vent"/>
            </div>
            <div className="col-md-4 col-12 p-0   ventajas">
                <img src={transp} alt="transp.png" className="d-none d-md-block img-vent"/>
                <img src={Transmovil} alt="FACIL" className="d-block d-md-none img-vent"/>

            </div>
        </div>
    );
};

export default Ventajas;