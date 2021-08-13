import Calendar from "components/calendar/calendar";
import React from "react";
import TwoButtonModal from "../components/modal/twoButtonModal";
import NavBar from "./../components/navBar/navBar";
import { EmptyCard, RecordBtn } from "./../icons";
import { Link } from "react-router-dom";
import { Navbar } from "components/navBar/navBar";
import RecordBar from "./../components/recordBar/recordBar";

function Record() {
  return (
    <>
      <NavBar></NavBar>
      <RecordBar></RecordBar>
      <EmptyCard></EmptyCard>
      <section></section>
    </>
  );
}

export default Record;
