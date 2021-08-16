import React from "react";
import RecordFeed from "./../components/recordFeed/recordFeed";
import { IS_LOGGED_IN } from "./../apollo/queries/login/login";
import { useQuery } from "@apollo/client";

function Record() {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return <RecordFeed isLoggedIn={isLoggedIn}></RecordFeed>;
}

export default Record;
