import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./routes/main";
import Record from "./routes/record";
import Report from "./routes/report";
import Post from "./routes/post";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./apollo/queries/login/login";
import Login from "./routes/login";
import PrivateRoute from "./services/PrivateRoute";
import MyProfile from "./components/myProfile/myProfile";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { WebLogo } from "icons";

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  console.log({ isLoggedIn });
  return (
    <>
      <BrowserView>
        <div style={{ marginLeft: 750, marginTop: 280 }}>
          <WebLogo></WebLogo>
        </div>
        <p style={{ marginLeft: 680 }}>
          Pace buudy는 모바일 웹에서만 사용할 수 있어요!
        </p>
      </BrowserView>
      <MobileView>
        <Router>
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route path="/login" component={Login}></Route>
            <Route exact path="/record" component={Record}></Route>
            <PrivateRoute path="/record/post" component={Post}></PrivateRoute>
            <PrivateRoute path="/report" component={Report}></PrivateRoute>
            <PrivateRoute path="/myPage" component={MyProfile}></PrivateRoute>
          </Switch>
        </Router>
      </MobileView>
    </>
  );
}

export default App;
