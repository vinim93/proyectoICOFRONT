import '../App.css';
import ReactDOM from "react-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../icons/logonav.svg';
import React, { Component } from 'react';
import Popper from 'popper.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import walpaper from '../images/banner.svg';
import moneda from "../images/moneda.png";
import transp from '../images/transparante.png';
import contador from "./cuentaregresiva";
import rectangulo1 from '../images/rectangulo1.png';
import tecnologias from '../images/tecnologias.svg';
import Pdf from './Pdf';
import facil from '../images/FACIL.png';
import fondofoco from '../images/fondo-foco.png';
import seguro from '../images/seguro.png';
import ReactPlayer from 'react-player';
import Engranaje from '../images/engranaje.svg';
import Engrane1 from '../images/engrane1.svg';
import Engrane2 from '../images/engrane2.svg';
import Engrane3 from '../images/engrane3.svg';
import Engrane4 from '../images/engrane4.svg';
import Engrane5 from '../images/engrane5.svg';
import Engrane6 from '../images/engrane6.svg';
import Engrane7 from '../images/engrane7.svg';
import Mapa from '../images/mapa.svg';
import Textmoneda from '../images/textmoneda.svg';
import Nuestraapp from '../images/nuestraapp.svg';
import Fondoedi from '../images/fondoedi.svg';
import Wallet from '../images/wallet.svg';
import Openzepp from '../images/openzepp.svg';
import Github from '../images/github.svg';
import Hardwallet from '../images/hardwallet.svg';
import Imgpreg from '../images/imgpreg.svg';
import Depmason from '../images/depmason.svg';
import Depmenos from '../images/depmenos.svg';
import changeImage from './Imgcambio.js';
import changeImageA from './ImgcambioA.js';
import changeImageB from './ImgcambioB.js';
import changeImageC from './ImgcambioC.js';
import changeImageD from './ImgcambioD.js';
import Google from '../images/google.png';
import Apple from '../images/apple.png';
import Footer from './Footer';
import Newlesters from '../images/newlesters.svg';
import Celsym from '../images/celsym.svg';
import Celhawk from '../images/celhawk.svg';
import Cellyon from '../images/cellyon.svg';





class Foco extends Component{
    render() {
      return(
          <div className="row  fondosec3 ">
        <div className=" container-fluid sec6  ">
        <span className="titulo6 ">Proyectos</span>
      </div>
      <div className="  container-fluid focsec6">
      <div className="row  contenedor-engra ">
        <div className="col align-self-start ">
          <button className="btn btn-primary radiofoc radiofon-sym fap-btn2 " type="button" data-toggle="modal" 
          data-target=".bd-example-modal-lg">
          <div className="modal  fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
<div className="modal-dialog modal-cont  modal-lg">
<div className=" modal-content modal-sym "> 
<div className="row container-fluid ">

<div className="col-3">

<img src={Celsym} alt="" className="modal-imgsym img-fluid " align="left" />
</div>
<div className="col-9">

<span className="modal-titu"> Proyecto Symphony  <p className="modal-text">(Banco)<p className="modal-cuerpo">
Consiste en crear un banco digital con resguardo de criptomonedas, generar cuenta 

de ahorro, préstamos con pago de intereses, seguros de vida, médicos y de autos, 
 integrar portafolios crypto  financieros, los cuales generen rendimiento a los usuarios
   de la plataforma Symphony que posean  con una cuenta de ahorro, la posibilidad de  hacer 
   pagos con tarjeta que contenga el saldo en  criptomonedas como si se tratara de una moneda fiduciaria,
incluir beneficios a los tenedores de  servicios financieros  Symphony; estructurando los servicios con especialistas 
financieros que cuentan con experiencia en el rubro de las crypto finanzas. 
</p></p> 


</span>

</div>
</div>

</div>
</div>
</div>

            <svg className="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg"
              width="70mm" height="70mm" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50"
                fill="transparent" />
            </svg>SYMPHONY</button> <p className="textsyn"><br />PROYECTO SYMPHONY</p><p className="mintext">(Banco)</p> </div>

        <div className="col align-self-center">
          <button className="btn radiofoc radiofon-sym fap-btn2  fap-btn3 "type="button" data-toggle="modal"
          data-target=".bd-example-modal-lg3">
            <div className="modal  fade bd-example-modal-lg3" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
<div className="modal-dialog modal-cont  modal-lg">
<div className=" modal-content modal-sym "> 
<div className="row container-fluid ">

<div className="col-3">

<img src={Celhawk} alt="" className="modal-imgsym img-fluid " align="left" />
</div>
<div className="col-9">

<span className="modal-titu"> Proyecto HAWK  <p className="modal-text">(Exchange)<p className="modal-cuerpo">
Este proyecto consiste en un espacio virtual y dinámico que complementa el desarrollo de nuestra propia Exchange 
de criptomonedas y la campaña publicitaria, con el cual se ofrecerá el servicio de compra y venta de criptomonedas. 
Se le permite al trader hacer una participación en el mercado,
que a su vez le generará ganancias ya que existen las variaciones de dichas criptos. 
</p></p> 


</span>

</div>
</div>

</div>
</div>
</div>




            <svg className="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg"
              width="70mm" height="70mm" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50"
                fill="transparent" />
            </svg>HAWK</button>
            <p className="textsyn2"><br />PROYECTO HAWK</p><p className=" mintext2">(Exchange)</p></div>
        <div className="col align-self-end">
          <button className="btn radiofoc radiofon-sym fap-btn2 fap-btn4  "
          type="button" data-toggle="modal" 
           data-target=".bd-example-modal-lg2">
          <div className="modal  fade bd-example-modal-lg2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
<div className="modal-dialog modal-cont  modal-lg">
<div className=" modal-content modal-sym "> 
<div className="row container-fluid ">

<div className="col-3">

<img src={Cellyon} alt="" className="modal-imgsym img-fluid " align="left" />
</div>
<div className="col-9">

<span className="modal-titu"> Proyecto Lion  <p className="modal-text"> (E-COMMERCE)<p className="modal-cuerpo">
Consiste en el desarrollo de software propio y de terceros,
en el desarrollo propio se buscará el desarrollo de aplicaciones
 de servicios con la finalidad de incorporar el mundo de las criptomonedas
  al ámbito cotidiano como puede ser el caso de habilitar plataformas donde 
  se puedan comercializar artículos, de la misma manera una plataforma donde l
  as personas puedan conseguir trabajos con el pago de criptomonedas 
de los empleadores, así obteniendo una mayor circulación de criptomoneda. 
</p></p> 


</span>

</div>
</div>

</div>
</div>
</div>          
            <svg className="svg1" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="70mm" height="70mm" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50"
              fill="transparent" />
          </svg>LYON</button>
          <p className="textsyn3"><br />PROYECTO LYON</p><p className=" mintext3">(E-commerce)</p></div>
          <img src={Engranaje}alt="" className="engranaje"/> 

          <div className="row">
          <div className="col-6 ">
        <img src={Engrane1} alt="" className="engrane1foc engranaje"/>
        <img src={Engrane2} alt="" className="engrane2foc engranaje"/>
        <img src={Engrane3} alt="" className="engrane3foc engranaje"/>
        <img src={Engrane4} alt="" className="engrane4foc engranaje"/>
        <img src={Engrane5} alt="" className="engrane5foc engranaje"/>
        <img src={Engrane6} alt="" className="engrane6foc engranaje"/>
        <img src={Engrane7} alt="" className="engrane7foc engranaje"/>
        
      </div>
      </div>
      
      </div>
    
      
      
      
    </div>
    </div>
        )
    }}
        
    
      export default Foco
    