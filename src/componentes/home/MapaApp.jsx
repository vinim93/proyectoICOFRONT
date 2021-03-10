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
                    <h1 className="titu-token text-center">token sunshine</h1>
                    <p className="cont-text-moneda" >
                    <img src={Textmoneda} className="img-fluid img-token col-6" align="left"/>
                    <p className="parrafos-tokens">Token compatible, interoperable y  reutilizable dentro de diversas 
                        aplicaciones, billeteras y exchange, propiedades heredadas del  estándar 
                        ERC-20 bajo el cual fue  creado.</p>
                        <p className="parrafos-tokens">Utilizan "gas" para cubrir las tarifas de transacción.
El Gas es, dicho de una forma simple, el precio que se tiene que pagar al realizar una operación en la red de Ethereum.</p>
<p className="parrafos-tokens parra-3">
    Se alojan en el blockchain de Etherum, a  diferencia de otras criptomonedas que se alojan en sus 
    respectiva blockchain. </p>
                             
                        <p className="parrafos-tokens  ">
                        Desarrollado con Solidity,  lenguaje de programación diseñado para  ejecutar Smart 
                        contracts de manera óptima en la máquina virtual de Etherum (EVM).
                        </p>
                        <p className="parrafos-tokens    ">Utiliza la API estable de OpenZeppelin, las cuales verifican 
                        que los contratos presenten brechas de seguridad o puntos débiles que puedan ser explotados.</p>
                    </p>
                </div>
            </div>

            <div className="row textappcon ">
                <div className="col-12">
                    <p className=" text-titu-app">próximamente <h2 className="text-center">nuestra app</h2></p>
                    <div className=" ventajas-app">
                       <ul className="">
                           <li>Tú cartera disponible donde y cuando quieras</li>
                           <li>Revisa tu saldo todo el tiempo</li>
                           <li>Mantente conectado</li>
                       </ul>
                    </div>
                    <p className="  disponible-text">Disponible para:</p>
                    <img src={Nuestraapp} className="d-none d-sm-block text-App-g "/>
                    <img src={Nuestraapp} className="d-block d-sm-none  text-App"/>
                    
                </div>
                <div className="col-12 goo-aple">
                
                    <img src={Google} className="img-goo"/>
                </div>
                <div className="col-12 goo-aple">

                    <img src={Apple} className="img-aple d-flex "/>
                </div>
                <p className=" constru-cartera ">¡construye una cartera!</p>
            </div>
        </>
    );
};

export default MapaApp;