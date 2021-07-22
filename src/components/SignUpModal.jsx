import React, {useState} from 'react';
import "./navbar/css/styles.css"
import 'react-phone-number-input/style.css'
import {db, auth} from "../config/firebase";
import swal from "sweetalert";
import swal2 from '@sweetalert/with-react';
import firebase from 'firebase';
import "firebase/auth";
import GoogleButton from "react-google-button";
import passwordValidator from "password-validator";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useHistory} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import SunshineFinder from "../apis/SunshineFinder";
require('dotenv').config();


const SignUpModal = () => {

    const sendReCAPTCHAValue = async (value) => {
        const response = await SunshineFinder.post("/api/recaptcha", {
            captchaValue: value
        });

        if (response.data.status === "success") {
            setVerifiedCaptcha(true);
        }

    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeteadPassword] = useState("");
    const [checkedValue, setCheckedValue] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifiedCaptcha, setVerifiedCaptcha] = useState(false);
    const history = useHistory();

    //VALIDATIONS
    const validations = {
        requiredFields: () => {
            return (name !== '' && email !== '' && password !== '' && apellido !== '')
        }
    }

    const handleCheckboxState = (e) => {
        setCheckedValue(e.target.checked);
    }

    const saveDataInFirestore = (uid, data = {}) => {
        if (Object.keys(data).length > 0) {
            /*============GUARDAR DATOS EN FIRESTORE CON GOOGLE===========*/
            db.collection("credentials").doc(uid).set({
                UUID: uid,
                city: data.city.replace(/<[^>]+>/g, ''),
                doc: "".replace(/<[^>]+>/g, ''),
                email: data.email.replace(/<[^>]+>/g, ''),
                name: data.name.replace(/<[^>]+>/g, ''),
                phone: data.phone === null ? "".replace(/<[^>]+>/g, '') : data.phone.replace(/<[^>]+>/g, ''),
                authType: data.authType.replace(/<[^>]+>/g, ''),
                birthday: data.birthday.replace(/<[^>]+>/g, ''),
                country: data.country.replace(/<[^>]+>/g, ''),
                state: data.state.replace(/<[^>]+>/g, ''),
                address: data.address.replace(/<[^>]+>/g, ''),
                suns: 0,
                countryComplete: data.countryComplete.replace(/<[^>]+>/g, ''),
                profileStatus: data.profileStatus,
                fileType: "".replace(/<[^>]+>/g, ''),
                profilePicture: "".replace(/<[^>]+>/g, ''),
                profilePictureStatus: 0,
                addressToken: "",
                privateKey: ""
            }).then(docRef => {
                history.push("/");
                window.location.reload();
                clearStates();
            }).catch((error) => {

            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        } else {
            /*============GUARDAR DATOS EN FIRESTORE===========*/
            db.collection("credentials").doc(uid).set({
                UUID: uid,
                city: "".replace(/<[^>]+>/g, ''),
                doc: "".replace(/<[^>]+>/g, ''),
                email: email.replace(/<[^>]+>/g, ''),
                name: name.replace(/<[^>]+>/g, ''),
                lastname: apellido.replace(/<[^>]+>/g, ''),
                phone: "".replace(/<[^>]+>/g, ''),
                authType: "EMAIL".replace(/<[^>]+>/g, ''),
                birthday: "".replace(/<[^>]+>/g, ''),
                country: "".replace(/<[^>]+>/g, ''),
                state: "".replace(/<[^>]+>/g, ''),
                address: "".replace(/<[^>]+>/g, ''),
                profileStatus: 0,
                suns: 0,
                countryComplete: "".replace(/<[^>]+>/g, ''),
                fileType: "".replace(/<[^>]+>/g, ''),
                profilePicture: "".replace(/<[^>]+>/g, ''),
                profilePictureStatus: 0,
                addressToken: "",
                privateKey: ""
            }).then(docRef => {
                swal({
                    title: "¡Registro exitoso!",
                    text: "Enviamos un enlace al correo electrónico que proporcionaste para verificar tu cuenta.",
                    icon: "success",
                    button: "¡Entendido!",
                    closeOnClickOutside: false
                }).then(confirm => {
                    if (confirm) {
                        document.getElementById("closeModalSignUp").click();
                        document.getElementById("signInButton").click();
                    }
                });
                clearStates();
                setLoading(false);
            }).catch((error) => {
                setLoading(false);

            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        }
    }

    const searchDataInFirestore = async id => {
        let result = null;
        await db.collection('credentials').doc(id).get().then(doc => {
            result = doc.exists ? "exists" : "not-exists";
        }).catch(error => {
            result = "error";

        });
        return result;
    }

    const clearStates = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepeteadPassword('');
        setApellido('');
        setCheckedValue(false);
        setVerifiedCaptcha(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validations.requiredFields()) {

            let schema = new passwordValidator();
            schema
                .is().min(8)
                .is().max(100)
                .has().uppercase()
                .has().lowercase()
                .has().digits(1)
                .has().not().spaces();

            if (schema.validate(password)) {
                if (password === repeatedPassword) {
                    if (checkedValue) {
                        if (verifiedCaptcha) {
                            setLoading(true);
                            auth.createUserWithEmailAndPassword(email, password)
                                .then((user) => {

                                    user.user.sendEmailVerification().then(r => {
                                        saveDataInFirestore(user.user.uid);
                                    }, (error) => {

                                    })

                                    auth.signOut();

                                }).catch((error) => {
                                setLoading(false);
                                let errorCode = error.code;


                                /*============== EL CORREO YA SE USA POR OTRA CUENTA ==================*/
                                if (errorCode === "auth/email-already-in-use") {
                                    swal({
                                        title: "Oops",
                                        text: "La dirección de correo ya se encuentra en uso",
                                        icon: "warning",
                                        button: "¡Entendido!",
                                        closeOnClickOutside: false
                                    });
                                } else if (errorCode === "auth/weak-password") {
                                    swal({
                                        title: "Oops",
                                        text: "La contraseña debe tener al menos 8 caracteres!",
                                        icon: "warning",
                                        button: "¡Entendido!"
                                    });
                                }

                            });
                        } else {
                            swal({
                                title: "Verifica el CAPTCHA",
                                text: "Intenta verificar el CAPTCHA de nuevo para poder continuar",
                                icon: "warning",
                                button: "¡Entendido!"
                            });
                        }
                    } else {
                        swal({
                            title: "Advertencia",
                            text: "Debes aceptar los términos y condiciones para poder registrarte",
                            icon: "warning",
                            button: "¡Entendido!",
                            closeOnClickOutside: false
                        });
                    }
                } else {
                    swal({
                        title: "Las contraseñas no coinciden",
                        text: "Asegurate de escribir las mismas contraseñas en los campos correspondientes",
                        icon: "warning",
                        button: "¡Entendido!",
                        closeOnClickOutside: false
                    });
                }

            } else {
                swal2({
                    text: "Tu contraseña debe cumplir con los siguientes requisitos",
                    closeOnClickOutside: false,
                    buttons: {
                        cancel: "Entendido",
                    },
                    content: (
                        <div className="container">
                            <div className="row">
                                <ul>
                                    {
                                        schema.validate(password, {list: true}).map((element, index) => {

                                            switch (element) {
                                                case 'min':

                                                    return (
                                                        <li key={index} className="text-dark text-justify"><p
                                                            className="text-danger">Mínimo 8 caracteres</p></li>
                                                    )

                                                case 'max':
                                                    return (
                                                        <li key={index} className="text-dark text-justify"><p
                                                            className="text-danger">Máximo 100 caracteres</p></li>
                                                    )

                                                case 'uppercase':
                                                    return (
                                                        <li key={index} className="text-dark text-justify"><p
                                                            className="text-danger">Mínimo una letra mayuscula</p></li>
                                                    )

                                                case 'lowercase':
                                                    return (
                                                        <li key={index} className="text-dark text-justify"><p
                                                            className="text-danger">Mínimo 1 letra minuscula</p></li>
                                                    )

                                                case 'spaces':
                                                    return (
                                                        <li key={index} className="text-dark text-justify"><p
                                                            className="text-danger">No debe contener espacios</p></li>
                                                    )

                                                case 'digits':
                                                    return (
                                                        <li key={index} className="text-dark text-justify"><p
                                                            className="text-danger">Mínimo 1 número</p></li>
                                                    )

                                                default:
                                                    return
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                })
            }

        } else {
            swal({
                title: "Advertencia",
                text: "Debes llenar todos los campos",
                icon: "warning",
                button: "¡Entendido!",
                closeOnClickOutside: false
            });
        }
    };

    const signUpWithGoogle = async () => {

        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        auth.languageCode = 'es';
        await auth.signInWithPopup(provider).then(async (result) => {

            let user = result.user;

            if (user.emailVerified) {

                let userStatus = await searchDataInFirestore(user.uid);
                if(userStatus === "exists"){
                    history.push("/");
                    window.location.reload();
                    clearStates();
                } else if (userStatus === "not-exists"){
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
                        countryComplete: "",
                        addressToken: "",
                        privateKey: ""
                    });
                } else {
                    swal({
                        title: "Ocurrió un error",
                        text: "Ocurrió un error inesperado, inténtalo de nuevo más tarde",
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
                        countryComplete: "",
                        addressToken: "",
                        privateKey: ""
                    });
                }, (error) => {

                });
                auth.signOut();
            }
        }).catch((error) => {
            auth.signOut();
        })

    }

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword1: false,
        showPassword2: false
    });

    const handleClickShowPassword = (id) => {
        if (id === 1) {
            setValues({...values, showPassword1: !values.showPassword1});
        } else if (id === 2) {
            setValues({...values, showPassword2: !values.showPassword2});
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <div className="modal fade " id="signUpModal" data-backdrop="static" data-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered pl-xl-5 pr-xl-5">
                <div className="modal-content  registrobody pl-xl-5 pr-xl-5">

                    <div className="modal-header">
                        <h5 className="modal-title col-12 text-light" id="staticBackdropLabel">Crea tu cuenta</h5>
                        <button type="button" id="closeModalSignUp" className="close" data-dismiss="modal"
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

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="container mt-5 pl-xl-5 pr-xl-5">
                                <div className="row pl-xl-5 pr-xl-5">

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <TextField required={true}
                                                   fullWidth
                                                   style={{backgroundColor: "#FFFFFF", fontWeight: "bold"}}
                                                   className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                   id="name"
                                                   name="name"
                                                   value={name}
                                                   label="Nombre"
                                                   type="text"
                                                   onChange={(e) => setName(e.target.value)} variant="filled"/>


                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <TextField required={true}
                                                   fullWidth
                                                   style={{backgroundColor: "#FFFFFF", fontWeight: "bold"}}
                                                   className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                   id="lastname"
                                                   name="lastnane"
                                                   label="Apellido"
                                                   value={apellido}
                                                   type="text"
                                                   onChange={(e) => setApellido(e.target.value)} variant="filled"/>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <TextField required={true}
                                                   fullWidth
                                                   style={{backgroundColor: "#FFFFFF", fontWeight: "bold"}}
                                                   className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                   id="outlined-basic" label="Email"
                                                   value={email}
                                                   type="email"
                                                   onChange={(e) => setEmail(e.target.value)} variant="filled"/>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <FormControl fullWidth className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                     variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">Contraseña *</InputLabel>
                                            <FilledInput
                                                id="signup-password"
                                                type={values.showPassword1 ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{backgroundColor: "#FFFFFF"}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => handleClickShowPassword(1)}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword1 ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <FormControl fullWidth className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                                     variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">Repite tu contraseña
                                                *</InputLabel>
                                            <FilledInput
                                                id="signup-password"
                                                type={values.showPassword2 ? 'text' : 'password'}
                                                value={repeatedPassword}
                                                onChange={(e) => setRepeteadPassword(e.target.value)}
                                                style={{backgroundColor: "#FFFFFF"}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => handleClickShowPassword(2)}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword2 ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    </div>

                                    <div className="form-group form-check col-12 mb-3 pl-xl-5 pr-xl-5">
                                                    <span
                                                        className="btn form-check ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5 form-regi">

                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox className="form-check-input form-regi"
                                                                          checked={checkedValue}
                                                                          onChange={handleCheckboxState}
                                                                          required={true}
                                                                          name="terminosyCondiciones"/>}
                                                            label="Aceptar términos y condiciones" required
                                                            name="terminosYCondiciones"
                                                        />
                                                    </span>
                                    </div>

                                    <div className="form-group col-12 d-flex justify-content-center">
                                        <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA}
                                                   onChange={sendReCAPTCHAValue}/>
                                    </div>

                                    <div className="form-group col-12 mt-3" id="signUpButtonDiv">
                                        <button type="submit"
                                                className="btn btn-registro"
                                                id="signUpButton"
                                                disabled={loading}>
                                            {loading ? (
                                                <div className="spinner-border text-dark" role="status">
                                                    <span className="sr-only">Registrando...</span>
                                                </div>
                                            ) : "REGISTRATE"}
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

export default SignUpModal;