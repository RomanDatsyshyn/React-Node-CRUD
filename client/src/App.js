import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Add from "./components/Add";
import List from "./components/List";
import Edit from "./components/Edit";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/add" component={Add} />
          <Route path="/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}

export default App;
