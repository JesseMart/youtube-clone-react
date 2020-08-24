import React from 'react';
import './Trending.scss';
// import {VideoPreview} from '../../components/VideoPreview/VideoPreview';
// import {Sidebar} from '../Sidebar/Sidebar';
import { getMostPopularVideos, allMostPopularVideosLoaded, getMostPopularVideosNextPageToken } from '../../store/reducers/videos';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { bindActionCreators } from 'redux';
import * as videoActions from '../../store/actions/video'
import {connect} from 'react-redux'
// import { InfiniteScroll } from '../../components/InfiniteScroll/InfiniteScroll';
import {VideoList} from '../../components/VideoList/VideoList';

export class Trending extends React.Component {

    componentDidMount() {
    this.fetchTrendingVideos();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.youtubeLibraryLoaded !== this.props.youtubeLibraryLoaded) {
            this.fetchTrendingVideos();
        }
    }
    fetchTrendingVideos() {
        if(this.props.youtubeLibraryLoaded) {
            this.props.fetchMostPopularVideos(20, true);
        }
    }
    
    // getVideoPreviews() {
    //     return this.props.videos.map(video => (
    //         <VideoPreview horizontal={true} expanded={true} video={video} key={video.id} pathname={'/watch'}
    //                     search={'?v=' + video.id}/>)
    //     );
    // }
    shouldShowLoader() {
        return !this.props.allMostPopularVideosLoaded;
    }
    fetchMoreVideos = () => {
        const {nextPageToken} = this.props;
        if ( this.props.youtubeLibraryLoaded && nextPageToken) {
            this.props.fetchMostPopularVideos(12, true, nextPageToken);
        };
    }

    render() {
        
        const loaderActive = this.shouldShowLoader();
        return (<VideoList
            bottomReachedCallback={this.fetchMoreVideos}
            showLoader={loaderActive}
            videos={this.props.videos}/>);
    }
}

function mapStateToProps(state) {
    return {
        videos : getMostPopularVideos(state),
        youtubeLibraryLoaded : getYoutubeLibraryLoaded(state),
        allMostPopularVideosLoaded : allMostPopularVideosLoaded(state),
        nextPageToken : getMostPopularVideosNextPageToken(state),
    }
}
function mapDispatchToProps(dispatch) {
    const fetchMostPopularVideos = videoActions.mostPopular.request;
    return bindActionCreators({fetchMostPopularVideos}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trending);