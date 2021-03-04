import React, {useState, useEffect} from "react";
import '../../App.css';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.css';
import EquipoSunshine from "../../images/team.png";
import Footer from '../footer/Footer';
import Linkecontact from "../../images/linkecontact.svg";
import Twitercontact from "../../images/twitercontact.svg";
import {db} from "../config/firebase";
import './css/styles.css';
import Navigation from "../navbar/Navigation";


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
        <div className="bg-light">
            <Navigation/>
            <div className="container-fluid pt-5">
                <div className="row mt-5" style={{height: 500}}>
                    <div className="col-12" >
                        <ReactPlayer width="100%" data-toggle="collapse" data-target=".navbar-collapse.show" height="100%" url='https://www.youtube.com/embed/UZvxWOiruss'/>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row mt-5 mb-5 pt-5 pb-5 pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5 bg-about2">
                    <div className="col-12 mb-3">
                        <p className="text-center m-3 text-preview pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5" style={{fontSize: 30}}>
                            Hemos desarrollado un token que va a permitirles a los inversionistas, ser parte de este mundo
                            financiero virtual, dando inicio a una nueva era tecnológica y la oportunidad de invertir en activos digitales
                        </p>
                        <p className="text-center pt-4 m-3 text-preview pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5" style={{fontSize: 30}}>
                            Dicho token lleva por nombre SUNSHINE IMAGINE
                        </p>
                    </div>

                    <div className="col-12 mt-3 mb-5 pb-5">
                        <p className="mt-3 text-center pl-5 pr-5 text-preview pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5" style={{fontSize: 30}}>
                            SUNSHINE es para los emprendedores, las personas que quieran ir un paso más adelante, para los que
                            no se conformen con poco, SUNSHINE es el futuro, es para quien desea grandeza, aquel que perdió el
                            miedo y decidió tomar el control de su vida.
                        </p>
                    </div>

                    <div className="col-12 mt-5 mb-5 pb-5">
                        <h1 className="text-center text-preview text-size-banner">
                            ASEGURA TU FUTURO, EMPIEZA HOY
                        </h1>
                        <hr/>
                    </div>

                </div>

                <div className="row mt-5 bg-light pb-5">
                    <div className="col-12 mt-5 bg-color-primary pt-4 pb-4">
                        <h1 className="text-size-title-differences text-center">¿QUÉ NOS DIFERENCIA?</h1>
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