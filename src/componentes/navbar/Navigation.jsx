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
                <div className="collapse navbar-collapse" id="navbarNav">


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
                    <button type="button" className="navsesion btn btn-link disabled" data-toggle="modal"
                            data-target="#signInModal">Iniciar sesión (Próximamente)
                    </button>
                    <button type="button" className="navsesion btn btn-link disabled" data-toggle="modal"
                            data-target="#signUpModal">
                        Crea tu cuenta (Próximamente)
                    </button>
                    <SignUpModal />
                    <SignInModal />
                </div>
            </div>
        </nav>
    )
}
export default Navigation;
