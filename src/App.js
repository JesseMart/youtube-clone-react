import React, { Component } from 'react';
// import HeaderNav from './containers/HeaderNav/HeaderNav';
// import { Sidebar } from './containers/Sidebar/Sidebar';
import {Home} from './containers/Home/Home'
import { AppLayout } from './components/AppLayout/AppLayout';
import {Route, Switch} from 'react-router-dom'
import { Watch } from './containers/Watch/Watch';

class App extends Component {
  render(){
    return(
      <AppLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/watch" component={Watch} />
        </Switch>
      </AppLayout>
    );
  }
}

export default App;
