import React, {useState} from 'react';
import "firebase/auth";
import swal from 'sweetalert';
import "./dashboard/css/styles.css";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";

const PasswordRecoveryModal = () => {

    const [email, setEmail] = useState("");

    const sendRecoveryTwo = async (e) => {
        e.preventDefault();
        let actionCodeSettings = {
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
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
            });


    }

    return (

        <div className="modal fade " id="recoveryModal" data-backdrop="static" data-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered pl-xl-5 pr-xl-5">
                <div className="modal-content registrobody pl-xl-5 pr-xl-5 ">

                    <div className="modal-header">
                        <h5 className="modal-title col-12" id="staticBackdropLabel">Recuperar contraseña</h5>
                        <button type="button" id="closeRecoveryModal" className="close" data-dismiss="modal"
                                aria-label="Close">
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
                                                disabled={false}>
                                            ENTRAR
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