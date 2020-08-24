import {fork, take} from 'redux-saga/effects';
import {REQUEST} from '../actions'
import * as commentActions from '../actions/comment'
import * as api from '../api/youtube-api'
import {fetchEntity} from './index';


// Our worker saga uses our buildCommentThreadRequest function to construct the appropriate request. 
// We then use the fetchEntity function to reach out to the network.
export function* fetchCommentThread(videoId, nextPageToken) {
    const request = api.buildCommentThreadRequest.bind(null, videoId, nextPageToken);
    yield fetchEntity(request, commentActions.thread, videoId);
}

// here we listen tot he COMMENT_THREAD_REQUEST actio and once the action
// is dispatched, the video id is extracted and the nextPageToken from its
// paytload and fork a worker saga
export function* watchCommentThread() {
    while(true) {
        const {videoId, nextPageToken} = yield take(commentActions.COMMENT_THREAD[REQUEST]);
        yield fork(fetchCommentThread, videoId, nextPageToken);
    }
}