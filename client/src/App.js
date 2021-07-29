import { Switch, Route } from "react-router-dom";

import SignInPage from "./pages/sign-in/sign-in.component";
import Homepage from "./pages/homepage/homepage.component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
