import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import logonav from '../../icons/logonav.svg';
import React, {useState} from 'react';
import "firebase/auth";
import {NavLink, useHistory} from 'react-router-dom';
import 'firebase/firestore';
import SignUpModal from "../user/SignUpModal";
import SignInModal from "../user/SignInModal";
import './mostrarmenu';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import USAFLAG from "../../images/usa_flag_icon.svg";
import MEXICOFLAG from "../../images/mexico_flag_icon.svg";
import {useAuth} from "../contexts/AuthContext";
import './css/styles.css';



const Navigation = () => {
    const history = useHistory();
    const {currentUser, logout} = useAuth();
    const { t } = useTranslation();
    const [logged, setLogged] = useState(currentUser ? true : false);

    function handleClick(lang) {
        i18next.changeLanguage(lang)
    }

    async function handleLogout() {
        try {
            await logout();
            window.location.reload();
            history.push("/Home");
        } catch {
        }
    }

    const renderNavbar = () => {
        if(logged){
            return(
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
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
                                    <h5>SUNSHINE</h5>
                                </li>

                            </ul>

                            <a href="#" className="btn btn-link" onClick={() => handleClick('en')} data-toggle="collapse" data-target=".navbar-collapse.show">
                                <img src={USAFLAG} className="img-fluid" style={{width: 50}} alt=""/>
                            </a>

                            <a href="#" className="btn btn-link" onClick={() => handleClick('es')} data-toggle="collapse" data-target=".navbar-collapse.show">
                                <img src={MEXICOFLAG} className="img-fluid" style={{width: 50}} alt=""/>
                            </a>

                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    {currentUser ? currentUser.email : "Invitado"}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">Perfíl</a>
                                    <a className="dropdown-item" href="#">Ajustes</a>
                                    <a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            )
        } else {
            return(
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
                                             to="./Acerca">{t('Navbar.Acerca')}
                                    </NavLink>
                                </li>
                                <li className="nav-item ">

                                    <NavLink className="navbar-brand nav-link navegacion" tap-index="-1"
                                             activeClassName="active" area-disabled="true" data-toggle="collapse" data-target=".navbar-collapse.show"
                                             to="./Roaptomap">{t('Navbar.RoadToMap')}
                                    </NavLink>
                                </li>
                                <li className="nav-item ">

                                    <NavLink className="navbar-brand nav-link navegacion" activeClassName="active"
                                             area-disabled="true" data-toggle="collapse" data-target=".navbar-collapse.show"
                                             to="./Proyectos">{t('Navbar.Proyectos')}
                                    </NavLink>
                                </li>
                            </ul>
                            <a href="#" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <button type="button" className="navsesion btn btn-link" data-toggle="modal"
                                        data-target="#signInModal">{t('Navbar.SignIn')}
                                </button>
                            </a>

                            <a href="#" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <button type="button" className="navsesion btn btn-link" data-toggle="modal"
                                        data-target="#signUpModal">
                                    {t('Navbar.SignUp')}
                                </button>
                            </a>

                            <a href="#" className="btn btn-link" onClick={() => handleClick('en')} data-toggle="collapse" data-target=".navbar-collapse.show">
                                <img src={USAFLAG} className="img-fluid" style={{width: 50}} alt=""/>
                            </a>

                            <a href="#" className="btn btn-link" onClick={() => handleClick('es')} data-toggle="collapse" data-target=".navbar-collapse.show">
                                <img src={MEXICOFLAG} className="img-fluid" style={{width: 50}} alt=""/>
                            </a>

                        </div>
                        <SignUpModal />
                        <SignInModal />
                    </div>
                </nav>
            )
        }
    }

    return (

        <>
            {renderNavbar()}
        </>
    )
}
export default Navigation;
