import React from 'react'

import './Comment.scss'
import { Image, Button } from 'semantic-ui-react'
import {Rating} from '../../../components/Rating/Rating'


export default function Comment() {
    return (
        <div className="comment">
            <Image className="user-image" src='http://via.placeholder.com/48x48' circular />
            <div>
                <div className="user-name">User Name</div>
                <span>Comment Text</span>
                <div className="comment-actions">
                    <Rating likeCount={1} /><Button size="mini" compact>REPLY</Button>
                </div>
            </div>
        </div>
    );
}
