import React from 'react';
import {Link} from "react-router-dom";
import walpaper from "../../images/banner.svg";
import {useTranslation} from 'react-i18next';

const WhitepaperHome = () => {
    const {t} = useTranslation();

    return (
        <div className=" row walp"data-toggle="collapse" data-target=".navbar-collapse.show">
            <div className="col-12">
                
                <Link to="./Pdf" target="">
                <h1 className="walp-text">{t('Whitepaper.Read')}</h1>
                    <img src={walpaper} alt="" data-toggle="modal" className="walp-img ml-0 mr-0" id="pdfcon"/>
                    <p className="walp-descargar">{t('Whitepaper.Click')}</p>
                </Link>
            </div>
        </div>
    );
};

export default WhitepaperHome;