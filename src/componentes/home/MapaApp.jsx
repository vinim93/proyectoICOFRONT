import React from 'react';
import Textmoneda from "../../images/textmoneda.svg";
import Nuestraapp from "../../images/nuestraapp.svg";
import Google from "../../images/google.png";
import Apple from "../../images/apple.png";
import Mapa from "../../images/mapacirculo.svg"
import Mapamini from "../../images/mapacirculomini.svg"
import {useTranslation} from 'react-i18next';

const MapaApp = () => {

    const {t} = useTranslation();

    return (
        <>
            <div className="row mapacon">
                <div className="col-12">
                    <p className="dis-fondos">{t('MapaApp.Funding.Title')}</p>
                    <p className="dis-tokens">{t('MapaApp.Tokens.Title')}</p>
                    <img src={Mapa} className=" mapaes d-none d-md-flex"/>
                    <img src={Mapamini} className=" mapaes d-flex d-md-none"/>
                    <p className="por-syn">40% <br/><p className="por-syn2">{t('MapaApp.Funding.Symphony')}</p></p>
                    <p className="por-hawk">30% <br/><p className="por-hawk2">{t('MapaApp.Funding.Hawk')}</p></p>
                    <p className="por-lion">30% <br/><p className="por-lion2">{t('MapaApp.Funding.Lion')}</p></p>

                    <p className="por-reinversion">70% <br/><p className="por-reinversion2">{t('MapaApp.Tokens.Reinvestment')}</p></p>
                    <p className="por-sunholders">27% <br/><p className="por-sunholders2">{t('MapaApp.Tokens.Sunholders')}</p></p>
                    <p className="por-equipo">3% <br/><p className="por-equipo2">{t('MapaApp.Tokens.SUNTeam')}</p></p>
                    <p className="text-center sun-usd">{t('MapaApp.Price')}</p>

                </div>
            </div>
            <div className="row text-moneda pt-3 pb-5">
                <div className="col-12">
                    <h1 className="titu-token text-center">{t('MapaApp.SunshineToken.Title')}</h1>
                    <p className="cont-text-moneda">
                        <img src={Textmoneda} className="img-fluid img-token col-6" align="left"/>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.0')}</p>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.1')}</p>
                        <p className="parrafos-tokens parra-3">{t('MapaApp.SunshineToken.Items.2')}</p>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.3')}</p>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.4')}</p>
                    </p>
                </div>
            </div>

            <div className="row textappcon ">
                <div className="col-12">
                    <p className=" text-titu-app">{t('MapaApp.AppDownload.Title')}<h2 className="text-center">{t('MapaApp.AppDownload.Subtitle')}</h2></p>
                    <div className=" ventajas-app">
                        <ul className="">
                            <li>{t('MapaApp.AppDownload.Items.0')}</li>
                            <li>{t('MapaApp.AppDownload.Items.1')}</li>
                            <li>{t('MapaApp.AppDownload.Items.2')}</li>
                        </ul>
                    </div>
                    <p className="  disponible-text">{t('MapaApp.AppDownload.Avaliable')}:</p>
                    <img src={Nuestraapp} className=" text-App-g "/>
                    

                </div>
                <div className="col-12 goo-aple">

                    <img src={Google} className="img-goo"/>
                </div>
                <div className="col-12 goo-aple">

                    <img src={Apple} className="img-aple d-flex "/>
                </div>
                <p className=" constru-cartera ">¡{t('MapaApp.AppDownload.Footer')}!</p>
            </div>
        </>
    );
};

export default MapaApp;