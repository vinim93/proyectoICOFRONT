import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Video = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 videosunrep mt-5 p-0">
                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/2eHFAx6K9Dg"
                            title="Sunshine Promotional" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
            </div>
        </div>
    );
};

export default Video;