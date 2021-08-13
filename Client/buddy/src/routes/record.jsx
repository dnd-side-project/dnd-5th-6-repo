import Calendar from "components/calendar/calendar";
import React from "react";
import TwoButtonModal from "../components/modal/twoButtonModal";
import NavBar from "./../components/navBar/navBar";
import { RecordBtn } from "./../icons";
import { Link } from "react-router-dom";
import { Navbar } from "components/navBar/navBar";

function Record() {
  return (
    <>
      <NavBar></NavBar>
      <section>
        <div>
          <div>기록</div>
          <Link to="/record/post">
            <RecordBtn></RecordBtn>
          </Link>
        </div>
      </section>

      <section></section>
    </>
  );
}

export default Record;
