import React, {useState, useEffect} from 'react';
import "../navbar/css/styles.css"
import axios from "axios";
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


const SignUpModal = () => {


    const sendReCAPTCHAValue = async (value) => {
        const response = await axios.post("https://sunshine-ico.uc.r.appspot.com/api/recaptcha", {
            captchaValue: value
        });

        if(response.data.status === "success"){
            setVerifiedCaptcha(true);
        }

    }

    const [countries, setCountries] = useState([]);
    const [uploadValue, setUploadValue] = useState(0);
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
                doc: "Pending".replace(/<[^>]+>/g, ''),
                email: data.email.replace(/<[^>]+>/g, ''),
                name: data.name.replace(/<[^>]+>/g, ''),
                phone: data.phone === null ? "Pending".replace(/<[^>]+>/g, '') : data.phone.replace(/<[^>]+>/g, ''),
                authType: data.authType.replace(/<[^>]+>/g, ''),
                birthday: data.birthday.replace(/<[^>]+>/g, ''),
                country: data.country.replace(/<[^>]+>/g, ''),
                state: data.state.replace(/<[^>]+>/g, ''),
                address: data.address.replace(/<[^>]+>/g, ''),
                suns: 0
            }).then(docRef => {
                history.push("/");
                window.location.reload();
                clearStates();
            }).catch((error) => {
                console.log(error);
            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        } else {
            /*============GUARDAR DATOS EN FIRESTORE===========*/
            db.collection("credentials").doc(uid).set({
                UUID: uid,
                city: "Pending".replace(/<[^>]+>/g, ''),
                doc: "Pending".replace(/<[^>]+>/g, ''),
                email: email.replace(/<[^>]+>/g, ''),
                name: name.replace(/<[^>]+>/g, ''),
                lastname: apellido.replace(/<[^>]+>/g, ''),
                phone: "Pending".replace(/<[^>]+>/g, ''),
                authType: "EMAIL".replace(/<[^>]+>/g, ''),
                birthday: "Pending".replace(/<[^>]+>/g, ''),
                country: "Pending".replace(/<[^>]+>/g, ''),
                state: "Pending".replace(/<[^>]+>/g, ''),
                address: "Pending".replace(/<[^>]+>/g, ''),
                profileStatus: "Pending".replace(/<[^>]+>/g, ''),
                suns: 0
            }).then(docRef => {
                swal({
                    title: "Registro exitoso!",
                    text: "Te mandamos un mensaje a tu correo electrónico que proporcionaste para verificar tu cuenta",
                    icon: "success",
                    button: "Entendido!",
                    closeOnClickOutside: false
                });
                clearStates();
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        }
    }

    const searchDataInFirestore = id => {
        let docRef = db.collection('credentials').doc(id);
        docRef.get().then(doc => {
            return doc.exists;
        }).catch(error => {
            console.log("ERROR AL BUSCAR EL UID");
        });
    }

    const clearStates = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepeteadPassword('');
        setApellido('');
        setUploadValue(0);
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
                if(password === repeatedPassword){
                    if (checkedValue) {
                        if(verifiedCaptcha){
                            setLoading(true);
                            auth.createUserWithEmailAndPassword(email, password)
                                .then((user) => {

                                    user.user.sendEmailVerification().then(r => {
                                        saveDataInFirestore(user.user.uid);
                                    }, (error) => {
                                        console.log(error.code, error.message);
                                    })

                                    auth.signOut();

                                }).catch((error) => {
                                setLoading(false);
                                let errorCode = error.code;
                                let errorMessage = error.message;
                                console.log(errorCode, errorMessage);

                                /*============== EL CORREO YA SE USA POR OTRA CUENTA ==================*/
                                if (errorCode === "auth/email-already-in-use") {
                                    swal({
                                        title: "Oops",
                                        text: "La dirección de correo ya esta siendo usada por otra cuenta",
                                        icon: "warning",
                                        button: "Entendido!",
                                        closeOnClickOutside: false
                                    });
                                } else if (errorCode === "auth/weak-password") {
                                    swal({
                                        title: "Oops",
                                        text: "La contraseña debe tener al menos 8 caracteres!",
                                        icon: "warning",
                                        button: "Entendido!"
                                    });
                                }

                            });
                        } else {
                            swal({
                                title: "Verifica el CAPTCHA",
                                text: "Intenta verificar el CAPTCHA de nuevo para poder continuar!",
                                icon: "warning",
                                button: "Entendido!"
                            });
                        }

                    } else {
                        swal({
                            title: "Advertencia",
                            text: "Debes aceptar los términos y condiciones para poder registrarte!",
                            icon: "warning",
                            button: "Entendido!",
                            closeOnClickOutside: false
                        });
                    }
                } else {
                    swal({
                        title: "Las contraseñas no coinciden",
                        text: "Asegurate de escribir las mismas contraseñas en los campos correspondientes!",
                        icon: "warning",
                        button: "Entendido!",
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
                                            console.log(element);
                                            switch(element) {
                                                case 'min':

                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo 8 caracteres</p></li>
                                                    )

                                                case 'max':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Máximo 100 caracteres</p></li>
                                                    )

                                                case 'uppercase':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo una letra mayuscula</p></li>
                                                    )

                                                case 'lowercase':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo 1 letra minuscula</p></li>
                                                    )

                                                case 'spaces':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">No debe contener espacios</p></li>
                                                    )

                                                case 'digits':
                                                    return(
                                                        <li key={index} className="text-dark text-justify"><p className="text-danger">Mínimo 1 número</p></li>
                                                    )

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
                text: "Debes llenar todos los campos!",
                icon: "warning",
                button: "Entendido!",
                closeOnClickOutside: false
            });
        }
    };

    const signUpWithFacebook = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        auth.languageCode = 'es';
        provider.setCustomParameters({
            'display': 'popup'
        });
        auth
            .signInWithPopup(provider)
            .then((result) => {
                let credential = result.credential;

                // The signed-in user info.
                let user = result.user;
                console.log("YA SE HIZO CON FACEBOOK");
                console.log(user);

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                let accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;

                // ...
            });
    }

    const signUpWithGoogle = () => {

        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        auth.languageCode = 'es';
        auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            let user = result.user;
            console.log(user);
            if (user.emailVerified) {

                if(!searchDataInFirestore(user.uid)){
                    saveDataInFirestore(user.uid, {
                        city: "Pending",
                        email: user.email,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        authType: "GOOGLE",
                        birthday: "Pending",
                        country: "Pending",
                        state: "Pending",
                        address: "Pending",
                        profileStatus: 0
                    });
                }

            } else {
                user.sendEmailVerification().then(r => {
                    saveDataInFirestore(user.uid, {
                        city: "Pending",
                        email: user.email,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        authType: "GOOGLE",
                        birthday: "Pending",
                        country: "Pending",
                        state: "Pending",
                        address: "Pending",
                        profileStatus: 0
                    });
                }, (error) => {
                    console.log(error.code, error.message);
                });
                auth.signOut();
            }
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            auth.signOut();
        })

    }

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get("https://restcountries.eu/rest/v2/all");
                setCountries(response.data);
                console.log(response.data[0].flag);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCountryData();
    }, []);

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

    return (

        <div className="modal fade " id="signUpModal" data-backdrop="static" data-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered pl-xl-5 pr-xl-5">
                <div className="modal-content  registrobody pl-xl-5 pr-xl-5">

                    <div className="modal-header">
                        <h5 className="modal-title col-12" id="staticBackdropLabel">Crea tu cuenta</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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

                        <div className="form-group col-12 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">
                            <div className="container pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">
                                <div className="row pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">

                                    <button onClick={signUpWithFacebook} className="fb connect mr-xl-5 ml-xl-5">
                                        Iniciar sesión con
                                        Facebook
                                    </button>
                                </div>
                            </div>
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

                                        <FormControl fullWidth className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5" variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">Contraseña *</InputLabel>
                                            <FilledInput
                                                id="signup-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <FormControl fullWidth className="ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5" variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password">Repite tu contraseña *</InputLabel>
                                            <FilledInput
                                                id="signup-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={repeatedPassword}
                                                onChange={(e) => setRepeteadPassword(e.target.value)}
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

                                    <div className="form-group form-check col-12 mb-3 pl-xl-5 pr-xl-5">
                                                    <span
                                                        className="btn form-check ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5 form-regi">

                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox className="form-check-input form-regi"
                                                                          checked={checkedValue}
                                                                          onChange={handleCheckboxState}
                                                                          required={true}
                                                                          name="terminosyCondiciones" />}
                                                            label="Aceptar términos y condiciones" required name="terminosYCondiciones"
                                                        />
                                                    </span>
                                    </div>

                                    <div className="form-group col-12 d-flex justify-content-center">
                                        <ReCAPTCHA sitekey="6LceM4oaAAAAAJhirPQbyXB2KERNzwHUyoAspql-" onChange={sendReCAPTCHAValue} />
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