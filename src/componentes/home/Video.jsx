import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Video = () => {
    return (
        <div className="row   ">
            <div className="col-12 videosunrep embed-responsive embed-responsive-16by9">
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/JqyDcDPi3jg" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>

            </div>
        </div>
    );
};

export default Video;