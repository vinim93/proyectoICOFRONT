import React from 'react';
import Depmason from "../images/depmason.svg";
import Imgpreg from "../images/imgpreg.svg";
import Depmenos from "../images/depmenos.svg";
import Fade from 'react-reveal/Fade';
import {useTranslation} from 'react-i18next';

const PreguntasFrecuentes = () => {

    const {t} = useTranslation();

    const changeIcon = (imageID) => {
        let image = document.getElementById(imageID)
        if (image.src.match("on")) {
            image.src = Depmenos;
        } else {
            image.src = Depmason;
        }
    }

    const items = [
        {
            icon: Depmason,
            title: t('FAQ.Items.0.Title'),
            text: t('FAQ.Items.0.Text'),
            id: "myImageA"
        },
        {
            icon: Depmason,
            title: t('FAQ.Items.1.Title'),
            text: t('FAQ.Items.1.Text'),
            id: "myImageB"
        },

        {
            icon: Depmason,
            title: t('FAQ.Items.2.Title'),
            text: t('FAQ.Items.2.Text'),
            id: "myImageD"
        },
        {
            icon: Depmason,
            title: t('FAQ.Items.3.Title'),
            text: t('FAQ.Items.3.Text'),
            id: "myImageE"
        },
    ]

    return (
        <div className="row fondo-preg">
            <p className="frecprec">{t('FAQ.Title')}</p>
            <div className="col-lg-6 col-md-6 col-12 preguntas">

                {
                    items.map((value, index) => (
                        <div key={index}>
                            <Fade left cascade>
                                <p className="">
                                    <button className="btn btn-preg1" onClick={() => changeIcon(value.id)}
                                            type="button" data-toggle="collapse" data-target={"#" + value.id + "target"}
                                            aria-expanded="false" aria-controls="collapseExample">
                                        <img src={value.icon} id={value.id} alt="" className="mas"/>{value.title}
                                    </button>
                                </p>
                                <div className="collapse btn-res1 " id={value.id + "target"}>
                                    <div className="text-preg">
                                        {value.text}
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    ))
                }

            </div>

            <div className="col-md-6 col-12">
                <img src={Imgpreg} id="" className="PREGIMG d-none d-lg-block d-md-block"/>

            </div>

        </div>
    );
};

export default PreguntasFrecuentes;