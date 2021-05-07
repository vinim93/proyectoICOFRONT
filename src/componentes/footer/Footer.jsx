import React, {useState} from "react";
import '../../App.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';
import Sol from '../../images/sol.svg';
import Face from '../../images/face.svg';
import Gmail from '../../images/gmail.svg';
import Insta from '../../images/insta.svg';
import Linke from '../../images/linke.svg';
import Twiter from '../../images/twiter.svg';
import Youtube from '../../images/youtube.svg';
import Moneda2 from '../../images/modenasun2.svg';
import moneda from "../../images/moneda.png";
import {db} from '../config/firebase';
import 'firebase/firestore';
import * as emailjs from 'emailjs-com';
import monedafinal from "../../images/monedafinal.png";
import {useTranslation} from 'react-i18next';


const Footer = () => {

    const {t} = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_ndmas34",
            "template_jxdqfp9",
            ".form-cont",
            "user_At37nmOGM1SpkVgtRqHq2"
        );

        db.collection('contactos').add({
            nombre: name,
            email: email,
            comentarios: message,

        })
            .then(() => {
                alert('Gracias por contactarnos');
            })
            .catch((error) => {
                alert(error.message);
            });
        setName('');
        setEmail('');
        setMessage('');
    };

    return (

        <div className="  row  con-footer con-conecta">
            <div className="col-12 ">
                <a href="https://sunshine-imagine.com/">

                <img src={Sol} alt=""/>
                </a>

                <a href="https://www.facebook.com/Sunshine-Imagine-Cripto-115833410321279">
                    <img src={Face} alt=""/>
                </a>
               
                <a href="https://www.instagram.com/sunshine.imagine.cripto/">

                    <img src={Insta} alt=""/>
                </a>
                <img src={Linke} alt=""/>

                <a href="https://twitter.com/ImagineCripto">
                    <img src={Twiter} alt=""/>
                </a>

               {/* <img src={Youtube} alt=""/>*/}

                <div className=" col-12 foottitulo">

                    <button type="button" className="btn" data-toggle="modal"
                            data-target="#staticBackdropcon">
                        <h1>{t('ContactUs.Title')}
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                 className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path
                                    d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                <br/>
                            </svg>
                        </h1>
                    </button>

                    {/*---------------------------------------------------------------------------------------modal*------------------------------*/}
                    <div className="modal fade modal-fullscreen" id="staticBackdropcon" data-backdrop="static"
                         data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                         aria-hidden="true">
                        <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content modalfootcont">
                                <div className="modal-header ">
                                    <h5 className=" modal-title col-12 " id="staticBackdropLabel">{t('ContactUs.Extra.0')} <svg
                                        xmlns="http://www.w3.org/2000/svg" width="484.203" height="7.402"
                                        viewBox="0 0 484.203 7.402">
                                        <rect id="Rectángulo_187" data-name="Rectángulo 187" width="484.203"
                                              height="7.402" fill="#dbb80b"/>
                                    </svg> <p className="conectate "><br/>{t('ContactUs.Extra.1')}</p></h5>


                                    <button type="button" className="close" id="closeEmailModal" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="container">
                                    <div className="row ">
                                        <div className="col-md-6 modal-body">
                                            <img src={monedafinal} className="img-fluid d-none d-lg-block" alt=""/>
                                        </div>
                                        <div className="col-lg-4">
                                            <form className="form-cont" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control"
                                                           name="name"
                                                           value={name}
                                                           onChange={(e) => setName(e.target.value)}
                                                           placeholder={t('ContactUs.Form.Name')}/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" className="form-control"
                                                           name="email"
                                                           value={email}
                                                           onChange={(e) => setEmail(e.target.value)}
                                                           id="mail"
                                                           placeholder={t('ContactUs.Form.Email')}/>

                                                </div>
                                                <div className="form-group">
                                                  <textarea className="form-control"
                                                            name="message"
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            id="message"
                                                            placeholder={t('ContactUs.Form.Coments')}
                                                            rows="10"></textarea>

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary"
                                                            data-dismiss="modal">{t('ContactUs.Form.Close')}
                                                    </button>
                                                    <button type="submit" className="btn btn-primary">{t('ContactUs.Form.Send')}</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/*--------------------------------------------------------------------------------------------*/}
                </div>


                <img src={Moneda2} className="img-fluid" alt=""/>
            </div>


        </div>


    )

}

export default Footer;
