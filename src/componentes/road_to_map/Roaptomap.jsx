import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from "react";
import Footer from '../footer/Footer';
import maparoad from '../../images/maparoad.svg';

class RoaptoMapa extends Component{
    render() {
      return(

            <div className=" road ">
              <div className="row ">
                
                <p className="text-roap-map  ">
                <h1 align="center">ROAD MAP</h1>
                  <p className="text-roap-1">Planificación ICO 
                             Proyecto SUN</p>
                  <p className="text-roap-2">Lanzamiento de ICO 
                        1er periodo de venta         
                           token SUN</p> 
                           <p className="text-roap-3">
                           Creación de la 
                            página ICO SUN
                             </p>   
                             <p className="text-roap-4">2do periodo de 
                                   venta token SUN</p>  
                                   <p className="text-roap-5">3er periodo de 
                                          venta token SUN </p> 
                                          <p className="text-roap-6">Inicio proyecto
                                                                         Exchange</p>  
                                    <p className="text-roap-7">Cierre del 
                                                                   proyecto ICO </p> 
                                    <p className="text-roap-8">Inicio al proyecto
                                                                                 Cripto Banco</p>    
                </p>
              <img src={maparoad} className="img-fluid maparoad " alt=""/>
              </div>
              <Footer/>
            </div>
            
        
      )
    }}


    export default RoaptoMapa;