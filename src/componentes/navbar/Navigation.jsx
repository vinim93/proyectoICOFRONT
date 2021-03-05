import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../../icons/logonav.svg';
import React from 'react';
import "firebase/auth";
import {
    NavLink
} from 'react-router-dom';
import 'firebase/firestore';
import SignUpModal from "../user/SignUpModal";
import SignInModal from "../user/SignInModal";
import './mostrarmenu';

const Navigation = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark fixed-top ">
            <div className="container-fluid">
                <NavLink className="navbar-brand navegacion  " to="/">
                    <img className="  " src={logonav}/>
                </NavLink>
                <button className="navbar-toggler mr-auto" id="boton-nav" type="button" data-toggle="collapse" data-target="#navbar-menu"
                        aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" collapse navbar-collapse" id="navbar-menu" >
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className="navbar-brand nav-link navegacion" data-toggle="collapse" data-target=".navbar-collapse.show"
                                     to="./Acerca">Acerca de
                            </NavLink>
                        </li>
                        <li className="nav-item ">

                            <NavLink className="navbar-brand nav-link navegacion" tap-index="-1"
                                     activeClassName="active" area-disabled="true" data-toggle="collapse" data-target=".navbar-collapse.show"
                                     to="./Roaptomap">Road to Map
                            </NavLink>
                        </li>
                        <li className="nav-item ">

                            <NavLink className="navbar-brand nav-link navegacion" activeClassName="active"
                                     area-disabled="true" data-toggle="collapse" data-target=".navbar-collapse.show"
                                     to="./Proyectos">Proyectos
                            </NavLink>
                        </li>
                    </ul>
                    <a href="#" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <button type="button" className="navsesion btn btn-link disabled" data-toggle="modal"
                                 >Iniciar sesión (Próximamente)
                        </button>
                    </a>

                    <a href="#" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <button type="button" className="navsesion btn btn-link disabled" data-toggle="modal"
                               >
                            Crea tu cuenta (Próximamente)
                        </button>
                    </a>

                </div>
                <SignUpModal />
                <SignInModal />
            </div>
        </nav>
    )
}
export default Navigation;
