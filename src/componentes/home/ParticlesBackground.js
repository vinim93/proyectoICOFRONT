import React from 'react';
import '../../App.css';
import particlesConfig from '../config/Particles-config.js';
import Particles from 'react-particles-js';




export default function ParticleBackground() {
    return(

        <Particles params={particlesConfig}></Particles>
    );
}