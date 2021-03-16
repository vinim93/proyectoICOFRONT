import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Video = () => {
    return (
        <div className="row   ">
            <div className="col-12 videosunrep ">
                <iframe src="https://www.youtube.com/embed/UZvxWOiruss" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>

            </div>
        </div>
    );
};

export default Video;