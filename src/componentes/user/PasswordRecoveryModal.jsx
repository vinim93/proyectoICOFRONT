import React, {useState, useEffect} from 'react';
import "firebase/auth";
import swal from 'sweetalert';
import "./css/styles.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {useHistory} from "react-router-dom";
import firebase from "firebase";
import SunshineFinder from "../../apis/SunshineFinder";

const PasswordRecoveryModal = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const submitRecovery = async e => {
        e.preventDefault();
        try{
            setLoading(true);
            const response = await SunshineFinder.post("/password-recovery", {
                email
            });
            sendMessage(response.data.codeResponse);
        } catch (e) {

        }
        setLoading(false);
    }

    const sendMessage = (res) => {
        switch (res) {
            case 'send':
                swal({
                    title: "Revisa tu correo electrónico!",
                    text: "Se envio un enlace a tu correo para reestablecer tu contraseña",
                    icon: "success",
                    button: "Entendido!",
                    closeOnClickOutside: false
                }).then(async confirm => {
                    if(confirm){
                        await document.getElementById("closeRecoveryModal").click();
                        await history.push("/Home");
                    }
                });
                break;

            case 'auth/user-not-found':
                swal({
                    title: "Revisa bien tu correo!",
                    text: "No se tiene un registro con el correo electrónico proporcionado",
                    icon: "warning",
                    button: "Entendido!",
                    closeOnClickOutside: false
                });
                break;

            case 'not-send':
                swal({
                    title: "No se pudo enviar el correo!",
                    text: "Prueba recargando la página o intentando de nuevo más tarde",
                    icon: "warning",
                    button: "Entendido!",
                    closeOnClickOutside: false
                });
                break;

            default:
                swal({
                    title: "Oops!",
                    text: "Ocurrio un error inesperado, recarga la página o intenta de nuevo más tarde",
                    icon: "error",
                    button: "Entendido!",
                    closeOnClickOutside: false
                });
        }
    }

    const sendRecoveryTwo = async (e) => {
        e.preventDefault();
        let actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://localhost:3000/Recovery',
            // This must be true.
            handleCodeInApp: true,

        };

        await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then((r) => {
                swal({
                    title: "Correo enviado",
                    text: "Se envió un correo de recuperación de cuenta",
                    icon: "success",
                    button: "Entendido!",
                    closeOnClickOutside: false
                });
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                // ...
            });


    }

    return (

        <div className="modal fade " id="recoveryModal" data-backdrop="static" data-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered pl-xl-5 pr-xl-5">
                <div className="modal-content registrobody pl-xl-5 pr-xl-5 ">

                    <div className="modal-header">
                        <h5 className="modal-title col-12" id="staticBackdropLabel">Recuperar contraseña</h5>
                        <button type="button" id="closeRecoveryModal" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body col-12 pl-xl-5 pr-xl-5">

                        <form className="form" onSubmit={sendRecoveryTwo}>
                            <div className="container mt-5 pl-xl-5 pr-xl-5">
                                <div className="row pl-xl-5 pr-xl-5">

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <TextField required={true}
                                                   fullWidth
                                                   style={{backgroundColor: "#FFFFFF", fontWeight: "bold"}}
                                                   className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                   id="email"
                                                   name="email"
                                                   value={email}
                                                   label="Correo electrónico"
                                                   type="text"
                                                   onChange={e => setEmail(e.target.value)} variant="filled"/>
                                    </div>

                                    <div className="form-group col-12 mt-4 mb-5">
                                        <button type="submit"
                                                className="btn btn-registro"
                                                id="signInButton"
                                                disabled={loading}>
                                            {loading ? (
                                                <div className="spinner-border text-dark" role="status">
                                                    <span className="sr-only">Entrando...</span>
                                                </div>
                                            ) : "ENTRAR"}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer col-12 btn-footer"></div>
                </div>

            </div>
        </div>

    );
};

export default PasswordRecoveryModal;