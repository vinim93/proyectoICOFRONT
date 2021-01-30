import React, { useState,useEffect } from "react";

import './App.css';

import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';

import Navigation from "./componentes/Navigation";
import { BrowserRouter , Router,
  Switch,
  Route,
Redirect}
 from "react-router-dom";
import Acerca from "./componentes/Acerca";
import Home from './componentes/Home';
import Map from './componentes/Roaptomap';
import Blog from './componentes/Blog';
import Contactos from './componentes/contact';
import Proyectos from './componentes/Proyectos';
import Pdf from "./componentes/Pdf.js";
import contador from './componentes/cuentaregresiva';
import Footer from "./componentes/Footer";
import Foco from "./componentes/Foco";
import RoaptoMapa from './componentes/Roaptomap';
import Watsappicon from './images/watsapp-icon.png';
import Telicon from './images/tel-icon.png';
import  firebase from "firebase";
import "firebase/auth";
import Menuregistro from './componentes/main.js'





const App=(props) =>{

 
  
  return (
    <BrowserRouter>
    <div className="App">
      
           <Navigation     />
           
          
  <Switch>
  <Route  path="/contact"component={Contactos}/>
  <Route  path="/Roaptomap"component={RoaptoMapa}/>
  <Route  path="/Acerca"component={Acerca}/>
  <Route  path="/Proyectos"component={Foco}/>
    <Route  path="/Blog"component={Blog}/>
  
  <Route path="/Pdf" exact ><Pdf/></Route>
  <Route path="/" exact ><Home/></Route>
  
  </Switch>
  <div className="whats-content">

        <a href="https://api.whatsapp.com/send?phone=525584465710&text=hola%20%20quiero%20contactarneme%20con%20sunshine" className="whats-content" target="_blank">
         <img src={Watsappicon}alt="" className="whatsapp-img "/>
       </a>
       <a href="tel:525584465710"className="whats-content">  
       <img src={Telicon}alt="" className="tel-img img-fluid"/>
       </a>
      
         </div>

  </div>
  </BrowserRouter>

      
     
  )
  
  }

export default App;


