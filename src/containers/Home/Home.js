
import React from 'react';
import './Home.scss';
import {getYoutubeLibraryLoaded} from '../../store/reducers/api';
import * as videoActions from '../../store/actions/video';
import {Sidebar} from '../Sidebar/Sidebar';
import HomeContent from './HomeContent/HomeContent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVideoCategoryIds, videoCategoriesLoaded, videosByCategoryLoaded } from '../../store/reducers/videos';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryIndex : 0,
    };
  }

  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchCategoriesAndMostPopularVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchCategoriesAndMostPopularVideos();
    } else if (this.props.videoCategories !== prevProps.videoCategories){
      this.fetchVideosByCategory();
    }
  }
  // The fetchVideosByCategory function grabs three new category ids,
  //  dispatches the the action to fetch the most popular videos for these
  //   three category ids and updates the component’s state.
  fetchVideosByCategory() {
    const categoryStartIndex = this.state.categoryIndex;
    const categories = this.props.videoCategories.slice(categoryStartIndex, categoryStartIndex + 3);
    this.props.fetchMostPopularVideosByCategory(categories);
    this.setState(prevState => {
      return {
        categoryIndex : prevState.categoryIndex + 3,
      };
    });
  }

  fetchCategoriesAndMostPopularVideos() {
    this.props.fetchMostPopularVideos();
    this.props.fetchVideoCategories();
  }
  bottomReachedCallBack = () => {
    if (!this.props.videoCategoriesLoaded) {
      return;
    }
    this.fetchVideosByCategory();
  };
  shouldShowLoader() {
    if(this.props.videoCategoriesLoaded && this.props.videosByCategoryLoaded) {
      return this.state.categoryIndex < this.props.videoCategories.length;
    }
    return false;
  }

    render() {
      return (
        <React.Fragment>
          <Sidebar/>
          <HomeContent bottomReachedCallBack={this.bottomReachedCallBack} showLoader={this.shouldShowLoader()} />
        </React.Fragment>
      );
    }
}


function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded : getYoutubeLibraryLoaded(state),
    videoCategories : getVideoCategoryIds(state),
    videoCategoriesLoaded : videoCategoriesLoaded(state),
    videosByCategoryLoaded : videosByCategoryLoaded(state),
  };
}

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  const fetchVideoCategories = videoActions.categories.request;
  const fetchMostPopularVideosByCategory = videoActions.mostPopularByCategory.request;
  return bindActionCreators({fetchMostPopularVideos, fetchVideoCategories, fetchMostPopularVideosByCategory}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
