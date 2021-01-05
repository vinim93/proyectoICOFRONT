import '../App.css';


import 'bootstrap/dist/css/bootstrap.css';
import logonav from '../icons/logonav.svg';
import React, { Component } from 'react';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Acerca from "./Acerca";
import Home from './Home';
import Map from './Roaptomap';
import Blog from './Blog';
import Contactos from './Contactos';
import Proyectos from './Proyectos';

export default class Navigation extends Component {
  render() {
    return (
      < nav className="navbar navbar-expand-lg navbar-dark fixed-top ">
        <div className="container-fluid">
          <NavLink className="navbar-brand navegacion  " to="/">
            <img className="d-none d-xl-block d-lg-block  " src={logonav} />
          </NavLink>
          <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">


            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item ">

                <NavLink className="navbar-brand   nav-link navegacion" 
                  to="./Acerca">Acerca de
             </NavLink>
              </li>
              <li className="nav-item ">

                <NavLink className="navbar-brand  nav-link navegacion" tap-index="-1" activeClassName="active" area-disabled="true" 
                to="/Roaptomap">Road to Map
            </NavLink>
              </li>
              <li className="nav-item ">

                <NavLink className="navbar-brand nav-link navegacion" activeClassName="active" area-disabled="true"
                 to="./Proyectos">Proyectos
            </NavLink>
              </li>

              <li className="nav-item ">

                <NavLink className="navbar-brand nav-link navegacion" activeClassName="active" area-disabled="true" to="/Blog">Blog
            </NavLink>
              </li>
              <li className="nav-item ">

                <NavLink className="navbar-brand  nav-link navegacion" activeClassName="active" area-disabled="true" to="/Contactos">Contactos
            </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0  ">
              <button type="button" className=" navsesion btn btn-link">Inicia Sesion</button>
              <button type="button" className=" navsesion btn btn-link">Crea tu cuenta</button>



            </form>



          </div>

        </div>
      </nav>
    )
  }
}
