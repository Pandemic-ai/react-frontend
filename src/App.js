import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mapp from "./Map/Map";
// import Header from "./Layout/Header";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Mapp} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}

export default App;
