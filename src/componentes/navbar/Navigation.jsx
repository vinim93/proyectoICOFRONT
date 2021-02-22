import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../../icons/logonav.svg';
import React, {useState} from 'react';
import firebase from 'firebase';
import "firebase/auth";

import swal from 'sweetalert';
import {
    NavLink
} from 'react-router-dom';
import {db} from '../config/firebase';
import 'firebase/firestore';
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
let contrasenia = ""
let i = 0;
for (i = 0; i < 20; i++) contrasenia += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

let aleatorio = (Math.random());


const Navigation = () => {


    const [picture, setPicture] = useState(null);
    const [uploadValue, setUploadValue] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [checkedValue, setCheckedValue] = useState(false);

    const handleCheckboxState = (e) => {
        console.log(e.target.checked);
        setCheckedValue(e.target.checked);
    }

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref(`INE/${file.name}${contrasenia} ${aleatorio * aleatorio}`);
        const task = storageRef.put(file);


        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadValue(percentage)

        }, error => {
            console.log(error.message)
        }, () => {
            storageRef.getDownloadURL().then(url => {
                setPicture(url
                )

            })
            storageRef.getDownloadURL().then(docurl => {
                setPicture(
                    docurl
                )

            })

        });

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkedValue){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {

                    /*============GUARDAR DATOS EN FIRESTORE===========*/
                    db.collection("credentials").doc(user.user.uid).set({
                        UUID: user.user.uid,
                        city: ciudad,
                        doc: picture,
                        email: email,
                        last_name: apellido,
                        name: name,
                        phone: telefono
                    }).then(docRef => {
                        swal("Listo", "Si se pudo", "success");
                        setName('');
                        setEmail('');
                        setCiudad('');
                        setTelefono('');
                        setPassword('');
                        setApellido('');
                        setPicture('');
                    }).catch((error) => {
                        console.log(error);
                    });
                    /*============GUARDAR DATOS EN FIRESTORE===========*/

                }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode, errorMessage);

                /*============== EL CORREO YA SE USA POR OTRA CUENTA ==================*/
                if(errorCode === "auth/email-already-in-use"){
                    swal("Oops", "La dirección de correo ya esta siendo usada por otra cuenta!", "warning");
                }
            });
        } else {
            swal("Advertencia", "Debes aceptar los términos y condiciones para poder registrarte!", "warning");
        }



    };

    const setStatesValues = (event, state) => {
        eval(state)(event);
    }

    return (

        < nav className="navbar navbar-expand-lg navbar-dark fixed-top ">
            <div className="container-fluid">
                <NavLink className="navbar-brand navegacion  " to="/">
                    <img className="  " src={logonav}/>
                </NavLink>
                <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">


                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item ">

                            <NavLink className="navbar-brand   nav-link navegacion"
                                     to="./Acerca">Acerca de
                            </NavLink>
                        </li>
                        <li className="nav-item ">

                            <NavLink className="navbar-brand  nav-link navegacion" tap-index="-1"
                                     activeClassName="active" area-disabled="true"
                                     to="./Roaptomap">Road to Map
                            </NavLink>
                        </li>
                        <li className="nav-item ">

                            <NavLink className="navbar-brand nav-link navegacion" activeClassName="active"
                                     area-disabled="true"
                                     to="./Proyectos">Proyectos
                            </NavLink>
                        </li>
                    </ul>
                    <button type="button" className=" navsesion btn btn-link" data-toggle="modal"
                            data-target="#signInModal">Inciar sesión
                    </button>
                    <button type="button" className=" navsesion btn btn-link" data-toggle="modal"
                            data-target="#signUpModal">
                        Crea tu cuenta
                    </button>
                    <SignUpModal
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        setStatesValues={setStatesValues}
                        getStatesValues={[picture, uploadValue, name, email, ciudad, telefono, apellido, password]}
                        handleCheckboxState={handleCheckboxState}
                    />

                    <SignInModal/>
                </div>
            </div>
        </nav>
    )
}
export default Navigation;
