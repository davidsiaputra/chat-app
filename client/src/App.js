import React from "react";
import { Switch, Route } from "react-router-dom";

import SignInPage from "./pages/sign-in/sign-in.component";
import SignUpPage from "./pages/sign-up/sign-up.component";
import Homepage from "./pages/homepage/homepage.component";
import Dashboard from "./pages/dashboard/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/:roomId" component={Dashboard} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
