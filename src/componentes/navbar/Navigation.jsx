import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../../icons/logonav.svg';
import React, {Component, useState} from 'react';
import Icongmail from '../../images/icongmail.svg';
import Iconfaceb from '../../images/iconfaceb.svg';
import Pdfine from '../../images/pdfine.svg';
import firebase from 'firebase';
import swal from 'sweetalert';
import {
    NavLink
} from 'react-router-dom';
import Camaraine from '../../images/camaraine.svg';

import {db} from '../config/firebase';

import 'firebase/firestore';
import SignUpModal from "./SignUpModal";

var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
var contraseña = ""
var i = 0;
for (i = 0; i < 20; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

var aleatorio = (Math.random());


const Navigation = () => {


    const [picture, setPicture] = useState(null);
    const [uploadValue, setUploadValue] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref(`INE/${file.name}${contraseña} ${aleatorio * aleatorio}`);
        const task = storageRef.put(file);


        task.on('state_changed', (snapshot) => {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadValue(percentage)


        }, error => {
            console.log(error.message)
        }, () => {
            console.log(task.snapshot);
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

    console.log(picture);


    const handleSubmit = (e) => {
        e.preventDefault();


        db.collection('Usuarios').add({
            nombre: name,
            correo: email,
            ciudadpais: ciudad,
            telefono: telefono,
            apellido: apellido,
            contraseña: password,
            doc: picture
        })
            .then(docRef => {

                console.log(docRef.id)
                swal("Felicidades!", "Gracias por registrarse!", "success");


            })
            .catch((error) => {
                alert(error.message);
            });
        setName('');
        setEmail('');
        setCiudad('');
        setTelefono('');
        setPassword('');
        setApellido('');
        setPicture('');

        console.log('se enviaron los datos')


    };

    console.log({name, ciudad, email, telefono, apellido, password, picture})

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
                            data-target="#staticBackdrop">
                        Inicia Sesion
                    </button>
                    <button type="button" className=" navsesion btn btn-link">Crea tu cuenta</button>
                    <SignUpModal
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        setStatesValues={setStatesValues}
                        getStatesValues={[picture, uploadValue, name, email, ciudad, telefono, apellido, password]}
                    />
                </div>
            </div>
        </nav>
    )
}
export default Navigation;
