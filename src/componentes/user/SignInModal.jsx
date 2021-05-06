import React, {useState} from 'react';
import "firebase/auth";
import swal from 'sweetalert';
import {useAuth} from "../contexts/AuthContext";
import {NavLink, useHistory} from 'react-router-dom';
import "./css/styles.css";
import GoogleButton from 'react-google-button'
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import firebase from 'firebase';
import {auth, db} from "../config/firebase";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';

const SignInModal = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const {login, currentUser, logout} = useAuth();
    const [verifiedCaptcha, setVerifiedCaptcha] = useState(false);
    const [loading, setLoading] = useState(false);


    const searchDataInFirestore = async id => {
        let result = null;
        await db.collection('credentials').doc(id).get().then(doc => {
            result = doc.exists ? "exists" : "not-exists";
        }).catch(error => {
            result = "error";
            console.log("ERROR AL BUSCAR EL UID");
        });
        return result;
    }

    const saveDataInFirestore = (uid, data = {}) => {
        if (Object.keys(data).length > 0) {
            /*============GUARDAR DATOS EN FIRESTORE CON GOOGLE===========*/
            db.collection("credentials").doc(uid).set({
                UUID: uid,
                city: data.city.replace(/<[^>]+>/g, ''),
                doc: "Pending".replace(/<[^>]+>/g, ''),
                email: data.email.replace(/<[^>]+>/g, ''),
                name: data.name.replace(/<[^>]+>/g, ''),
                phone: data.phone === null ? "Pending".replace(/<[^>]+>/g, '') : data.phone.replace(/<[^>]+>/g, ''),
                authType: data.authType.replace(/<[^>]+>/g, ''),
                birthday: data.birthday.replace(/<[^>]+>/g, ''),
                country: data.country.replace(/<[^>]+>/g, ''),
                state: data.state.replace(/<[^>]+>/g, ''),
                address: data.address.replace(/<[^>]+>/g, ''),
                suns: 0,
                countryComplete: data.countryComplete.replace(/<[^>]+>/g, ''),
                profileStatus: data.profileStatus,
                addressToken: "",
                privateKey: "",
                fileType: "".replace(/<[^>]+>/g, ''),
                profilePicture: "".replace(/<[^>]+>/g, ''),
                profilePictureStatus: 0,
            }).then(docRef => {
                history.push("/");
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        }
    }

    const signUpWithGoogle = () => {

        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        auth.languageCode = 'es';
        auth.signInWithPopup(provider).then(async (result) => {
            console.log(result);
            let user = result.user;
            console.log(user.uid);
            if (user.emailVerified) {

                let userStatus = await searchDataInFirestore(user.uid);
                if (userStatus === "exists") {
                    history.push("/");
                    window.location.reload();
                } else if (userStatus === "not-exists") {
                    saveDataInFirestore(user.uid, {
                        city: "",
                        email: user.email,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        authType: "GOOGLE",
                        birthday: "",
                        country: "",
                        state: "",
                        address: "",
                        profileStatus: 0,
                        countryComplete: ""
                    });
                } else {
                    swal({
                        title: "Ocurrio un error",
                        text: "Ocurrio un error inesperado, intentalo de nuevo más tarde!",
                        icon: "error",
                        button: "Entendido!",
                        closeOnClickOutside: false
                    });
                }

            } else {
                user.sendEmailVerification().then(r => {
                    saveDataInFirestore(user.uid, {
                        city: "",
                        email: user.email,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        authType: "GOOGLE",
                        birthday: "",
                        country: "",
                        state: "",
                        address: "",
                        profileStatus: 0,
                        countryComplete: ""
                    });
                }, (error) => {
                    console.log(error.code, error.message);
                });
                auth.signOut();
            }
        }).catch((error) => {
            auth.signOut();
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);

            switch (errorCode) {
                case "auth/network-request-failed":
                    swal({
                        title: "Error de red",
                        text: "Un error de red (como tiempo de espera, conexión interrumpida o host inalcanzable) ocurrió!",
                        icon: "error",
                        button: "Entendido!",
                        closeOnClickOutside: false
                    });
            }
        })

    }

    const sendReCAPTCHAValue = async (value) => {
        const response = await axios.post("https://sunshine-ico.uc.r.appspot.com/api/recaptcha", {
            captchaValue: value
        });

        if (response.data.status === "success") {
            setVerifiedCaptcha(true);
        }

    }

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await setLoading(true);
            await login(email, pass).then(r => {

                if (r.user.emailVerified) {
                    if (verifiedCaptcha) {
                        setTimeout(() => {
                            history.push("/");
                            window.location.reload();
                        }, 2000);
                    } else {
                        let error = new Error("captcha_not_verified");
                        error.code = "captcha_not_verified";
                        throw error;
                    }

                } else {
                    logout();
                    let error = new Error("email_not_verified");
                    error.code = "email_not_verified";
                    throw error;
                }
            });
        } catch (error) {
            setLoading(false);
            let errorCode = error.code;
            logout();
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

                case "captcha_not_verified":
                    swal("Verifica el CAPTCHA", "Intenta verificar el CAPTCHA de nuevo para poder continuar!", "warning");
                    break;

                default:
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);
            }
        }

        //setLoading(false);
    }

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const openForgetPass = async () => {
        await document.getElementById("closeSignInModal").click();
    }

    return (

        <div className="modal fade" id="signInModal" data-backdrop="static"
             data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered pl-xl-5 pr-xl-5 ">
                <div className="modal-content registrobody   pl-xl-5 pr-xl-5 ">

                    <div className="modal-header">
                        <h5 className="modal-title col-12 text-light" id="staticBackdropLabel">Tu cuenta</h5>
                        <button type="button" id="closeSignInModal" className="close" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body col-12 pl-xl-5 pr-xl-5">

                        <div className="form-group col-12 d-flex justify-content-center">
                            <GoogleButton
                                label='Iniciar sesión con Google'
                                onClick={signUpWithGoogle}
                                style={{width: 500, borderRadius: 3}}
                            />
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

                                    <div className="input-group input-group-lg col-12 pl-xl-5 pr-xl-5">

                                        <FormControl fullWidth className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                     variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">Contraseña *</InputLabel>
                                            <FilledInput
                                                id="signin-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={pass}
                                                onChange={e => setPass(e.target.value)}
                                                style={{backgroundColor: "#FFFFFF"}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    </div>

                                    <div
                                        className="input-group col-12 d-flex justify-content-center pl-xl-5 pr-xl-5 mt-3">
                                        <ReCAPTCHA sitekey="6LceM4oaAAAAAJhirPQbyXB2KERNzwHUyoAspql-"
                                                   onChange={sendReCAPTCHAValue}/>
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

                        <div className="container pl-xl-5 pr-xl-5">
                            <div className="row pl-xl-5 pr-xl-5">
                                <div className="col-12 mb-5">

                                    <a style={{color: "white"}} href="#" onClick={openForgetPass} data-toggle="modal"
                                       data-target="#recoveryModal">
                                        <h6>
                                            ¿Olvidaste la contraseña?
                                        </h6>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer col-12 btn-footer"></div>
                </div>
            </div>
        </div>

    );
};

export default SignInModal;