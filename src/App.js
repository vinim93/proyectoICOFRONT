import React from "react";

import './App.css';

import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';

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
import {AuthProvider} from "./componentes/contexts/AuthContext";
import "firebase/auth";


const App = (props) => {

    return (
        <BrowserRouter>
            <div className="App" data-toggle="collapse" data-target=".navbar-collapse.show">


                <AuthProvider>
                    <Navigation/>
                    <Switch>
                        <Route path="/Roaptomap" component={RoaptoMapa}/>
                        <Route path="/Acerca" component={Acerca}/>
                        <Route path="/Proyectos" component={Foco}/>
                        <Route path="/Home" component={Home}/>
                        <Route path="/Pdf" exact><Pdf/></Route>
                        <Route path="/" exact component={Dashboard} />

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


