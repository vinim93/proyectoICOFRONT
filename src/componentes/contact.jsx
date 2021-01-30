import '../App.css';
import ReactDOM from"react-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import  logonav from '../icons/logonav.svg';
import React, { Component } from 'react';
import $ from 'jquery';
import Popper from 'popper.js';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Footer from './Footer';
import Teamsun from '../images/teamsun.svg';
import Iconface from '../images/iconface.svg';
import Linkecontact from '../images/linkecontact.svg';
import Twitercontact from '../images/twitercontact.svg';
import Fotomanuel from '../images/fotomanuel.png';

class Contactos extends Component{
  render() {
    return(
      <div className="contactos m-0 p-0">

        <div className="container-fluid ">
         
          <div className="row">
            <div className="col-12 m-0 p-0">          
          <img src={Teamsun} alt="" className="img-fluid teamsunimg"/>
               </div>
               <div className="col-12 conten-contacts">
               <div class="card-group">
  <div className="card tarjetas col-4">
  <div className="card-image">
    <img
      src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
      class="card-img-top rounded-circle img-cont"
      alt="..."
    />
    <div
    className="image-overlay rounded-circle img-cont"  ></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Ahtziri Antonio <br/> (
Marketing Developer
)</h5>
      <p class="card-text">
      Desarrolla estrategias de marketing y marketing digital, 
      lleva campañas y es una de las caras en redes sociales.
      </p>
    </div>
    <div class="card-footer ">
      <p>
       
        <a href="
https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/
" className="red">
          <img src={Linkecontact} alt="face" className="col-6"/>
        </a>
        <a href= "https://twitter.com/AhtziriSunshine"className="red">
          <img src={Twitercontact} alt="face" className="col-6"/>
        </a>
        </p>
    </div>
  </div>
  <div class="card tarjetas col-4">
  <div className="card-image">
    <img
      src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
      class="card-img-top rounded-circle img-cont"
      alt="..."
    />
    <div
    className="image-overlay rounded-circle img-cont"  ></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Jocelyn Uribe <br/>(Community Manager)  </h5>
      <p class="card-text">
       
Creación de contenido en RRSS.
Monitoreo de los contenidos en redes sociales.
Gestión y planificación de las acciones de comunicación.

      </p>
    </div>
    <div class="card-footer">
    <p>
        
        <a href="https://www.linkedin.com/in/jocelyn-uribe-maldonado-720a90203/"
         className="red">
          <img src={Linkecontact} alt="face" className="col-6"/>
        </a>
        <a href="https://www.facebook.com/aht.pena.9
" className="red">
          <img src={Twitercontact} alt="face" className="col-6"/>
        </a>
        </p>
    </div>
  </div>
  <div class="card tarjetas col-4">
  <div className="card-image">
    <img
      src={Fotomanuel}
      class="card-img-top rounded-circle img-cont2 "
      alt="..."
    />
    <div
    className="image-overlay rounded-circle img-cont"  ></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Manuel Viniegra <br/>(Desarrollador 
react javascript
) </h5>
      <p class="card-text">
      Desarrollo de sistemas web con amplio stack de tecnologías y diseños responsivos
      </p>
    </div>
    <div class="card-footer">
    <p>
        
        <a href="https://www.linkedin.com/in/jose-manuel-viniegra-molina-aab9a51a8"
         className="red">
          <img src={Linkecontact} alt="face" className="col-6"/>
        </a>
        <a href="https://www.facebook.com/aht.pena.9
" className="red">
          <img src={Twitercontact} alt="face" className="col-6"/>
        </a>
        </p>
    </div>
  </div>
  <div className="col-12 conten-contacts">


    <div className="card-group">
  <div className="card tarjetas col-4">
  <div className="card-image">
    <img
      src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
      class="card-img-top rounded-circle img-cont"
      alt="..."
    />
    <div
    className="image-overlay rounded-circle img-cont"  ></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Yessenia Cortés
 <br/> (
  Developer Designer

)</h5>
      <p class="card-text">
      Diseño de contenido digital
       ( Edición de videos, contenido para redes sociales , 
       gifs , infografías, etc.)
            Maquetación y Desarrollo Visual  para web.

      </p>
    </div>
    <div class="card-footer ">
      <p>
       
        <a href="
https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/
" className="red">
          <img src={Linkecontact} alt="face" className="col-6"/>
        </a>
        <a href= "https://twitter.com/AhtziriSunshine"className="red">
          <img src={Twitercontact} alt="face" className="col-6"/>
        </a>
        </p>
        </div>
    </div>
    <div className="card tarjetas col-4">
  <div className="card-image">
    <img
      src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
      class="card-img-top rounded-circle img-cont"
      alt="..."
    />
    <div
    className="image-overlay rounded-circle img-cont"  ></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Kevin Xavier fregoso <br/> (
        Investor

)</h5>
      <p class="card-text">
      Desarrolla estrategias de marketing y marketing digital, 
      lleva campañas y es una de las caras en redes sociales.
      </p>
    </div>
    <div class="card-footer ">
      <p>
       
        <a href="
https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/
" className="red">
          <img src={Linkecontact} alt="face" className="col-6"/>
        </a>
        <a href= "https://twitter.com/AhtziriSunshine"className="red">
          <img src={Twitercontact} alt="face" className="col-6"/>
        </a>
        </p>
        </div>
    </div>
    <div className="card tarjetas col-4">
  <div className="card-image">
    <img
      src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
      class="card-img-top rounded-circle img-cont"
      alt="..."
    />
    <div
    className="image-overlay rounded-circle img-cont"  ></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Viridiana Uribe  <br/> (
        Coordinadora de operaciones

)</h5>
      <p class="card-text">
      Desarrolla estrategias de marketing y marketing digital, 
      lleva campañas y es una de las caras en redes sociales.
      </p>
    </div>
    <div class="card-footer ">
      <p>
       
        <a href="
https://www.linkedin.com/in/ahtziri-antonio-pe%C3%B1a-142705179/
" className="red">
          <img src={Linkecontact} alt="face" className="col-6"/>
        </a>
        <a href= "https://twitter.com/AhtziriSunshine"className="red">
          <img src={Twitercontact} alt="face" className="col-6"/>
        </a>
        </p>
        </div>
    </div>





    </div>
  </div>
</div>  
<div className="col-12 cont-btn-contac">
 <button className="btn btn-contac">¿Te gustaria unirte a nuestro equipo?</button>

</div>
               </div>
       
          </div>
          
        </div >
        
        <Footer/>
        
       </div>
       
    )
  }}


  export default Contactos;