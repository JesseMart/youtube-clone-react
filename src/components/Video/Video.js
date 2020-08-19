import React from 'react';
import './Video.scss';

const BASED_EMBED_URL = 'https://www.youtube.com/embed/';

export function Video(props){
    if(!props.id) {
        return null;
    }
    // add "?autoplay=1" at the dn of props.id
    const embedURL = `${BASED_EMBED_URL}${props.id}`;

    return(
        <div className="video-container">
            <div className="video">
                <iframe className="video-player" width={'560'} height={'315'} src={embedURL} frameBorder='0'
                allow='autoplay; encrypted-media' allowFullScreen title={'video'}/>
            </div>    
        </div>
    );
}