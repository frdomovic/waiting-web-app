import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StartingPage from "./StartingPage";
import LoginPage from "./Login";
import WorkerStartPage from "./WorkerStartPage";
import UserStartPage from "./UserStartPage";
import Inline from "./Inline";
import InlineDone from "./InlineDone";
import Admin from "./Admin";
import Signup from "./Signup";
import Odjeldesc from "./OdjelDesc";

import NotificationPop from "../component-popup/NotificationPop";
import PrivateRoute from "../Utils/PrivateRoute";
import PrivateRouteAdmin from "../Utils/PrivateRouteAdmin";
import PublicRoute from "../Utils/PublicRoute";

function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route path="/" exact component={StartingPage} />
            <PublicRoute path="/login" component={LoginPage} />
            <PrivateRoute path="/WorkerStartPage" component={WorkerStartPage} />
            <Route path="/InLine" component={Inline} />
            <Route path="/inlinex" component={InlineDone} />
            <Route path="/UserStartPage" component={UserStartPage} />
            <Route path="/Signup" component={Signup} />
            <Route path="/odjeldesc" component={Odjeldesc} />
            <Route path="/notificationpop" component={NotificationPop} />
            <PrivateRouteAdmin path="/admindash" component={Admin} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;