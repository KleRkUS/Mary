import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import "./styles/_common.less";

import Homepage from "./components/Homepage";
import Edit from "./components/Edit";
import Instructors from "./components/Edit/components/Instructors";
import Instructor from "./components/Instructor";

class Application extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/edit/:type' render={props => (
            <Edit {...props} />
          )}/>
          <Route path='/instructor/:index' render={props => (
            <Instructor {...props}/>
          )}/>
          <Route path='/' render={props => (
            <Homepage {...props}/>
          )}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" render={ props => (
      <Application {...props}/>
    )}/>
  </BrowserRouter>,
document.getElementById("root"));