import React from 'react'
import './Rating.scss'
import { Progress, Icon } from 'semantic-ui-react';


export function Rating(props) {

    let progress = null;
    if(props.likeCount && props.dislikeCount) {
        const percent = 100 * (props.likeCount / (props.likeCount + props.dislikeCount));
        progress = <Progress  className="progress" percent={percent} size="tiny" />;
    }

    return (
        <div className="rating">
            <div className="thumbs-up">
                <Icon name="thumbs outline up" />
                <span> {props.likeCount} </span>
            </div>
            <div className="thumbs-down">
                <Icon className="thumbs outline down" />
                <span>{props.dislikeCount}</span>
            </div>
            {progress}
        </div>
    )
}
