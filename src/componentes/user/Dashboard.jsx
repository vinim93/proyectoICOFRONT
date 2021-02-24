import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Link, NavLink, useHistory} from "react-router-dom";

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

    useEffect(() => {
        try{
            let email = currentUser.email;
            setSigninEmail(email);
        } catch (e) {
            setSigninEmail("");
            history.push("/Home");
        }
    },[]);

    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-12 mt-5">
                    <h1>{signinEmail}</h1>
                    <button type="button" className="btn btn-primary" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>

    )

};

export default Dashboard;