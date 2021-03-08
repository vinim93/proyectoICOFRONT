import React from 'react';
import {Link} from "react-router-dom";
import walpaper from "../../images/banner.svg";

const WhitepaperHome = () => {
    return (
        <div className=" row walp"data-toggle="collapse" data-target=".navbar-collapse.show">
            <div className="col-12">
                
                <Link to="./Pdf" target="">
                <h1 className="walp-text">LEE</h1>
                    <img src={walpaper} alt="" data-toggle="modal" className="walp-img ml-0 mr-0" id="pdfcon"/>
                    <p className="walp-descargar">Click para descargar pdf</p>
                </Link>
            </div>
        </div>
    );
};

export default WhitepaperHome;