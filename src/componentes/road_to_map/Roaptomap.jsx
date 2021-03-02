import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from "react";
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