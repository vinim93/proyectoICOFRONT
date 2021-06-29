import '../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component, useEffect, useState} from 'react';
import Footer from '../components/Footer';
import ProyectosComponent from "../components/ProyectosComponent";
import Roll from 'react-reveal/Roll';



const Proyectos = () => {
    return (
        
        <div className="mt-5">
           
            <ProyectosComponent />
           
            <Footer/>
        </div>
       
    )
}

export default Proyectos
    