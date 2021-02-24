import React from 'react';
import Newlesters from "../../images/newlesters.svg";

const Newsletter = () => {
    return (
        <div className="  row text-center newlesterenvol">
            <div className="col-12  Newlester-con">
                <h1 className="titunew">NEWSLETTER</h1>
                <img src={Newlesters} alt="" className="new "/>

            </div>
            <div className="col-12 newpara">
                <p className="">Cada semana los que se suscriban al boletín informativo recibirán un <br/>
                    artículo sobre las ICO, tokens, y el mundo de las criptomonedas.
                </p>
            </div>

        </div>
    );
};

export default Newsletter;