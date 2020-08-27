import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import "./App.css";

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
