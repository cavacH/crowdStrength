import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Console from '../Console/Console'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/console" component={Console}></Route>
      </Switch>
    )
  }
}

export default App;
