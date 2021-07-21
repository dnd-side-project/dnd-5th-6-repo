import React from "react";
import NaverLogin from "./components/login/naverLogin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./routes/main";
import Record from "./routes/record";
import Report from "./routes/report";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main}></Route>
      <Route path="/record" component={Record}></Route>
      <Route path="/report" component={Report}></Route>
    </Router>
  );
}

export default App;
