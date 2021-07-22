import fondocarro from "../images/fondo-carro.svg";
import fondocarro2 from "../images/fondo-carro2.svg";
import fondocarro3 from "../images/fondo-carro3.svg";
import fondocarro4 from "../images/fondo-carro4.svg";
import fondocarro5 from "../images/fondo-carro5.svg";
import fondocarro6 from "../images/fondo-carro6.svg";
import fondocarro7 from "../images/fondo-carro7.svg";
import fondocarro8 from "../images/fondo-carro8.svg";

import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useTranslation} from 'react-i18next';
import {Carousel, onChange, onClickItem, onClickThumb} from "react-responsive-carousel";
import "../css/carrousel.css";


const DemoCarousel = () => {
    const {t} = useTranslation();
    return (

        <Carousel className="d-block  d-md-none" showArrows={true} infiniteLoop autoPlay
                  emulateTouch={true}
                  transitionTime={600} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>

            <div className="cont-car-carrusel ">
                <img className="img-fluid" alt="Fondocarro" src={fondocarro}/>


                <p className="legend">{t('RoadToMap.0')}</p>
            </div>
            <div className="cont-car-carrusel ">
                <img className="img-fluid" alt="Fondocarro3" src={fondocarro3}/>
                <p className="legend">{t('RoadToMap.1')}</p>
            </div>
            <div className="cont-car-carrusel ">
                <img className=" img-fluid" alt="Fondocarro2" src={fondocarro2}/>
                <p className="legend">{t('RoadToMap.2')}</p>
            </div>
            <div className="cont-car-carrusel">
                <img className="img-fluid" alt="Fondocarro3" src={fondocarro4}/>
                <p className="legend">{t('RoadToMap.3')}</p>
            </div>
            <div className="cont-car-carrusel ">
                <img className="img-fluid" alt="Fondocarro4" src={fondocarro5}/>
                <p className="legend">{t('RoadToMap.4')}</p>
            </div>
            <div className="cont-car-carrusel">
                <img className="img-fluid" alt="Fondocarro5" src={fondocarro6}/>
                <p className="legend">{t('RoadToMap.5')}</p>
            </div>
            <div className="cont-car-carrusel">

                <img alt="Fondocarro6" src={fondocarro7}/>
                <p className="legend">{t('RoadToMap.6')}</p>
            </div>
            <div className="cont-car-carrusel">

                <img className="img-fluid"  alt="Fondocarro7"src={fondocarro8}/>
                <p className="legend">{t('RoadToMap.7')}</p>
            </div>
        </Carousel>
    );
}


export default DemoCarousel;