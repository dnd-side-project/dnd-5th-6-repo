import Navbar from "components/navBar/navBar";
import NavBar from "components/navBar/navBar";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./routes/main";
import Record from "./routes/record";
import Report from "./routes/report";
import NavBartwo from "routes/navbar";

function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Route exact path="/" component={Main}></Route>
        <Route path="/record" component={Record}></Route>
        <Route path="/report" component={Report}></Route>
        <Route path="/navbar" component={NavBartwo}></Route>
      </Router>
    </>
  );
}

export default App;
