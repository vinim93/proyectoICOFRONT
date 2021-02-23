import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Video = () => {
    return (
        <div className="row   ">
            <div className="col-12 videosunrep embed-responsive embed-responsive-16by9">
                <iframe className="  embed-responsive-item" src="https://www.youtube.com/embed/JqyDcDPi3jg"
                        allowFullScreen></iframe>

            </div>
        </div>
    );
};

export default Video;