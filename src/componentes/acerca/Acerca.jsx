import React, {useState, useEffect} from "react";
import '../../App.css';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.css';
import EquipoSunshine from "../../images/team.png";
import Viridiana from "../../images/team/viridiana.jpeg";
import Footer from '../footer/Footer';
import Linkecontact from "../../images/linkecontact.svg";
import Twitercontact from "../../images/twitercontact.svg";
import {db} from "../config/firebase";


const Acerca = () => {

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
        fetchData();
    }, []);

    return (
        <div className="">
            <div className="container-fluid pt-5">
                <div className="row mt-5" style={{height: 500}}>
                    <div className="col-12">
                        <ReactPlayer width="100%" height="100%" url='https://www.youtube.com/watch?v=JqyDcDPi3jg&feature=youtu.be'/>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row mt-5 mb-5 pb-5">
                    <div className="col-12 mb-5">
                        <p className="text-center m-3" style={{fontSize: 20}}>
                            <strong>SUNSHINE</strong> ideó una solución la cual podría resultar beneficiosa y permitir
                            la evolución digital y tecnológica, el <strong>token ERC20</strong> que representa una
                            oportunidad a la libertad financiera.
                        </p>
                        <p className="text-center pt-3 m-3" style={{fontSize: 20}}>
                            El equipo SUN trabaja arduamente para garantizar el retorno de utilidad a
                            los <strong>Sunholders</strong>
                        </p>
                    </div>

                    <div className="col-12 mt-5 mb-5 pb-5">
                        <h3 className="mt-1 font-weight-bold display-3 text-center">NUESTRA MISIÓN</h3>
                        <p className="mt-3 text-center pl-5 pr-5" style={{fontSize: 20}}>
                            Garantizar el bienestar de todos los Sunholders mediante el análisis de la diversificación
                            de los diferentes proyectos y tener beneficios a futuro.
                        </p>
                    </div>

                </div>

                <div className="row mt-5 bg-light pb-5">
                    <div className="col-12 mt-5">
                        <h1 className="titu-dife text-center">¿QUÉ NOS DIFERENCIA?</h1>
                    </div>
                    {
                        differencesItems.map((value, index) => (
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
                                EQUIPO SUNSHINE
                            </h1>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-fluid bg-light pb-5">

                <div className="container bg-light">
                    <div className="row pb-5">
                        {
                            team.map((value, index) => (
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                    <div className="card text-light text-center mt-5 mb-5 bg-cards">

                                        <div className="card-img-top mt-5">
                                            <img className="rounded-circle img-fluid w-50" src={value.image} alt="Card image cap"/>
                                        </div>

                                        <div className="card-body mt-3">
                                            <h3 className="card-title mb-3">{value.name}</h3>
                                            <h6 className="card-subtitle mb-4">{value.career}</h6>
                                            <p className="card-text mb-4">{value.description}</p>
                                        </div>
                                        <div className="card-body border-top">
                                            <div className="row">
                                                <div className="col-6">
                                                    <a href={value.social.linkedin} target="_blank">
                                                        <img src={Linkecontact} alt="face"/>
                                                    </a>
                                                </div>
                                                <div className="col-6">
                                                    <a href={value.social.twitter} target="_blank">
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
                                    data-target="#staticBackdropcon">¿Te gustaria unirte a nuestro equipo?</button>
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