import React, {useState, useEffect} from "react";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import EquipoSunshine from "../../images/team.png";
import Footer from '../footer/Footer';
import Linkecontact from "../../images/linkecontact.svg";
import Twitercontact from "../../images/twitercontact.svg";
import {db} from "../config/firebase";
import './css/styles.css';
import { useTranslation } from 'react-i18next';
import ACCESIBILIDAD from '../../images/ACCESIBILIDAD.png';
import PRIVACIDAD from '../../images/PRIVACIDAD.png';
import SOLIDEZ from '../../images/SOLIDEZ.png';
import TRABAJOEQUIPO from '../../images/TRABAJO_EQUIPO.png';
import VIRY from '../../images/team/VIRY.jpg';
import JOSS from '../../images/team/JOS.jpg';
import CHRIS from '../../images/team/CHRIS.jpg';
import MANU from '../../images/team/MANU.jpg';
import CRIS from '../../images/team/CRIS.jpg';


const Acerca = () => {

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

    return (
        <div className="bg-light">

            <div className="container-fluid">
                <div className="row mt-5 mb-5 pt-5 pb-5 pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5 bg-about2">
                    <div className="col-12 mt-5 mb-5 pb-5">
                        <h1 className="text-center text-preview text-size-banner">
                            {t('AboutSection.Title')}
                        </h1>
                        <hr/>
                    </div>
                    <div className="col-12 mb-3">
                        <p className="text-center m-3 text-preview pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5" style={{fontSize: 30}}>
                            {t('AboutSection.Introduction.0')}
                        </p>
                        <p className="text-center pt-4 m-3 text-preview pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5" style={{fontSize: 30}}>
                            {t('AboutSection.Introduction.1')}
                        </p>
                    </div>

                    <div className="col-12 mt-3 mb-5 pb-5">
                        <p className="mt-3 text-center pl-5 pr-5 text-preview pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5" style={{fontSize: 30}}>
                            {t('AboutSection.Introduction.2')}
                        </p>
                    </div>

                </div>

                <div className="row mt-5 bg-light pb-5">
                    <div className="col-12 mt-5 bg-color-primary pt-4 pb-4">
                        <h1 className="text-size-title-differences text-center">{t('AboutSection.Differences.Title')}</h1>
                    </div>
                    {
                        differences.map((value, index) => (
                            <div id={index} className="col-12 col-sm-12 col-lg-4 col-xl-4 cont-diferencia pl-5 pr-5 text-justify">
                                <img src={value.image} alt="" className="img-fluid icons-differences w-50"/>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))
                    }

                    <div className="container2 mt-5">
                        <img src={EquipoSunshine} alt="Notebook" className="img-fluid"/>
                        <div className="centered">
                            <h1 className="display-4 font-weight-bold">
                                {t('AboutSection.Banner')}
                            </h1>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-fluid bg-light pb-5">

                <div className="container bg-light">
                    <div className="row pb-5">
                        {
                            team2.map((value, index) => (
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                    <div className="card text-light text-center mt-5 mb-5 bg-cards">

                                        <div className="card-img-top mt-5">
                                            <img className="rounded-circle img-fluid w-50" src={value.image} alt="Card image cap"/>
                                        </div>

                                        <div className="card-body mt-3 d-block">
                                            <h3 className="card-title mb-3">{value.name}</h3>
                                            <h6 className="card-subtitle mb-4">{value.career}</h6>
                                            <div style={{height: 120}}>
                                                <p className="card-text mb-4">{value.description}</p>
                                            </div>
                                        </div>
                                        <div className="card-body border-top">
                                            <div className="row">
                                                <div className="col-6">
                                                    <a href={value.social.linkedin} target="_blank">
                                                        <img src={Linkecontact} alt="face"/>
                                                    </a>
                                                </div>
                                                <div className="col-6">
                                                    <a href={value.social.twitter || "#"} className={value.social.twitter || "disabled"} target="_blank">
                                                        <img src={Twitercontact} alt="face"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <button className="btn bg-cards text-light btn-lg btn-block" data-toggle="modal"
                                    data-target="#staticBackdropcon">{t('AboutSection.ButtonText')}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <Footer/>
            </div>


        </div>


    )
}


export default Acerca;