import '../../App.css';
import ReactPlayer from 'react-player';
import Accesibiilidad from '../../images/accesibilidad.svg';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from "react";
import moneda from "../../images/moneda.png";
import Flechas from '../../images/flechas.svg';
import Popper from 'popper.js';
import Privacidad from '../../images/privacidad.svg';
import { BrowserRouter as Router,
  
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Redtopeer from '../../images/redtopeer.svg';
import Solidez from '../../images/solidez.svg';
import Garantia from '../../images/garantia.svg';
import Trabajoequipo from '../../images/trabajoequipo.svg';
import Footer from '../footer/Footer';
import maparoad from '../../images/maparoad.svg';

class RoaptoMapa extends Component{
    render() {
      return(

            <div className="road ">
              <div className="row  ">

              <img src={maparoad} className=" maparoad " alt=""/>
              </div>
              <Footer/>
            </div>
            
        
      )
    }}


    export default RoaptoMapa;