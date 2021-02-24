import '../../App.css';
import ReactPlayer from 'react-player';
import Accesibiilidad from '../../images/accesibilidad.svg';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Flechas from '../../images/flechas.svg';
import Privacidad from '../../images/privacidad.svg';
import Redtopeer from '../../images/redtopeer.svg';
import Solidez from '../../images/solidez.svg';
import Garantia from '../../images/garantia.svg';
import Trabajoequipo from '../../images/trabajoequipo.svg';
import EquipoSunshine from "../../images/team.png";
import Footer from '../footer/Footer';
import Linkecontact from "../../images/linkecontact.svg";
import Twitercontact from "../../images/twitercontact.svg";


const Acerca = () => {

    const team = [
        {
            image: "https://bootstrapmade.com/demo/templates/Mamba/assets/img/team/team-1.jpg",
            name: "Jocelyn Uribe",
            career: "Community Manager",
            description: "Creación de contenido en RRSS.\n Monitoreo de los contenidos en redes sociales.\n Gestión y planificación de las acciones de comunicación.",
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: "https://twitter.com/AhtziriSunshine"
            }
        },

        {
            image: "https://bootstrapmade.com/demo/templates/Mamba/assets/img/team/team-2.jpg",
            name: "Jocelyn Uribe",
            career: "Community Manager",
            description: "Creación de contenido en RRSS.\n Monitoreo de los contenidos en redes sociales.\n Gestión y planificación de las acciones de comunicación.",
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: "https://twitter.com/AhtziriSunshine"
            }
        },

        {
            image: "https://bootstrapmade.com/demo/templates/Mamba/assets/img/team/team-3.jpg",
            name: "Jocelyn Uribe",
            career: "Community Manager",
            description: "Creación de contenido en RRSS.\n Monitoreo de los contenidos en redes sociales.\n Gestión y planificación de las acciones de comunicación.",
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: "https://twitter.com/AhtziriSunshine"
            }
        },

        {
            image: "https://bootstrapmade.com/demo/templates/Mamba/assets/img/team/team-4.jpg",
            name: "Jocelyn Uribe",
            career: "Community Manager",
            description: "Creación de contenido en RRSS.\n Monitoreo de los contenidos en redes sociales.\n Gestión y planificación de las acciones de comunicación.",
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: "https://twitter.com/AhtziriSunshine"
            }
        },

        {
            image: "https://bootstrapmade.com/demo/templates/Presento/assets/img/team/team-3.jpg",
            name: "Jocelyn Uribe",
            career: "Community Manager",
            description: "Creación de contenido en RRSS.\n Monitoreo de los contenidos en redes sociales.\n Gestión y planificación de las acciones de comunicación.",
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: "https://twitter.com/AhtziriSunshine"
            }
        },

        {
            image: "https://bootstrapmade.com/demo/templates/Presento/assets/img/team/team-4.jpg",
            name: "Jocelyn Uribe",
            career: "Community Manager",
            description: "Creación de contenido en RRSS.\n Monitoreo de los contenidos en redes sociales.\n Gestión y planificación de las acciones de comunicación.",
            social: {
                linkedin: "https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/",
                twitter: "https://twitter.com/AhtziriSunshine"
            }
        },
    ];

    const differences = [
        {
            image: `${Accesibiilidad}`,
            title: "ACCESIBILIDAD",
            description: "Cualquier persona mayor de edad tiene acceso a la compra de SUN, Sunshine puede ser tu primer acercamiento a un servicio financiero seguro.",
        },
        {
            image: `${Privacidad}`,
            title: "PRIVACIDAD",
            description: "Sunshine nunca compartirá tus datos personales, datos de tus inversiones ni cualquier tipo de información, ya que el SUN corre por la Blockchain Ethereum cada movimiento que realices será privado y anónimo.",
        },
        {
            image: `${Redtopeer}`,
            title: "RED PEER-TO-PEER\n",
            description: "No es necesario ningún tipo de intermediario para que puedas realizar transacciones o compras.",
        },
        {
            image: `${Solidez}`,
            title: "SOLIDEZ",
            description: "El SUN es un token descentralizado pues ningún gobierno ni banco tiene poder sobre él, Sunshine se distingue por la planificación estratégica que le da a sus recursos, y por el equipo responsable y comprometido que la conforma.",
        },
        {
            image: `${Garantia}`,
            title: "GARANTÍA",
            description: "Sunshine garantiza retorno de inversión seguro una vez que los proyectos comiencen a ponerse en marcha, o en su defecto, garantiza el 100% de la devolución de la inversión en caso de que el proyecto no logre su alcance.",
        },
        {
            image: `${Trabajoequipo}`,
            title: "TRABAJO EN EQUIPO\n",
            description: "Juntos seremos el mejor equipo, y así podremos consolidar el éxito juntos, basados en el trabajo del equipo Sunshine y el compromiso que tenemos con cada uno de nuestros Sunholders.",
        },
    ];

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
                        differences.map((value, index) => (
                            <div id={index} className="col-12 col-sm-12 col-lg-4 col-xl-4 cont-diferencia pl-5 pr-5 text-justify">
                                <img src={value.image} alt="" className="img-fluid icons-differences"/>
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
                            <button className="btn bg-cards text-light btn-lg btn-block">¿Te gustaria unirte a nuestro equipo?</button>
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