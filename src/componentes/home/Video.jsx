import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Flip from 'react-reveal/Flip';

const Video = () => {
    return (
        <div className="row   ">
  <Flip right>
            <div className="col-12 videosunrep mt-5 p-0">
          
                <iframe src="https://www.youtube.com/embed/O5c2yMxyL54" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                       
            </div>
            </Flip>

        </div>
    );
};

export default Video;