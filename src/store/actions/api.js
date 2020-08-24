// This is where we’ll put all the actions that are related to setting up our client library
import {createAction} from './index';

export const YOUTUBE_LIBRARY_LOADED = 'YOUTUBE_LIBRARY_LOADED';
export const youtubeLibraryLoaded = createAction.bind(null, YOUTUBE_LIBRARY_LOADED);
//  The binding functionality will return a new function and pre-assign the parameters
