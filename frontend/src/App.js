import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
// We will create these two pages in a moment
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SingIn";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
}
