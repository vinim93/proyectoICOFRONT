import React from "react";

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
import Contactos from './componentes/Contactos';
import Proyectos from './componentes/Proyectos';
import Pdf from "./componentes/Pdf.js";
import contador from './componentes/cuentaregresiva';
import Footer from "./componentes/Footer";
import Foco from "./componentes/Foco";





function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
           <Navigation/>
          
  <Switch>
  
  <Route  path="/Roaptomap"><Map/></Route>
  <Route  path="/Acerca"component={Acerca}/>
  <Route  path="/Proyectos"component={Foco}/>
    <Route  path="/Blog"component={Blog}/>
  <Route  path="/Contactos"component={Contactos}/>
  <Route path="/Pdf" exact ><Pdf/></Route>
  <Route path="/" exact ><Home/></Route>
  
  </Switch>
  
  </div>
  </BrowserRouter>

      
     
  )
  
  }

export default App;


