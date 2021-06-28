import React, {useEffect} from 'react';
import Celsym from "../../images/celsym.svg";
import circulo1 from "../../images/circulo1.svg";
import Celhawk from "../../images/celhawk.svg";
import circulo2 from "../../images/circulo2.svg";
import Cellyon from "../../images/cellyon.svg";
import circulo3 from "../../images/circulo3.svg";
import Engranaje from "../../images/engranaje.svg";
import fococontorno from "../../images/fococontorno.svg";
import Engrane1 from "../../images/engrane1.svg";
import Engrane2 from "../../images/engrane2.svg";
import Engrane3 from "../../images/engrane3.svg";
import Engrane4 from "../../images/engrane4.svg";
import Engrane5 from "../../images/engrane5.svg";
import Engrane6 from "../../images/engrane6.svg";
import Engrane7 from "../../images/engrane7.svg";
import Zoom from 'react-reveal/Zoom';
import {useTranslation} from 'react-i18next';
import {useHistory} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

const Proyectos = () => {

    const {t} = useTranslation();
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    useEffect(() => {
        try {
            let email = currentUser.email;
            history.push("/");
        } catch (e) {}
    }, []);

    return (
        <div>
            
            <div className="row">
                <div className="col-12 sec6">
                    <span className="titulo6 ">{t('Projects.Title')}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 contenedor-engra  ">
                    <div className=" d-flex justify-content-start ">
                        <button className=" btn fap-btn2 " type="button" data-toggle="modal"
                                data-target="#bd-example-modal-lg">
                                   
                            <div className="modal fade modal-fullscreen bd-example-modal-lg" id="bd-example-modal-lg"
                                 data-backdrop="static" data-keyboard="false"
                                 tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog modal-xl modal-dialog-centered">
                                    <button hidden type="button" id="closeSynmphonyModal" className="close" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                <Zoom>
                                    <div className="modal-content  modal-sym ">
                                    
                                        <div className="modal-body row container-fluid ">

                                            <div className="col-12 col-xl-4">

                                                <img src={Celsym} alt="" className="modal-imgsym img-fluid "
                                                />
                                            </div>
                                            <div className="col-12 col-xl-8">

                                                 <span className="modal-titu">  {t('Projects.Symphony.ModalTitle')}
                                                     <p className="modal-text">({t('Projects.Symphony.Type')})
                                                         <p className="modal-cuerpo">
                                                            {t('Projects.Symphony.Text')}
                                                         </p>
                                                     </p>
                                                 </span>

                                            </div>
                                        </div>
                                        
                                    </div>
                                    </Zoom>
                                </div>
                            </div>
                            
                            <img src={circulo1} className="fap-btn2-1" alt=""/>
                            <svg className="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 width="70mm" height="70mm" viewBox="0 0 120 120">
                                <circle className="circle1" cx="60" cy="60" r="50"
                                        fill="transparent"/>
                            </svg>
                            <p className="textbtn2"> SYMPHONY</p></button>
                        <br/>
                        <div className="con-txtbtn">
                            <p className=" textsyn"><br/><br/><br/><br/>
                                <br/><br/><br/> {t('Projects.Symphony.ModalTitle')} <br/></p><p
                            className="mintext">({t('Projects.Symphony.Type')})</p>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center ">
                        <button className="btn  fap-btn3  " type="button" data-toggle="modal"
                                data-target=".bd-example-modal-lg3">
                            <div className="modal  fade modal-fullscreen bd-example-modal-lg3" tabIndex="-1" role="dialog"
                                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div
                                    className="modal-dialog modal-cont modal-dialog-centered modal-dialog-scrollable  modal-xl ">
                                    <div className=" modal-content p-0 modal-sym ">
                                        <div className="modal-body row container-fluid ">


                                            <div className="col-lg-4 col-12 justify-content-center">

                                                <img src={Celhawk} alt="" className="modal-imgsym img-fluid "
                                                />
                                            </div>
                                            <div className="col-lg-8 col-12">

                                                 <span className="modal-titu"> {t('Projects.Hawk.ModalTitle')}
                                                     <p className="modal-text">{t('Projects.Hawk.Type')}
                                                         <p className="modal-cuerpo">{t('Projects.Hawk.Text')}</p>
                                                     </p>
                                                 </span>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>


                            <img src={circulo2} className="fap-btn3-2" alt=""/>
                            <svg className="svg2" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 width="70mm" height="70mm" viewBox="0 0 120 120">
                                <circle cx="60" className="circle2" cy="60" r="50"
                                        fill="transparent"/>
                            </svg>
                            <p className="textbtn3"> HAWK</p></button>
                        <p className="textsyn2"><br/> <br/> <br/>{t('Projects.Hawk.ModalTitle')}</p><p
                        className=" mintext2">{t('Projects.Hawk.Type')}</p></div>


                    <div className="d-flex justify-content-end">

                        <button className="btn   fap-btn4"
                                type="button" data-toggle="modal"
                                data-target=".bd-example-modal-lg2">
                            <div className="modal  fade modal-fullscreen bd-example-modal-lg2" tabIndex="-1" role="dialog"
                                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-cont modal-xl">
                                    <div className=" modal-content modal-sym ">
                                        <div className="row container-fluid ">

                                            <div className="col-lg-3 col-12 cont-cel">

                                                <img src={Cellyon} alt="" className="modal-imgsym img-fluid"
                                                />
                                            </div>
                                            <div className="col-lg-9 col-12">

                                             <span className="modal-titu"> {t('Projects.Lion.ModalTitle')}
                                                 <p className="modal-text"> {t('Projects.Lion.Type')}<p
                                                     className="modal-cuerpo">
                                             {t('Projects.Lion.Text')}
                                             </p></p>

                                             </span>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <img src={circulo3} className="fap-btn4-3" alt=""/>
                            <svg className="svg3" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="70mm" height="70mm" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50"
                                        fill="transparent"/>
                            </svg>
                            <p className="textbtn4"> LION</p>

                        </button>
                        <p className="textsyn3"><br/>{t('Projects.Lion.ModalTitle')}</p><p
                        className=" mintext3">{t('Projects.Lion.Type')}</p>
                    </div>
                    <img src={Engranaje} alt="" className="engranaje engranejegris"/>

                    <div className="row">
                        <div className="col-6 focoenv-cont">
                            <img src={fococontorno} alt="foco" className="focoenv"/>
                            <img src={Engrane1} alt="" className="engrane1foc engranaje"/>
                            <img src={Engrane2} alt="" className="engrane2foc engranaje"/>
                            <img src={Engrane3} alt="" className="engrane3foc engranaje"/>
                            <img src={Engrane4} alt="" className="engrane4foc engranaje"/>
                            <img src={Engrane5} alt="" className="engrane5foc engranaje"/>
                            <img src={Engrane6} alt="" className="engrane6foc engranaje"/>
                            <img src={Engrane7} alt="" className="engrane7foc engranaje"/>

                        </div>
                    </div>

                </div>


            </div>
       
        </div>
    );
};

export default Proyectos;