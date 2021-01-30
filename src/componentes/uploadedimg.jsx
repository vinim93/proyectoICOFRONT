import ReactDOM from 'react-dom';
import firebase  from 'firebase';
import {db, storage} from './firebase';
import React, { Component,useState } from 'react';

import 'firebase/firestore';
import Navigation from './Navigation';


var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var contraseña = ""
  var i=0;
  for (i=0; i<20; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  
var aleatorio = (Math.random());


const FileUpload =()=>{
    const[picture, setPicture]= useState(null);
    const [uploadValue, setUploadValue]= useState(0);
    
    
    
    




const handleOnChange=(e)=>{
    const file=e.target.files[0]
    const storageRef= firebase.storage().ref(`INE/${file.name}${contraseña} ${aleatorio*aleatorio}`);
    const task = storageRef.put(file);
     
  
    
     task.on('state_changed', (snapshot) =>{
        var percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100
        setUploadValue(percentage)
      
        
     }, error=>{
            console.log(error.message)
        }, ()=>{
            console.log(task.snapshot);
            storageRef.getDownloadURL().then(url => {
                setPicture(url                     
                )
           
            })
            storageRef.getDownloadURL().then(docurl => {
                setPicture(
                     docurl 
                                              
                )
                
            })
            
        });
   

}
 
console.log(picture);


    return(
     

        <div className=" form-group  form-registro col-12 ">
            
            <progress value={uploadValue} max="100">
                {uploadValue}%
            </progress>
            <p  className="btn form-regi">{`${uploadValue}%`}</p>    
                <br/>
                             
                <input type="file" id="cameraine" className=" d-none" 
                accept="image/*"
                 onChange={handleOnChange}> 
                </input>
                     
                <input type="file" id="pdfine" 
                accept="application/pdf" className="d-none" 
                onChange={handleOnChange}> 
                </input>
                
                

               <div style={{position:'absolute', justifycontent:"center",bottom:'10px',left:'50vw'
            
            }} >
                           <object 
                data={picture}
                type="application/pdf"
                height="100%"
                width="100%"
                >

                </object>
                    </div> 
                
                
                
                <img src={picture}  width="90" className="" alt=""/>
                             
                
             
                
        </div>
        
               
    )

        }

 


export default FileUpload ;