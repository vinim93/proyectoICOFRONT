import React from "react";

import './App.css';

import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';

import "bootstrap/dist/css/history";

import Navigation from "./componentes/navbar/Navigation";
import {
    BrowserRouter,
    Switch,
    Route,
}
    from "react-router-dom";
import Acerca from "./componentes/acerca/Acerca";
import Home from './componentes/home/Home';
import Pdf from "./componentes/whitepaper/Pdf";
import Foco from "./componentes/proyectos/Foco";
import RoaptoMapa from './componentes/road_to_map/Roaptomap';
import Watsappicon from './images/watsapp-icon.png';
import Dashboard from "./componentes/user/Dashboard";
import Profile from "./componentes/user/profile/Profile";
import Recovery from "./componentes/user/Recovery";
import {AuthProvider} from "./componentes/contexts/AuthContext";
import Checkout from "./componentes/user/checkout/Checkout";
import Wallet from "./componentes/user/wallet/Wallet";
import "firebase/auth";


const App = () => {

    return (
        <BrowserRouter>
            <div className="App" data-toggle="collapse" data-target=".navbar-collapse.show">
                <AuthProvider>
                    <Navigation/>
                    <Switch>
                        <Route path="/Roaptomap" component={RoaptoMapa}/>
                        <Route path="/Acerca" component={Acerca}/>
                        <Route path="/Proyectos" component={Foco}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/Pdf" exact><Pdf/></Route>
                        <Route path="/" exact component={Dashboard} />
                        <Route path={"/Profile"} component={Profile}/>
                        <Route path={"/Checkout"} component={Checkout}/>
                        <Route path="/Recovery/:id">
                            <Recovery />
                        </Route>
                        <Route path={"/Wallet"} component={Wallet}/>
                    </Switch>
                </AuthProvider>
                <div className="whats-content">
{/*
                    <a href="https://api.whatsapp.com/send?phone=525584465710&text=hola%20%20quiero%20contactarneme%20con%20sunshine"
                       className="whats-content" target="_blank">
                        <img src={Watsappicon} alt="" className="whatsapp-img "/>
                    </a>
                    
                    <a href="tel:525584465710" className="whats-content">
                        <img src={Telicon} alt="" className="tel-img img-fluid"/>
                    </a>
                    */}
                </div>

            </div>
        </BrowserRouter>


    )

}

export default App;


