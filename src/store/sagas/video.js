import {call ,fork, take, all, put, takeEvery} from 'redux-saga/effects';
import * as api from '../api/youtube-api';
import * as videoActions from '../actions/video';
import {REQUEST} from '../actions';
import {fetchEntity, ignoreErrors} from './index';


export const fetchVideoCategories = fetchEntity.bind(null, api.buildVideoCategoriesRequest, videoActions.categories);

export function* fetchMostPopularVideos(amount, loadDescription, nextPageToken) {
    const request = api.buildMostPopularVideosRequest.bind(null,amount, loadDescription, nextPageToken);
    yield fetchEntity(request, videoActions.mostPopular);
}

//The parameter "categories" has an array of category id's, or each id we build a request with "api.buildMostPopular..."
export function* fetchMostPopularVideosByCategory(categories) {
    const requests = categories.map(category => {
        const wrapper = ignoreErrors(api.buildMostPopularVideosRequest, 12, false, null, category);
        return call(wrapper);
        });
        try {
        const response = yield all(requests);
        yield put(videoActions.mostPopularByCategory.success(response, categories));
        } catch (error) {
        yield put(videoActions.mostPopularByCategory.failure(error));
        }
}
//above ^^ if the "all" effect which executes all request, fails one request then all the request fail ^^



// ------------------WATCHERS-----------------------
export function* watchVideoCategories() {
    yield takeEvery(videoActions.VIDEO_CATEGORIES[REQUEST], fetchVideoCategories);
}

export function* watchMostPopularVideosByCategory(){
    while(true) {
        const {categories} = yield take(videoActions.MOST_POPULAR_BY_CATEGORY[REQUEST]);
        yield fork(fetchMostPopularVideosByCategory, categories);
    }
}

export function* watchMostPopularVideos() {
    while(true) {
        const {amount, loadDescription, nextPageToken} = yield take(videoActions.MOST_POPULAR[REQUEST]);
        yield fork(fetchMostPopularVideos, amount, loadDescription,nextPageToken);
    }
}

