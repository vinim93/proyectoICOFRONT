import React from 'react';
import Wallet from "../../images/wallet.svg";
import Openzepp from "../../images/openzepp.svg";
import Github from "../../images/github.svg";
import Hardwallet from "../../images/hardwallet.svg";
import 'bootstrap/dist/css/bootstrap.css';


const Soporte = () => {
    return (
        <div className="row">
            <div className="col-12 fondoedi">
                <p className="text-soporte">
                    SOCIOS Y SOPORTE
                </p>
                <div className=" row fondo-opa">
                    <img src={Wallet} className="img-meto col-lg-4  col-md-4 col-12 "/>
                    <img src={Openzepp} className="img-meto col-lg-4  col-md-4 col-12"/>
                </div>


                <div className="row fondo-opa">
                    <img src={Github} className="img-meto col-12 col-lg-4  col-md-4  "/>

                    <img src={Hardwallet} className="img-meto col-lg-4  col-md-4 col-12 "/>
                </div>

            </div>
        </div>
    );
};

export default Soporte;