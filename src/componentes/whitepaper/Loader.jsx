import React from 'react';
import'../../App.css';


 const Loader=({isLoading})=>{

    if(!isLoading) return null;
     return (
     <div id='loader' className=" loadercontainer d-flex justify-content-center align-items-center flex-column App-logo">
         <img src="https://react-pdf.org/images/logo.png" alt="loader" className="mb-5 Logo-loader"/>
         <p>Loading ...</p>

     </div>
 
)
}

export default Loader;