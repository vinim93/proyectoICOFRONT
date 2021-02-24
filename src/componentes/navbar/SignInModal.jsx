import React, {useState} from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";
import firebase from 'firebase';
import "firebase/auth";
import {db} from '../config/firebase';
import swal from 'sweetalert';

const SignInModal = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        if(email !== "" && pass !== ""){
            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then((user) => {
                    console.log("SESION INICIADA");
                })
                .catch((error) => {
                    let errorCode = error.code;
                    switch (errorCode) {
                        case "auth/user-not-found":
                            swal("Usuario no encontrado", "La cuenta de correo proporcionada no esta registrada!", "warning");
                            break;

                        case "auth/wrong-password":
                            swal("Datos incorrectos", "La contraseña es incorrecta!", "warning");
                            break;

                        case "auth/invalid-email":
                            swal("Datos mal escritos", "Solo puedes ingresar una cuenta de correo válida!", "warning");
                            break;

                        default:
                            let errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                    }
                })
        } else {
            swal("No ingresaste datos", "Debes ingresar datos en los campos de usuario y contraseña!", "warning");
        }

    }

    return (
        <form className="form my-2 my-lg-0" onSubmit={signIn}>
            <div className="modal fade " id="signInModal" data-backdrop="static" data-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered   ">
                    <div className="modal-content registrobody ">

                        <div className="modal-header">
                            <h5 className="modal-title col-12" id="staticBackdropLabel">Tu cuenta</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="modal-body  col-12">

                                    <div className="form-group col-12 ">
                                        <button className="btn col-xl-5 col-lg-7 gmail">
                                            <img src={Icongmail} alt=""
                                                 className="icon-g img-fluid"/> Ingresa con Gmail
                                        </button>
                                    </div>

                                    <div className="form-group col-12 ">
                                        <button className="btn col-xl-5 col-lg-7 gmail">
                                            <img src={Iconfaceb} alt=""
                                                 className="icon-g img-fluid"/> Ingresa con Facebook
                                        </button>
                                    </div>

                                    <div className="form-group col-12 mt-5">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="email"
                                               placeholder="Usuario"
                                               value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               required
                                        />
                                    </div>

                                    <div className="form-group  col-12">
                                        <input className="btn col-xl-5 col-lg-7 form-regi gmail"
                                               type="password"
                                               id="signup-password"
                                               placeholder="Contraseña"
                                               name="password"
                                               value={pass}
                                               onChange={e => setPass(e.target.value)}
                                               required
                                        />
                                    </div>

                                    <div className="form-group col-12 mt-5 mb-5">
                                        <button type="submit"
                                                className="btn btn-registro">ENTRAR
                                        </button>
                                    </div>

                                </div>

                                <div className="modal-footer col-12 btn-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignInModal;