import React from 'react';

// import { RelatedVideos } from '../../components/RelatedVideos/RelatedVideos';
// import { Video } from '../../components/Video/Video';
// // import { VideoPreview } from '../../components/VideoPreview/VideoPreview';
// import { VideoMetadata } from '../../components/VideoMetadata/VideoMetadata'
// import { VideoInfoBox } from '../../components/VideoInfoBox/VideoInfoBox';
// import { Comments } from '../Comments/Comments';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { bindActionCreators } from 'redux';
import * as watchActions from '../../store/actions/watch'
import * as commentActions from '../../store/actions/comment';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import WatchContent from './WatchContent/WatchContent';
import { getSearchParam } from '../../services/url';
import { getChannelId } from '../../store/reducers/videos';
import { getCommentNextPageToken } from '../../store/reducers/comments';

export class Watch extends React.Component {

    // -------- This function extracs the video id that was clicked
    getVideoId() {
        return getSearchParam(this.props.location, 'v');
    }

    componentDidMount() {
        if(this.props.youtubeLibraryLoaded) {
            this.fetchWatchContent();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
            this.fetchWatchContent();
        }
    }

    // The fetchWatchContent function extracts the video id from the current URL.
    //  After that it starts the fetching process by calling fetchWatchDetails.
    fetchWatchContent() {
        const videoId = this.getVideoId();
        if(!videoId) {
            this.props.history.push('/');
        }
        this.props.fetchWatchDetails(videoId, this.props.channelId);
    }
    fetchMoreComments = () => {
        if (this.props.nextPageToken) {
            this.props.fetchCommentThread(this.getVideoId(), this.props.nextPageToken);
        }
    };
    

    render(){
        const videoId = this.getVideoId();
        return(
            <WatchContent videoId={videoId} 
            channelId={this.props.channelId} 
            bottomReachedCallBack={this.fetchMoreComments}
            nextPageToken={this.props.nextPageToken}
            />
        );
    }
}
function mapStateToProps(state, props) {
    return {
        youtubeLibraryLoaded : getYoutubeLibraryLoaded(state),
        channelId : getChannelId(state, props.location, 'v'),
        nextPageToken : getCommentNextPageToken(state, props.location)
    };
}
function mapDispatchToProps(dispatch) {
    const fetchWatchDetails = watchActions.details.request;
    const fetchCommentThread = commentActions.thread.request;
    return bindActionCreators({fetchWatchDetails, fetchCommentThread}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));