import React from 'react';
import Candado from "../../images/candado.svg";
import Mano from "../../images/mano_icon.svg";
import Escudo from "../../images/escudo.svg";
import {useTranslation} from "react-i18next";

const Ventajas = () => {

    const { t } = useTranslation();

    const ventajas = [
        {
            icon: Mano,
            title: t('Ventajas.Facil.Titulo'),
            description: t('Ventajas.Facil.Texto')
        },
        {
            icon: Candado,
            title: t('Ventajas.Seguro.Titulo'),
            description: t('Ventajas.Seguro.Texto')
        },
        {
            icon: Escudo,
            title: t('Ventajas.Transparente.Titulo'),
            description: t('Ventajas.Transparente.Texto')
        },
    ];

    return (
        <div className="row">
            {
                ventajas.map((value, index) => (
                    <div key={index} className="  col-md-4 ventajas-cuerpo d-none d-md-block">
                        <div className="col-12  d-flex justify-content-center mt-5  ">
                            <img src={value.icon} alt="FACIL" className="img-fluid"/>
                        </div>
                        <div className="col-12 d-flex justify-content-center mt-5 text-justify ">
                            <h3>{value.title}</h3>
                        </div>
                        <div className="col-12 d-flex justify-content-center mt-2 text-justify ">
                            <h5>{value.description}</h5>
                        </div>
                    </div>
                    
                   
                ))
            }
             <div className=" ">
            
                 
                 {ventajas.map((value, index)=>(
                      <div className={index%2===0 ?" ventajas-cuerpo-min p-0 d-flex d-md-none":" justify-content-end ventajas-cuerpo-min p-0  d-flex d-md-none"}>
                     <div key={index} className={index%2===0 ? "col-10 p-0 mt-3  ventajas-cuerpo-index d-flex   d-md-none":"ventajas-cuerpo-index2  p-0 col-10  mt-3    d-flex d-md-none"}>
                         <div className=" col-2">                  
                             <img src={value.icon} alt="FACIL" className="img-fluid  "/>                            
                         </div>
                         <div className="col-10 text-left">
                         <h3 className="titu-ventajas">{value.title}</h3>
                             <p className="">{value.description}</p>
                         </div>
                       
                     </div>
                     </div>
                 ))}
             </div>
           
        </div>
    );
};

export default Ventajas;