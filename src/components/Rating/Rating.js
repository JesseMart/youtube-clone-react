import React from 'react'
import './Rating.scss'
import { Progress, Icon } from 'semantic-ui-react';
import { getShortNumberString } from '../../services/number/number-format';


export function Rating(props) {
    let rating = null;
    let likeCount = props.likeCount !== 0 ? props.likeCount : null;
    let dislikeCount = null;
    // let progress = null;


    if(props.likeCount && props.dislikeCount) {
        const amountLikes = parseFloat(props.likeCount);
        const amountDislikes = parseFloat(props.dislikeCount);
        const percentPositiveRatings = 100.0 * (amountLikes / (amountLikes + amountDislikes));

        // Now that we have calculated the percentage, we bring the numbers into a better readable format
        likeCount = getShortNumberString(amountLikes);
        dislikeCount = getShortNumberString(amountDislikes);
        rating = <Progress percent={percentPositiveRatings} size="tiny" />;
    }

    return (
        <div className="rating">
            <div >
                <Icon name="thumbs outline up" />
                <span> {likeCount} </span>
            </div>
            <div >
                <Icon className="thumbs outline down" />
                <span>{dislikeCount}</span>
            </div>
            {rating}
        </div>
    )
}
