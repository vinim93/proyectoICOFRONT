import '../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Footer from '../components/Footer';
import ProyectosComponent from "../components/ProyectosComponent";

const Proyectos = () => {
    return (
        <div className="mt-5">
            <ProyectosComponent/>
            <Footer/>
        </div>
    )
}

export default Proyectos
    