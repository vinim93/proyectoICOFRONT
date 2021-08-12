import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Video = () => {
    return (
        <div className="row">
            <div className="col-12 videosunrep mt-5 p-0">
                <iframe src="https://www.youtube.com/embed/O5c2yMxyL54" title="Sunshine Promotional" frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen/>
            </div>
        </div>
    );
};

export default Video;