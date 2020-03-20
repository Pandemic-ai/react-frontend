import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Mapp from "./Map/Map";
import Global from "./Global/Global";
import Main from "./Layout/Main";
// import Header from "./Layout/Header";
import "./App.css";

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        localStorage.getItem("Token") ? (
          <Component {...innerProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
class App extends Component {
  render() {
    return (
      <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <PrivateRoute path="/mapview/" component={Mapp} />
            <PrivateRoute path="/global/" component={Global} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}

export default App;
