import React from "react";
import { GoBack } from "../../icons";
import { useHistory } from "react-router";

function GoBackBtn() {
  const history = useHistory();
  return <GoBack onClick={() => history.go(-1)}></GoBack>;
}

export default GoBackBtn;
