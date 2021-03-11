import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from "react";
import Footer from '../footer/Footer';
import maparoad from '../../images/maparoad.svg';
import {useTranslation} from 'react-i18next';

const RoaptoMapa = () => {
    const {t} = useTranslation();

    return (

        <div className=" road ">
            <div className="row ">

                <p className="text-roap-map  ">
                    <h1 align="center">ROAD MAP</h1>
                    <p className="text-roap-1">{t('RoadToMap.0')}</p>
                    <p className="text-roap-2">{t('RoadToMap.1')}</p>
                    <p className="text-roap-3">{t('RoadToMap.2')}</p>
                    <p className="text-roap-4">{t('RoadToMap.3')}</p>
                    <p className="text-roap-5">{t('RoadToMap.4')}</p>
                    <p className="text-roap-6">{t('RoadToMap.5')}</p>
                    <p className="text-roap-7">{t('RoadToMap.6')}</p>
                    <p className="text-roap-8">{t('RoadToMap.7')}</p>
                </p>
                <img src={maparoad} className="img-fluid  maparoad " alt=""/>
            </div>
            <Footer/>
        </div>


    )
}


export default RoaptoMapa;