import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AuthLander from './components/auth/lander';
import MainLander from './components/pages/mainLander';

function App() {
  return (
    <Router>
      <Switch>
        <Route active exact path="/" component={AuthLander}/>
        <Route path="/portal" component={MainLander}/>
      </Switch>
  </Router>
  );
}

export default App;
