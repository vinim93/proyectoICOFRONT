import React from 'react';
import Newlesters from "../../images/newlesters.svg";
import {useTranslation} from 'react-i18next';

const Newsletter = () => {

    const {t} = useTranslation();

    return (
        <div className="  row text-center newlesterenvol">
            <div className="col-12  Newlester-con">
                <h1 className="titunew">{t('Newsletter.Title')}</h1>
                <img src={Newlesters} alt="" className="new "/>

            </div>
            {/*
            <div className="col-12 newpara">
                <p className="pl-5 pr-5 pb-5">
                    {t('Newsletter.Text')}
                </p>
            </div>*/}

        </div>
    );
};

export default Newsletter;