import React, {useState, useEffect} from "react";


import EquipoSunshine from "../../images/team.png";
import Footer from '../footer/Footer';
import Linkecontact from "../../images/linkecontact.svg";
import Twitercontact from "../../images/twitercontact.svg";
import {db} from "../config/firebase";

import './css/cards.scss';
import  './css/animationcards.jsx';
import { useTranslation } from 'react-i18next';
import ACCESIBILIDAD from '../../images/Accesibilidad-01.png';
import PRIVACIDAD from '../../images/provacidad-04.png';
import SOLIDEZ from '../../images/solidez-02.png';
import TRABAJOEQUIPO from '../../images/trabajo en equipo-03.png';
import VIRY from '../../images/team/VIRY.jpg';
import JOSS from '../../images/team/JOS.jpg';
import CHRIS from '../../images/team/CHRIS.jpg';
import MANU from '../../images/team/MANU.jpg';
import CRIS from '../../images/team/CRIS.jpg';
import Roll from 'react-reveal/Roll';
import { Divider } from "@material-ui/core";
import { Carousel, showArrows, onChange, onClickItem, } from "react-responsive-carousel";



const Cardsworkers = () => {
    const { t } = useTranslation();
    const [team, setTeam] = useState([]);
    const [differencesItems, setDifferencesItems] = useState([]);

    const fetchData = async() => {
        const collections = ['team', 'differencesItems'];
        await collections.forEach(element => {
            db.collection(element)
                .get()
                .then(snapshot => {
                    let tempArray = [];
                    snapshot
                        .docs.forEach(item => {
                            tempArray.push(item.data());
                        });
                    //LA SIGUIENTE LINEA ES PARA GUARDAR LOS DATOS EN EL STATE CORRESPONDIENTE SEGUN CADA ELEMENTO DEL ARRAY "collections"
                    // EJ. setTeam(tempArray) , setDifferencesItems(tempArray), etc...
                    //NOTA: eval NO DEBERIA SER USADO PARA GUARDAR DATOS EN UNA COLECCION, AQUI SE USA PARA MOSTRAR DATOS EN EL LADO DEL CLIENTE SOLAMENTE
                    eval(`set${element.charAt(0).toUpperCase() + element.slice(1)}`)(tempArray);
                })
        });
    }

    useEffect(() => {
        //fetchData();
    }, []);


    const differences = [
        {
            image: ACCESIBILIDAD,
            title: t('AboutSection.Differences.Items.0.Title'),
            description: t('AboutSection.Differences.Items.0.Text')
        },
        {
            image: PRIVACIDAD,
            title: t('AboutSection.Differences.Items.1.Title'),
            description: t('AboutSection.Differences.Items.1.Text')
        },
        {
            image: SOLIDEZ,
            title: t('AboutSection.Differences.Items.2.Title'),
            description: t('AboutSection.Differences.Items.2.Text')
        },
        {
            image: TRABAJOEQUIPO,
            title: t('AboutSection.Differences.Items.3.Title'),
            description: t('AboutSection.Differences.Items.3.Text')
        }
    ];

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
    return(
       <div className="col-12 justify-content-center container-full-cards ">
             <h1 className="display-4 font-weight-bold titu-team   position-relative">
                                {t('AboutSection.Banner')}
                            </h1>
           <Carousel  className="d-none d-md-flex " showArrows={true} infiniteLoop autoPlay
            emulateTouch={true}
            centerMode={true}
            selectedItem={2}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            centerSlidePercentage={25}
             onChange={onChange}  >
            {
                            team2.map((value, index) => (
        <div id="cont-cards" className=" containercard ">
 
 
            <div className="card-wrap-personal">
          <div className="card-personal" >
          <img className="card-bg-personal" src={value.image}></img>
          <div className="card-info-personal">
            <h1  className="card-titles" slot="header">{value.name}</h1>
            <h6 className="card-subtitle mb-4">{value.career}</h6>
            <p slot="content">{value.description}</p>
            <div className="row">
            <div className="col-6">
                                                    <a href={value.social.linkedin} target="_blank">
                                                        <img src={Linkecontact} alt="face" className="img-fluid"/>
                                                    </a>
                                                </div>
                                                <div className="col-6">
                                                    <a href={value.social.twitter || "#"} className={value.social.twitter|| "disabled" } target="_blank">
                                                        <img src={Twitercontact} alt="face" className="img-flui"/>
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

export default Cardsworkers;
