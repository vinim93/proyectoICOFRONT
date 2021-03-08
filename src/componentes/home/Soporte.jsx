import React from 'react';
import Openzepp from "../../images/zeppelin_icon.svg";
import Github from "../../images/github_icon.svg";
import 'bootstrap/dist/css/bootstrap.css';
import "./css/styles.css";


const Soporte = () => {

    const items = [
        {
            icon: Github,
            title: "GITHUB",
            text: "Plataforma web de alojamiento de repositorios de código fuente para el control de versiones"
        },
        {
            icon: Openzepp,
            title: "OPENZEPPELIN",
            text: "Permite crear contratos inteligentes de tipo ERC20, a través de una API estable, uno de sus principales objetivos es garantizar la seguridad de los contratos una vez que éstos se encuentren liberados."
        }
    ];

    return (
        <div className="row">
            <div className="col-12 fondoedi">
                <p className="text-soporte">
                    SOCIOS Y SOPORTE
                </p>
                <div className="row fondo-opa d-flex justify-content-center pb-5">
                {
                    items.map((value, index) => (
                            <div key={index} className="img-meto m-4 col-12 col-lg-4 col-md-4">
                                <img src={value.icon} className="img-fluid w-25 mt-1 mt-lg-5" alt=""/>
                                <h4 className="mt-3">{value.title}</h4>
                                <p className="mt-3 pl-xl-5 pr-xl-5 lead">
                                    {value.text}
                                </p>
                            </div>

                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default Soporte;