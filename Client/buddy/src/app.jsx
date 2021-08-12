import Navbar from "components/navBar/navBar";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./routes/main";
import Record from "./routes/record";
import Report from "./routes/report";
import Post from "./routes/Post";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/record" component={Record}></Route>
        <Route path="/record/post" component={Post}></Route>
        <Route path="/report" component={Report}></Route>
      </Router>
    </>
  );
}

export default App;
