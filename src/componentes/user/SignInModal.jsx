import React, {useState} from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";
import "firebase/auth";
import swal from 'sweetalert';
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "./css/styles.css";
import GoogleButton from 'react-google-button'
import TextField from "@material-ui/core/TextField";

const SignInModal = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const {login} = useAuth();
    const {currentUser, logout} = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function signIn(e) {
        e.preventDefault()

        try {
            setLoading(true);
            await login(email, pass).then(r => {
                if(r.user.emailVerified){
                    history.push("/");
                    window.location.reload();
                } else {
                    logout();
                    let error = new Error("email_not_verified");
                    error.code = "email_not_verified";
                    throw error;
                }
            });
        } catch (error) {
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

                case "email_not_verified":
                    swal("Correo no verificado", "Revisa tu bandeja de entrada de tu correo y verifica tu cuenta!", "warning");
                    break;

                case "auth/too-many-requests":
                    swal("Cuenta desactivada", "El acceso a esta cuenta ha sido desactivada temporalmente debido a muchos intentos de inicio de sesión fallidos, Puedes recuperarla reestableciendo tu contraseña o puedes intentarlo más tarde!", "warning");
                    break;

                default:
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);
            }
        }

        setLoading(false)
    }

    return (

        <div className="modal fade " id="signInModal" data-backdrop="static" data-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered pl-xl-5 pr-xl-5">
                <div className="modal-content registrobody pl-xl-5 pr-xl-5 ">

                    <div className="modal-header">
                        <h5 className="modal-title col-12" id="staticBackdropLabel">Tu cuenta</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body col-12 pl-xl-5 pr-xl-5">

                        <div className="form-group col-12 d-flex justify-content-center">
                            <GoogleButton
                                label='Iniciar sesión con Google'
                                onClick={() => {
                                    console.log('Google button clicked')
                                }}
                                style={{width: 500, borderRadius: 3}}
                            />
                        </div>

                        <div className="form-group col-12 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">
                            <div className="container pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">
                                <div className="row pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">
                                    <button className="fb connect mr-xl-5 ml-xl-5">
                                        Iniciar sesión con Facebook
                                    </button>
                                </div>
                            </div>

                        </div>

                        <hr/>

                        <form className="form" onSubmit={signIn}>
                            <div className="container mt-5 pl-xl-5 pr-xl-5">
                                <div className="row pl-xl-5 pr-xl-5">

                                    <div
                                        className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

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

                                    <div className="input-group input-group-lg col-12  pl-xl-5 pr-xl-5">

                                        <TextField required={true}
                                                   fullWidth
                                                   style={{backgroundColor: "#FFFFFF", fontWeight: "bold"}}
                                                   className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                   id="signin-password"
                                                   label="Contraseña"
                                                   value={pass}
                                                   type="password"
                                                   onChange={e => setPass(e.target.value)} variant="filled"/>

                                    </div>


                                    <div className="form-group col-12 mt-5 mb-5">

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

export default SignInModal;