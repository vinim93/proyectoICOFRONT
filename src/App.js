import React from "react";
import './App.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/manuel";
import Navigation from "./components/Navigation";
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import Acerca from "./routes/Acerca";
import Home from './routes/Home';
import Pdf from "./routes/Pdf";
import Proyectos from "./routes/Proyectos";
import RoaptoMapa from './routes/Roaptomap';
import Dashboard from "./routes/dashboard/Dashboard";
import Profile from "./routes/dashboard/Profile";
import {AuthProvider} from "./context/AuthContext";
import Checkout from "./components/dashboard/checkout/Checkout";
import Wallet from "./routes/dashboard/Wallet";
import Settings from "./routes/dashboard/Settings";
import {CheckoutContextProvider} from "./context/CheckoutContext";
import {ProfileContextProvider} from "./context/ProfileContext";
import "firebase/auth";
import Recovery from "./routes/Recovery";

const App = () => {

    return (
        <BrowserRouter>
            <div className="App" data-toggle="collapse" data-target=".navbar-collapse.show">
                <AuthProvider>
                    <CheckoutContextProvider>
                        <ProfileContextProvider>
                            <Navigation/>
                            <Switch>
                                <Route path="/Roaptomap" component={RoaptoMapa}/>
                                <Route path="/Acerca" component={Acerca}/>
                                <Route path="/ProyectosComponent" component={Proyectos}/>
                                <Route path="/Home" component={Home}/>
                                <Route path="/Pdf" exact><Pdf/></Route>
                                <Route path="/" exact component={Dashboard}/>
                                <Route path={"/Profile"} exact component={Profile}/>
                                <Route path={"/Checkout"} component={Checkout}/>
                                <Route path={"/Wallet"} component={Wallet}/>
                                <Route path={"/Settings"} component={Settings}/>
                                <Route path="/Recovery" component={Recovery} />
                            </Switch>
                        </ProfileContextProvider>
                    </CheckoutContextProvider>
                </AuthProvider>

            </div>
        </BrowserRouter>


    )

}

export default App;


