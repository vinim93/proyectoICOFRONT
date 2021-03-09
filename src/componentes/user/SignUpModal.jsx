import React, {useState, useEffect} from 'react';
import Icongmail from "../../images/icongmail.svg";
import Iconfaceb from "../../images/iconfaceb.svg";
import Camaraine from "../../images/camaraine.svg";
import Pdfine from "../../images/pdfine.svg";
import "../navbar/css/styles.css"
import axios from "axios";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {db, auth} from "../config/firebase";
import swal from "sweetalert";
import firebase from 'firebase';
import "firebase/auth";
import {Document, Page} from 'react-pdf';
import GoogleButton from "react-google-button";


const SignUpModal = () => {

    const [countries, setCountries] = useState([]);
    const [uploadValue, setUploadValue] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [checkedValue, setCheckedValue] = useState(false);
    const [authType, setAuthType] = useState("");

    const handleCheckboxState = (e) => {
        console.log(e.target.checked);
        setCheckedValue(e.target.checked);
    }

    const saveDataInFirestore = (uid, data = {}) => {

        if(Object.keys(data).length > 0){
            /*============GUARDAR DATOS EN FIRESTORE===========*/
            db.collection("credentials").doc(uid).set({
                UUID: uid,
                city: data.city,
                doc: "Pending",
                email: data.email,
                name: data.name,
                phone: data.phone,
                authType: data.authType
            }).then(docRef => {
                swal("Registro exitoso con Google", "", "success");
                clearStates();
            }).catch((error) => {
                console.log(error);
            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        } else {
            /*============GUARDAR DATOS EN FIRESTORE===========*/
            db.collection("credentials").doc(uid).set({
                UUID: uid,
                city: ciudad,
                doc: "Pending",
                email: email,
                name: name + " " + apellido,
                phone: telefono,
                authType: authType
            }).then(docRef => {
                swal("Registro exitoso", "", "success");
                document.getElementById("signUpButton").disabled = false;
                document.getElementById("signUpButtonDiv").style.visibility = "visible";
                document.getElementById("loadingDiv").style.visibility = "hidden";
                clearStates();
            }).catch((error) => {
                document.getElementById("signUpButton").disabled = false;
                document.getElementById("signUpButtonDiv").style.visibility = "visible";
                document.getElementById("loadingDiv").style.visibility = "hidden";
                console.log(error);
            });
            /*============GUARDAR DATOS EN FIRESTORE===========*/
        }


    }

    const clearStates = () => {
        setName('');
        setEmail('');
        setCiudad('');
        setTelefono('');
        setPassword('');
        setApellido('');
        setUploadValue(0);
        setCheckedValue(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && ciudad !== '' && telefono !== '' && password !== '' && apellido !== '') {
            if (checkedValue) {
                document.getElementById("signUpButton").disabled = true;
                document.getElementById("signUpButtonDiv").style.visibility = "hidden";
                document.getElementById("loadingDiv").style.visibility = "visible";
                setAuthType("EMAIL");
                auth.createUserWithEmailAndPassword(email, password)
                    .then((user) => {

                        user.user.sendEmailVerification().then(r => {
                            saveDataInFirestore(user.user.uid);
                        }, (error) => {
                            console.log(error.code, error.message);
                        })

                        auth.signOut();

                    }).catch((error) => {
                    document.getElementById("signUpButton").disabled = false;
                    document.getElementById("signUpButtonDiv").style.visibility = "visible";
                    document.getElementById("loadingDiv").style.visibility = "hidden";
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);

                    /*============== EL CORREO YA SE USA POR OTRA CUENTA ==================*/
                    if (errorCode === "auth/email-already-in-use") {
                        swal("Oops", "La dirección de correo ya esta siendo usada por otra cuenta!", "warning");
                    }

                });
            } else {
                swal("Advertencia", "Debes aceptar los términos y condiciones para poder registrarte!", "warning");
            }
        } else {
            swal("Advertencia", "Debes llenar todos los campos!", "warning");
        }
    };

    const signUpWithGoogle = () => {

        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        firebase.auth().languageCode = 'es';
        firebase.auth().signInWithPopup(provider).then((result) => {
            let user = result.user;
            if (user.emailVerified) {
                //MANDAR A OTRA PANTALLA
            } else {
                user.sendEmailVerification().then(r => {
                    saveDataInFirestore(user.uid, {
                        city: "Pending",
                        email: user.email,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        authType: "GOOGLE"
                    });
                }, (error) => {
                    console.log(error.code, error.message);
                });
            }
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
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

    const loading = () => {
        const times = 3;
        let circles = [];
        for (let i = 0; i < times; i++) {
            if (i === times - 1) {
                circles.push(
                    <div className="spinner-grow text-light" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                );
            } else {
                circles.push(
                    <div className="spinner-grow text-light mr-4" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                );
            }
        }
        return circles;
    }

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
                                    <a href="#" className="fb connect mr-xl-5 ml-xl-5">Iniciar sesión con
                                        Facebook</a>
                                </div>
                            </div>
                        </div>

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="container mt-5 pl-xl-5 pr-xl-5">
                                <div className="row pl-xl-5 pr-xl-5">

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                        <select className="custom-select custom-select-lg ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5 text-light"
                                                aria-label="Default select example"
                                                onChange={e => setCiudad(e.target.value)}>

                                            <option value="">Elige un país</option>
                                            {
                                                countries.map((value, index) => (
                                                    <option key={index} value={value.name}>{value.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                        <PhoneInput
                                            className="form-control ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                            international
                                            countryCallingCodeEditable={false}
                                            defaultCountry="MX"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e)}/>

                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">

                                        <input
                                            className="form-control ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                            type="text"
                                            placeholder="Nombre"
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required/>

                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                        <input
                                            className="form-control ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                            type="text"
                                            placeholder="Apellido"
                                            name="apellido"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            required/>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                        <input
                                            className="form-control ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required/>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                        <input className="form-control ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                               type="password"
                                               id="signup-password"
                                               placeholder="Contraseña"
                                               name="password"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               required/>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                        <input className="form-control ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5"
                                               type="password"
                                               id="signup-password-repeat"
                                               placeholder="Confirmar contraseña"
                                               name="password-repeat"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               required/>
                                    </div>

                                    <div className="input-group input-group-lg col-12 mb-3 pl-xl-5 pr-xl-5">
                                                    <span className="btn form-check ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5">
                                                        <label className="form-regi marginlb form-check-label">
                                                            <a className="text-light" href="">
                                                                Aviso de privacidad
                                                            </a>
                                                        </label>
                                                    </span>
                                    </div>

                                    <div className="form-group form-check col-12 mb-3 pl-xl-5 pr-xl-5">
                                                    <span className="btn form-check ml-lg-5 mr-lg-5 ml-xl-5 mr-xl-5 form-regi">
                                                        <input className="form-check-input form-regi"
                                                               type="checkbox"
                                                               name="terminosYCondiciones"
                                                               id="aviso1"
                                                               onChange={handleCheckboxState}
                                                               required/>

                                                        <label className="form-regi marginlb form-check-label"
                                                               htmlFor="aviso1">
                                                            Aceptar términos y condiciones
                                                        </label>
                                                    </span>
                                    </div>

                                    <div className="form-group col-12 mt-3" id="signUpButtonDiv">
                                        <button type="submit"
                                                className="btn btn-registro" id="signUpButton">REGISTRATE
                                        </button>
                                    </div>

                                    <div id="loadingDiv" style={{visibility: 'hidden'}}>
                                        {loading()}
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