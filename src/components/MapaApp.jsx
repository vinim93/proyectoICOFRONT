import React from 'react';
import Textmoneda from "../images/textmoneda.svg";
import Nuestraapp from "../images/nuestraapp.svg";
import Google from "../images/google.png";
import Apple from "../images/apple.png";
import Mapa from "../images/mapacirculo.svg"
import Mapamini from "../images/mapacirculomini.svg"
import monedafinal from "../images/monedafinal.png";
import Boton1token from "../images/boton1token.svg";
import Boton2token from "../images/boton2token.svg";
import Boton3token from "../images/boton3token.svg";
import Boton4token from "../images/boton4token.svg";
import Boton5token from "../images/boton5token.svg";
import Fade from 'react-reveal/Fade';

import {useTranslation} from 'react-i18next';

const MapaApp = () => {

    const {t} = useTranslation();

    return (
        <>
            <Fade left>
                <div className="container-fluid mapacon">
                    <div className="row">
                        <div className="col-12">
                            <p className="dis-fondos">{t('MapaApp.Funding.Title')}</p>
                            <p className="dis-tokens">{t('MapaApp.Tokens.Title')}</p>
                            <img src={Mapa} alt="Map" className="mapaes d-none d-md-flex"/>
                            <img src={Mapamini} alt="Minimap" className="mapaes d-flex d-md-none"/>
                            <p className="por-syn">40% <br/><p className="por-syn2">{t('MapaApp.Funding.Symphony')}</p>
                            </p>
                            <p className="por-hawk">30% <br/><p className="por-hawk2">{t('MapaApp.Funding.Hawk')}</p>
                            </p>
                            <p className="por-lion">30% <br/><p className="por-lion2">{t('MapaApp.Funding.Lion')}</p>
                            </p>

                            <p className="por-reinversion">70% <br/><p
                                className="por-reinversion2">{t('MapaApp.Tokens.Reinvestment')}</p></p>
                            <p className="por-sunholders">27% <br/><p
                                className="por-sunholders2">{t('MapaApp.Tokens.Sunholders')}</p></p>
                            <p className="por-equipo">3% <br/><p
                                className="por-equipo2">{t('MapaApp.Tokens.SUNTeam')}</p>
                            </p>
                            <p className="text-center sun-usd">{t('MapaApp.Price')}</p>

                        </div>
                    </div>
                </div>
                <div className="container-fluid text-moneda pt-3 pb-5">
                    <div className="row">


                        <div className="col-12 d-none d-md-block">
                            <h1 className="titu-token text-center">{t('MapaApp.SunshineToken.Title')}</h1>
                            <p className="cont-text-moneda">
                                <img src={Textmoneda} alt="Coin" className=" col-6" align="left"/>
                                <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.0')}</p>
                                <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.1')}</p>
                                <p className="parrafos-tokens parra-3">{t('MapaApp.SunshineToken.Items.2')}</p>
                                <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.3')}</p>
                                <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.4')}</p>
                            </p>
                        </div>
                        <div className="col-12 cont-token d-block d-md-none ">
                            <h1 className="titu-token text-center">{t('MapaApp.SunshineToken.Title')}</h1>
                            <img src={monedafinal} alt="Final coin" className="img-token col-6" align="left"/>

                            <div id="accordion">

                                <div className="btn card-token card">
                                    <div>
                                        <a className="btn-img-token1 card-link " data-toggle="collapse"
                                           href="#collapseOne">
                                            <img alt="Button token" src={Boton1token} className="btn-img-token"/>
                                        </a>
                                    </div>
                                    <div id="collapseOne" className="collapse show position-absolute cont-text-token"
                                         data-parent="#accordion">
                                        <div className="card-body ">
                                            <p>{t('MapaApp.SunshineToken.Items.0')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn card-token card">
                                    <div>
                                        <a className="btn-img-token2 collapsed card-link" data-toggle="collapse"
                                           href="#collapseTwo">
                                            <img alt="Button token" src={Boton2token} className="btn-img-token"/>
                                        </a>
                                    </div>
                                    <div id="collapseTwo" className="collapse position-absolute cont-text-token"
                                         data-parent="#accordion">
                                        <div className="card-body">
                                            <p>{t('MapaApp.SunshineToken.Items.1')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn  card-token  card">
                                    <div>
                                        <a className="collapsed btn-img-token3 card-link" data-toggle="collapse"
                                           href="#collapseThree">
                                            <img alt="Button token" src={Boton3token} className="btn-img-token"/>
                                        </a>
                                    </div>
                                    <div id="collapseThree" className="collapse position-absolute cont-text-token "
                                         data-parent="#accordion">
                                        <div className="card-body">
                                            <p>{t('MapaApp.SunshineToken.Items.2')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn card-token card">
                                    <div>
                                        <a className="collapsed card-link" data-toggle="collapse" href="#collapsefour">
                                            <img alt="Button token" src={Boton4token}
                                                 className="btn-img-token btn-img-token4"/>
                                        </a>
                                    </div>
                                    <div id="collapsefour" className="collapse position-absolute cont-text-token"
                                         data-parent="#accordion">
                                        <div className="card-body">
                                            <p>{t('MapaApp.SunshineToken.Items.3')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn card-token card">
                                    <div>
                                        <a className="collapsed card-link" data-toggle="collapse" href="#collapsefive">
                                            <img alt="Button token" src={Boton5token}
                                                 className="btn-img-token btn-img-token5"/>
                                        </a>
                                    </div>
                                    <div id="collapsefive" className="collapse position-absolute cont-text-token "
                                         data-parent="#accordion">
                                        <div className="card-body">
                                            <p>{t('MapaApp.SunshineToken.Items.4')}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

                <div className="container-fluid textappcon ">
                    <div className="row">
                        <div className="col-12">
                            <p className=" text-titu-app">{t('MapaApp.AppDownload.Title')}<h2
                                className="text-center">{t('MapaApp.AppDownload.Subtitle')}</h2></p>
                            <div className=" ventajas-app d-none d-md-block">
                                <ul>
                                    <li>{t('MapaApp.AppDownload.Items.0')}</li>
                                    <li>{t('MapaApp.AppDownload.Items.1')}</li>
                                    <li>{t('MapaApp.AppDownload.Items.2')}</li>
                                </ul>
                            </div>
                            <p className="disponible-text">{t('MapaApp.AppDownload.Avaliable')}:</p>
                            <img src={Nuestraapp} alt="Our app" className="text-App-g"/>

                        </div>
                        <div className="col-12 goo-aple">

                            <img src={Google} alt="Google" className="img-goo"/>
                        </div>
                        <div className="col-12 goo-aple">

                            <img src={Apple} alt="Apple" className="img-aple d-flex"/>
                        </div>
                        <p className="constru-cartera">¡{t('MapaApp.AppDownload.Footer')}!</p>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default MapaApp;