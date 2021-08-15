import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./routes/main";
import Record from "./routes/record";
import Report from "./routes/report";
import Post from "./routes/post";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./apollo/queries/login/login";
import Login from "./routes/login";

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  console.log(isLoggedIn);
  return (
    <>
      <Router>
        <Route exact path="/" component={Main}></Route>
        <Route path="/login" component={Login}></Route>
        <Route exact path="/record" component={Record}></Route>
        <Route path="/record/post" component={Post}></Route>
        <Route path="/report" component={Report}></Route>
      </Router>
    </>
  );
}

export default App;
