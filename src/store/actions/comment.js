import { createRequestTypes, createAction, SUCCESS, REQUEST, FAILURE } from './index';

export const COMMENT_THREAD = createRequestTypes('COMMENT_THREAD');

// The first parameter is the video id for which we’d like to fetch our comment threads.
//  The second parameter is the next page token, in case we want to gradually load more comments.
export const thread = {
    request : (videoId, nextPageToken) => createAction(COMMENT_THREAD[REQUEST], {videoId, nextPageToken}),
    success : (response, videoId) => createAction(COMMENT_THREAD[SUCCESS], {response, videoId}),
    failure : (response) => createAction(COMMENT_THREAD[FAILURE], {response}),
}