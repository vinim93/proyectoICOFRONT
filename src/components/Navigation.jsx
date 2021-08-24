import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import logonav from '../images/logonav.svg';
import React, {useState} from 'react';
import "firebase/auth";
import {NavLink, useHistory} from 'react-router-dom';
import 'firebase/firestore';
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import '../js/mostrarmenu';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import USAFLAG from "../images/usa_flag_icon.svg";
import MEXICOFLAG from "../images/mexico_flag_icon.svg";
import {useAuth} from "../context/AuthContext";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PasswordRecoveryModal from "./PasswordRecoveryModal";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navigation = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const {currentUser, logout} = useAuth();
    const [logged] = useState(!!currentUser);

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        console.log(e);
        switch (e) {
            case "index":
                history.push("./");
                break;
            case "profile":
                history.push("./Profile");
                break;
            case "logout":
                handleLogout();
                break;
            case "settings":
                history.push("./Settings");
                break;
            case "wallet":
                history.push("./Wallet");
                break;
            default:
                history.push("./");
                break;
        }
    };

    const renderNavbar = () => {
        if (logged) {

            return (
                <nav className="navbar fixed-top navbar-expand-lg navbar-light w-100 myShadow" style={{backgroundColor: '#fff'}}>
                    <div className="container-fluid">

                        <a className="navbar-brand" href="./">
                            <img className="img-fluid" width="60%" alt="Logo navigation" src={logonav}/>

                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                </li>
                            </ul>
                            <div className="form-inline my-3 my-lg-0 d-flex justify-content-center">
                                <Button aria-controls="simple-menu" variant="contained"
                                        style={{backgroundColor: "#0655af", color: "white"}} aria-haspopup="true"
                                        onClick={handleClick2}>
                                    {currentUser ? currentUser.email : "Invitado"} <ExpandMoreIcon/>
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem id="index" onClick={e => handleClose(e.target.id)}>
                                        <HomeIcon style={{ fontSize: 17 }}/>&nbsp;{t('Dashboard.Menu.Home')}
                                    </MenuItem>
                                    <MenuItem id="profile" onClick={e => handleClose(e.target.id)}>
                                        <AccountCircleIcon style={{ fontSize: 17 }}/>&nbsp;{t('Dashboard.Menu.Profile')}
                                    </MenuItem>
                                    <MenuItem id="wallet" onClick={e => handleClose(e.target.id)}>
                                        <AccountBalanceWalletIcon style={{ fontSize: 17 }}/>&nbsp;{t('Dashboard.Menu.Wallet')}
                                    </MenuItem>
                                    <MenuItem id="settings" onClick={e => handleClose(e.target.id)}>
                                        <SettingsIcon style={{ fontSize: 17 }}/>&nbsp;{t('Dashboard.Menu.Settings')}
                                    </MenuItem>
                                    <MenuItem id="logout" onClick={e => handleClose(e.target.id)}>
                                        <ExitToAppIcon style={{ fontSize: 17 }}/>&nbsp;{t('Dashboard.Menu.Logout')}
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className="form-inline my-3 my-lg-0 d-flex justify-content-center">
                                <button className="btn btn-link" onClick={() => handleClick('en')}
                                        data-toggle="collapse" data-target=".navbar-collapse.show">
                                    <img src={USAFLAG} className="img-fluid" style={{width: 40}} alt=""/>
                                </button>

                                <button className="btn btn-link" onClick={() => handleClick('es')}
                                        data-toggle="collapse" data-target=".navbar-collapse.show">
                                    <img src={MEXICOFLAG} className="img-fluid" style={{width: 40}} alt=""/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <SignUpModal/>
                    <SignInModal/>
                    <PasswordRecoveryModal/>
                </nav>
            )

        } else {
            return (
                <nav className="navbar fixed-top navbar-expand-lg navbar-light w-100 myShadow" style={{backgroundColor: '#fff'}}>
                    <div className="container-fluid">


                    <a className="navbar-brand" href="./">
                        <img className="img-fluid" width="60%" alt="Logo navigation" src={logonav}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="./Acerca">{t('Navbar.Acerca')} <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="./Roaptomap">{t('Navbar.RoadToMap')}</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="./ProyectosComponent">{t('Navbar.Proyectos')}</a>
                            </li>
                        </ul>
                        <div className="form-inline my-3 my-lg-0 d-flex justify-content-center">
                            <button className="nav-link btn btn-link" data-toggle="modal" data-target="#signInModal">
                                {t('Navbar.SignIn')}
                            </button>

                            <button className="nav-link btn btn-link" data-toggle="modal" data-target="#signUpModal">
                                {t('Navbar.SignUp')}
                            </button>
                        </div>
                        <div className="form-inline my-3 my-lg-0 d-flex justify-content-center">
                            <button className="btn btn-link" onClick={() => handleClick('en')}
                                    data-toggle="collapse" data-target=".navbar-collapse.show">
                                <img src={USAFLAG} className="img-fluid" style={{width: 40}} alt=""/>
                            </button>

                            <button className="btn btn-link" onClick={() => handleClick('es')}
                                    data-toggle="collapse" data-target=".navbar-collapse.show">
                                <img src={MEXICOFLAG} className="img-fluid" style={{width: 40}} alt=""/>
                            </button>
                        </div>
                    </div>
                    </div>
                    <SignUpModal/>
                    <SignInModal/>
                    <PasswordRecoveryModal/>
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