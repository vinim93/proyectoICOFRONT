import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Video = () => {
    return (
        <div className="row   ">

            <div className="col-12 videosunrep mt-5 p-0">
          
                <iframe src="https://www.youtube.com/embed/2eHFAx6K9Dg" title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                       
            </div>
            

        </div>
    );
};

export default Video;