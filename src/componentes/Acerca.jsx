import '../App.css';
import ReactPlayer from 'react-player';
import Accesibiilidad from '../images/accesibilidad.svg';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from "react";
import moneda from "../images/moneda.png";
import Flechas from '../images/flechas.svg';
import Popper from 'popper.js';
import Privacidad from '../images/privacidad.svg';
import { BrowserRouter as Router,
  
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Redtopeer from '../images/redtopeer.svg';
import Solidez from '../images/solidez.svg';
import Garantia from '../images/garantia.svg';
import Trabajoequipo from '../images/trabajoequipo.svg';
import Footer from './Footer';




class Acerca extends Component{
  render() {
    return(
      
    
    <div className=" p-0">
          <div className=" col-12 p-0 ">
            <ReactPlayer className="videosunrep embed-responsive-item  "
              url='https://www.youtube.com/watch?v=JqyDcDPi3jg'
              controls="true"
            />
          </div>
          <div className=" row">
          <div className="col-12 p-0  cont-flechas">
            <p className="txt-sobre"><b>SUNSHINE</b> ideó una solución la cual podría resultar beneficiosa y permitir la evolución <br/> 
            digital y tecnológica, el token <b> ERC20</b> que representa una oportunidad a la libertad <br/>
             financiera. 
             <br/>
             <br/>
             <br/>
             <br/>
             <img src={Flechas} align="left"  className="  img-flechas" alt=""/>
              <span className="txt-flechas">El equipo SUN trabaja arduamente para garantizar el retorno de utilidad a los <strong> Sunholders.</strong></span>
              <br/>
              <br/>
              <br/>
              <br/>
              <h1 className="mision-titu">NUESTRA MISION </h1>
              <span className="texto-mision">Garantizar el bienestar de todos los Sunholders <br/>
              mediante el análisis de la diversificación de los <br/>
              diferentes proyectos y tener beneficios a futuro.</span>
             

</p>
<h1 className="titu-dife">¿QUE NOS DIFERENCIA?</h1>
<div className="row container-fluid ">
  
  <div className="col-6 col-lg-4  cont-diferencia">
  <img src={Accesibiilidad} alt="" className="img-acce"/>
 
   <span>  <br/> ACCESIBILIDAD</span>
   <p><br/> Cualquier persona mayor de edad
      tiene acceso a la compra de SUN,
       Sunshine puede ser tu primer acercamiento a un servicio financiero
        seguro.</p>
   
   </div>
   <div className="col-6 col-lg-4 cont-diferencia">
  <img src={Privacidad} alt="" className="img-acce"/>
 
   <span>  <br/> PRIVACIDAD</span>
   <p><br/> Sunshine nunca compartirá tus datos
    personales, datos de tus inversiones ni
     cualquier tipo de información, ya que
      el SUN corre por la Blockchain 
      Ethereum cada movimiento 
      que realices será privado y anónimo.</p>
   
   </div>
   <div className="col-6 col-lg-4 cont-diferencia">
  <img src={Redtopeer} alt="" className="img-acce"/>
 
   <span>  <br/> RED PEER-TO-PEER</span>
   <p><br/> No es necesario ningún tipo de
    intermediario para que puedas
     realizar transacciones o compras.</p>
   
   </div>
   


  
  <div className="col-6 col-lg-4 cont-diferencia">
  <img src={Solidez} alt="" className="img-acce"/>
 
   <span>  <br/> SOLIDEZ</span>
   <p><br/> El SUN es un token 
   descentralizado pues ningún 
   gobierno ni banco tiene poder 
   sobre él, Sunshine se distingue por
    la planificación estratégica que le
     da a sus recursos, y por el equipo 
     responsable y comprometido que la conforma.</p>
   
   </div>
   <div className="col-6 col-lg-4 cont-diferencia">
  <img src={Garantia} alt="" className="img-acce"/>
 
   <span>  <br/> GARANTIA</span>
   <p><br/> Sunshine garantiza retorno de
    inversión seguro una vez que los
     proyectos comiencen a ponerse en 
     marcha, o en su defecto, garantiza el
      100% de la devolución de la inversión
       en caso de que el proyecto no logre
        su alcance. </p>
   
   </div>
   <div className="col-6 col-lg-4 cont-diferencia">
  <img src={Trabajoequipo} alt="" className="img-acce"/>
 
   <span>  <br/> TRABAJO EN EQUIPO</span>
   <p><br/>Juntos seremos el mejor equipo, y así
    podremos consolidar el éxito juntos,
     basados en el trabajo del equipo 
     Sunshine y el compromiso que 
     tenemos con cada uno de nuestros
      Sunholders.</p>
   
   </div>
   

</div>
</div>
<Footer />
          </div>
         
        </div>
    
  )
}}
    

  export default Acerca
