// this file will handle the state changes that the actions of one particular file trigger
import {YOUTUBE_LIBRARY_LOADED} from '../actions/api';

const initialState = {
    libraryLoaded : false,
};

export default function(state=initialState, action) {
    switch(action.type) {
        case YOUTUBE_LIBRARY_LOADED:
            return {
                libraryLoaded : true,
            }
        default : 
            return state;
    }
}
// This is a selector which makes our code more maintained and extendable by accesing state directly
// without having to spend so much time refactoring mapStateToProps 
export const getYoutubeLibraryLoaded = (state) => state.api.libraryLoaded;