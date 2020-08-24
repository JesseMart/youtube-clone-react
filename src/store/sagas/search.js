import * as searchActions from '../actions/search'
import * as api from '../api/youtube-api'
import {fetchEntity} from './index'
import {REQUEST} from '../actions'
import {fork, take} from 'redux-saga/effects'

// We listen for the SEARC_FOR_VIDEOS_REQUEST action.
// Once such an action is dispatched, we extract the search query,
// amount and nextPageToken property from it and fork a worker saga. We pass all parameters to our worker saga.
export function* watchSearchForVideos() {
    while(true) {
        const{searchQuery, amount, nextPageToken} = yield take(searchActions.SEARCH_FOR_VIDEOS[REQUEST]);
        yield fork(searchForVideos, searchQuery, nextPageToken, amount);
    }
}

/////WATCHER
export function* searchForVideos(searchQuery, nextPageToken, amount) {
    const request = api.buildSearchRequest.bind(null, searchQuery, nextPageToken, amount);
    yield fetchEntity(request, searchActions.forVideos, searchQuery);
}

