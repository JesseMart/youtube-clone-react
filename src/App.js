import React, { Component } from 'react';
// import HeaderNav from './containers/HeaderNav/HeaderNav';
// import { Sidebar } from './containers/Sidebar/Sidebar';
import Home from './containers/Home/Home'
import { AppLayout } from './components/AppLayout/AppLayout';
import {Route, Switch, withRouter} from 'react-router-dom'
import Watch from './containers/Watch/Watch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {youtubeLibraryLoaded} from './store/actions/api'

import Trending from './containers/Trending/Trending';
import Search from './containers/Search/Search';

const API_KEY = 'AIzaSyBhU88KuRT0qhGJxWI_EcK5Vv-cx01QMtA';

class App extends Component {
  render(){
    return(
      <AppLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/results' render={() => <Search key={this.props.location.key}/>} />
          <Route path="/feed/trending" component={Trending}/>
          <Route path="/watch" render={() => <Watch key={this.props.location.key} />} />
        </Switch>
      </AppLayout>
    );
  }

  componentDidMount() {
    this.loadYoutubeAPI();
  }

  loadYoutubeAPI() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', ()=>{
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('youtube', 'v3', ()=>{
          this.props.youtubeLibraryLoaded();
        });
      });
    };
    document.body.appendChild(script);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({youtubeLibraryLoaded}, dispatch);
}


// The withRouter helper basically inserts the current URL as a prop inside our component
export default withRouter(connect(null ,mapDispatchToProps)(App));
