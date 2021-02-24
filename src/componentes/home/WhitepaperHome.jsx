import React from 'react';
import {Link} from "react-router-dom";
import walpaper from "../../images/banner.svg";

const WhitepaperHome = () => {
    return (
        <div className=" row walp">
            <div className="col-12">
                <Link to="./Pdf" target="">
                    <img src={walpaper} alt="" data-toggle="modal" className="walp-img ml-0 mr-0" id="pdfcon"/>
                </Link>
            </div>
        </div>
    );
};

export default WhitepaperHome;