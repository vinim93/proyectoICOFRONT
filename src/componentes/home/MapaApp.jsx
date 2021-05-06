import React from 'react';
import Textmoneda from "../../images/textmoneda.svg";
import Nuestraapp from "../../images/nuestraapp.svg";
import Google from "../../images/google.png";
import Apple from "../../images/apple.png";
import Mapa from "../../images/mapacirculo.svg"
import Mapamini from "../../images/mapacirculomini.svg"
import monedafinal from "../../images/monedafinal.png";
import Boton1token from "../../images/boton1token.svg";
import Boton2token from "../../images/boton2token.svg";
import Boton3token from "../../images/boton3token.svg";
import Boton4token from "../../images/boton4token.svg";
import Boton5token from "../../images/boton5token.svg";
import Fade from 'react-reveal/Fade';

import {useTranslation} from 'react-i18next';

const MapaApp = () => {

    const {t} = useTranslation();

    return (
        <>
        <Fade left>
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
                <div className="col-12 d-none d-md-block">
                    <h1 className="titu-token text-center">{t('MapaApp.SunshineToken.Title')}</h1>
                    <p className="cont-text-moneda">
                        <img src={Textmoneda} className=" col-6" align="left"/>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.0')}</p>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.1')}</p>
                        <p className="parrafos-tokens parra-3">{t('MapaApp.SunshineToken.Items.2')}</p>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.3')}</p>
                        <p className="parrafos-tokens">{t('MapaApp.SunshineToken.Items.4')}</p>
                    </p>
                    
                </div>
                <div className="col-12 cont-token d-block d-md-none ">
                    <h1 className="titu-token text-center">{t('MapaApp.SunshineToken.Title')}</h1>
                    <img src={monedafinal} className=" img-token   col-6" align="left"/>
                    
                    <div id="accordion">

<div class="btn card-token card ">
  <div class="">
    <a class=" btn-img-token1 card-link " data-toggle="collapse" href="#collapseOne">
    <img src={Boton1token} className=" btn-img-token " />
    </a>
  </div>
  <div id="collapseOne" class="collapse show position-absolute cont-text-token " data-parent="#accordion">
    <div class="card-body ">
    <p className="">{t('MapaApp.SunshineToken.Items.0')}</p>
    </div>
  </div>
</div>

<div class="btn card-token card">
  <div class="">
    <a class="  btn-img-token2 collapsed card-link" data-toggle="collapse" href="#collapseTwo">
    <img src={Boton2token} className=" btn-img-token  " />
    </a>
  </div>
  <div id="collapseTwo" class="collapse position-absolute cont-text-token " data-parent="#accordion">
    <div class="card-body ">
    <p className="">{t('MapaApp.SunshineToken.Items.1')}</p>
    </div>
  </div>
</div>

<div class="btn  card-token  card">
  <div class="">
    <a class="collapsed btn-img-token3 card-link" data-toggle="collapse" href="#collapseThree">
    <img src={Boton3token} className=" btn-img-token  " />
    </a>
  </div>
  <div id="collapseThree" class="collapse position-absolute cont-text-token " data-parent="#accordion">
    <div class="card-body">
    <p className="">{t('MapaApp.SunshineToken.Items.2')}</p>
    </div>
  </div>
</div>

<div class="btn card-token card">
  <div class="">
    <a class="collapsed card-link" data-toggle="collapse" href="#collapsefour">
    <img src={Boton4token} className="btn-img-token btn-img-token4  " />
    </a>
  </div>
  <div id="collapsefour" class="collapse position-absolute cont-text-token " data-parent="#accordion">
    <div class="card-body">
    <p className="">{t('MapaApp.SunshineToken.Items.3')}</p>
    </div>
  </div>
</div>

<div class="btn card-token card">
  <div class="">
    <a class="collapsed card-link" data-toggle="collapse" href="#collapsefive">
    <img src={Boton5token} className=" btn-img-token btn-img-token5 " />
    </a>
  </div>
  <div id="collapsefive" class="collapse position-absolute cont-text-token " data-parent="#accordion">
    <div class="card-body">
    <p className="">{t('MapaApp.SunshineToken.Items.4')}</p>
    </div>
  </div>
</div>

</div>
                    
                    
                </div>
            </div>

            <div className="row textappcon ">
                <div className="col-12">
                    <p className=" text-titu-app">{t('MapaApp.AppDownload.Title')}<h2 className="text-center">{t('MapaApp.AppDownload.Subtitle')}</h2></p>
                    <div className=" ventajas-app d-none d-md-block">
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
            </Fade>
        </>
    );
};

export default MapaApp;