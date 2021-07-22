import React from "react";
import Linkecontact from "../images/linkecontact.svg";
import Twitercontact from "../images/twitercontact.svg";

import '../sass/cards.scss';
import {useTranslation} from 'react-i18next';
import VIRY from '../images/team/VIRY.jpg';
import JOSS from '../images/team/JOS.jpg';
import CHRIS from '../images/team/CHRIS.jpg';
import MANU from '../images/team/MANU.jpg';
import CRIS from '../images/team/CRIS.jpg';
import {Carousel, onChange,} from "react-responsive-carousel";


const CardsWorkers = () => {
    const {t} = useTranslation();

    const team2 = [
        {
            image: VIRY,
            name: t('AboutSection.Team.Items.0.Name'),
            career: t('AboutSection.Team.Items.0.Career'),
            description: t('AboutSection.Team.Items.0.Description'),
            social: {
                linkedin: "https://mx.linkedin.com/in/viry-uribe-879b68163/",
                twitter: "https://twitter.com/home?lang=es"
            }
        },
        {
            image: JOSS,
            name: t('AboutSection.Team.Items.1.Name'),
            career: t('AboutSection.Team.Items.1.Career'),
            description: t('AboutSection.Team.Items.1.Description'),
            social: {
                linkedin: "https://www.linkedin.com/in/jocelyn-uribe-maldonado-720a90203/",
                twitter: "https://twitter.com/jocelyn_um"
            }
        },
        {
            image: CHRIS,
            name: t('AboutSection.Team.Items.2.Name'),
            career: t('AboutSection.Team.Items.2.Career'),
            description: t('AboutSection.Team.Items.2.Description'),
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: ""
            }
        },
        {
            image: MANU,
            name: t('AboutSection.Team.Items.3.Name'),
            career: t('AboutSection.Team.Items.3.Career'),
            description: t('AboutSection.Team.Items.3.Description'),
            social: {
                linkedin: "https://www.linkedin.com/in/jose-manuel-viniegra-molina-aab9a51a8/",
                twitter: "https://twitter.com/manuel87129931"
            }
        },
        {
            image: CRIS,
            name: t('AboutSection.Team.Items.4.Name'),
            career: t('AboutSection.Team.Items.4.Career'),
            description: t('AboutSection.Team.Items.4.Description'),
            social: {
                linkedin: "https://www.linkedin.com/in/cristian-augusto-armenta-garcia/",
                twitter: "https://twitter.com/CRISTIANAUGUS14"
            }
        }
    ]
    return (
        <div className="col-12 justify-content-center container-full-cards ">
            <h1 className="display-4 font-weight-bold titu-team   position-relative">
                {t('AboutSection.Banner')}
            </h1>
            <Carousel className="d-none d-md-flex " showArrows={true} infiniteLoop autoPlay
                      emulateTouch={true}
                      centerMode={true}
                      selectedItem={2}
                      showIndicators={false}
                      showThumbs={false}
                      showStatus={false}
                      centerSlidePercentage={25}
                      onChange={onChange}>
                {
                    team2.map((value, index) => (
                        <div id="cont-cards" className=" containercard ">


                            <div className="card-wrap-personal">
                                <div className="card-personal">
                                    <img className="card-bg-personal" alt="personal card img" src={value.image}></img>
                                    <div className="card-info-personal">
                                        <h1 className="card-titles" slot="header">{value.name}</h1>
                                        <h6 className="card-subtitle mb-4">{value.career}</h6>
                                        <p slot="content">{value.description}</p>
                                        <div className="row">
                                            <div className="col-6">
                                                <a href={value.social.linkedin} target="_blank" rel="noreferrer">
                                                    <img src={Linkecontact} alt="linkedin contact img" className="img-fluid"/>
                                                </a>
                                            </div>
                                            <div className="col-6">
                                                <a href={value.social.twitter || "#"}
                                                   className={value.social.twitter || "disabled"} target="_blank" rel="noreferrer">
                                                    <img src={Twitercontact} alt="twitter contact img" className="img-flui"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))
                }
            </Carousel>
        </div>
    )


}

export default CardsWorkers;
