import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../css/app.css";

import StartingPage from "./StartingPage";
import LoginPage from "./Login";
import WorkerStartPage from "./WorkerStartPage";
import UserStartPage from "./UserStartPage";
import InLine from "./InLine";
import InLineDone from "./InLineDone";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";
import NotificationPop from "../component-popup/NotificationPop";
import Signup from "./Signup";
import Odjeldesc from "./OdjelDesc"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={StartingPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/WorkerStartPage" component={WorkerStartPage} />
          <Route path="/UserStartPage" component={UserStartPage} />
          <Route path="/InLine" component={InLine} />
          <Route path="/inlinex" component={InLineDone} />
          <Route path="/Signup" component={Signup} />
          <Route path="/odjeldesc" component={Odjeldesc} />
          <Route path="/notificationpop" component={NotificationPop} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;


/*const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const token = getToken();
    if(!token){
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        token: token,
      }),
    };

  const response = await fetch(
      "https://stormy-reef-35557.herokuapp.com/prijava/djelatnik",
      requestOptions)
  .then( (res) =>{
      setUserSession(res.text(), res.username);
      setAuthLoading(false);
  }).catch(error => {
    removeUserSession();
    setAuthLoading(false);
  });

  }, [])
    
  if(authLoading && getToken()){
    return <div className="content">Checking Authentication...</div>
  }*/
