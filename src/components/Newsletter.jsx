import React from 'react';
import Newlesters from "../images/newlesters.svg";
import {useTranslation} from 'react-i18next';

const Newsletter = () => {
    const {t} = useTranslation();

    return (
        <div className="d-none row text-center newlesterenvol">
            <div className="col-12 Newlester-con">
                <h1 className="titunew">{t('Newsletter.Title')}</h1>
                <img src={Newlesters} alt="Newsletter" className="new"/>
            </div>
        </div>
    );
};

export default Newsletter;
