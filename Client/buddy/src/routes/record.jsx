import Calendar from "components/calendar/calendar";
import React from "react";
import NavBar from "./../components/navBar/navBar";
import { RecordBtn } from "./../icons";

function Record() {
  return (
    <>
      <div>
        <div>기록</div>
        <RecordBtn></RecordBtn>
      </div>
    </>
  );
}

export default Record;
