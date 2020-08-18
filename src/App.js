import React, { Component } from 'react';
import HeaderNav from './containers/HeaderNav/HeaderNav';
import { Sidebar } from './containers/Sidebar/Sidebar';


class App extends Component {
  render(){
    return(
      <React.Fragment>
        <HeaderNav />
        <Sidebar />
      </React.Fragment>
    );
  }
}

export default App;
