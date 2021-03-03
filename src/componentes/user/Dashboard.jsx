import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Link, NavLink, useHistory} from "react-router-dom";
import swal from "sweetalert";

const Dashboard = () => {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const [signinEmail, setSigninEmail] = useState("");
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/Home");
        } catch {
            setError("Failed to log out");
        }
    }

    const renderData = session => {
        if(session){
            return (
                <div className="row mt-5">
                    <div className="col-12 mt-5">
                        <h1>{signinEmail}</h1>
                        <button type="button" className="btn btn-primary" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    useEffect(() => {
        try{
            let email = currentUser.email;
            setSigninEmail(email);
            if(!currentUser.emailVerified){
                renderData(false);
                console.log("NO VERIFICADO");
                logout();
                history.push("/Home");
                swal("Cuenta sin verificas", "Debes verificar tu cuenta primero, busca en tu bandeja de entrada de tu correo que registraste!", "warning");
            } else {
                renderData(true);
            }
        } catch (e) {
            setSigninEmail("");
            history.push("/Home");
            renderData(false);
        }
    },[]);

    return (
        <div className="container-fluid">
            {renderData()}
        </div>

    )

};

export default Dashboard;