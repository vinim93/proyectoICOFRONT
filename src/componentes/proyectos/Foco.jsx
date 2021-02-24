import '../../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component, useEffect, useState} from 'react';
import Footer from '../footer/Footer';
import Proyectos from "./Proyectos";

const Foco = () => {
    return (

        <div className="mt-5">
            <Proyectos />
            <Footer/>
        </div>

    )
}

export default Foco
    