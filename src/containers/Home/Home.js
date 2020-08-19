
import React from 'react';
import './Home.scss';
import {VideoGrid} from '../../components/VideoGrid/VideoGrid';
import { Sidebar } from '../Sidebar/Sidebar';


export class Home extends React.Component {
    render() {
        return (
        <React.Fragment>
            <Sidebar />
            <div className='home'>
                <div className="responsive-video-grid-container">
                    <VideoGrid title='Trending'/>
                    <VideoGrid title='Autos & Vehicles' hideDivider={true}/>
                </div>
            </div>
        </React.Fragment>
        );
    }
}
