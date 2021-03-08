import React from 'react';
import facil from "../../images/FACIL.png";
import Facilmovil from "../../images/facilmovil.svg";
import seguro from "../../images/seguro.png";
import Seguromovil from "../../images/seguromovil.svg";
import transp from "../../images/transparante.png";
import Transmovil from "../../images/transmovil.svg";
import Candado from "../../images/candado.svg";
import Mano from "../../images/mano_icon.svg";
import Escudo from "../../images/escudo.svg";

const Ventajas = () => {

    const ventajas = [
        {
            icon: Mano,
            title: "DE USO FÁCIL",
            description: "Diseño accesible para todos los Sunholders, creado para que sea práctico, cómodoy rápido poder adquirir el SUN"
        },
        {
            icon: Candado,
            title: "SEGURO",
            description: "Procesamiento confiable, el SUN está asentado sobre el protocolo de Blockchain Ethereum, lo que lo hace privado y a prueba de cualquier hackeo"
        },
        {
            icon: Escudo,
            title: "TRANSPARENTE",
            description: "En Sunshine estamos comprometidos a informar, explicar y justificar cada proyecto financiado con el SUN, aclarar las dudas de nuestros Sunholders y ser siempre claros y precisos brindando toda la información correspondiente a las inversiones"
        },
    ];

    return (
        <div className="row">
            {
                ventajas.map((value, index) => (
                    <div key={index} className="col-md-4 col-12 p-5">
                        <div className="col-12 d-flex justify-content-center mt-5">
                            <img src={value.icon} alt="FACIL" className="img-fluid"/>
                        </div>
                        <div className="col-12 d-flex justify-content-center mt-5 text-justify">
                            <h3>{value.title}</h3>
                        </div>
                        <div className="col-12 d-flex justify-content-center mt-2 text-justify">
                            <h5>{value.description}</h5>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Ventajas;