import Calendar from "components/calendar/calendar";
import React, { useEffect } from "react";
import TwoButtonModal from "../components/modal/twoButtonModal";
import NavBar from "./../components/navBar/navBar";
import { EmptyCard, RecordBtn } from "./../icons";
import { Link } from "react-router-dom";
import { Navbar } from "components/navBar/navBar";
import RecordBar from "./../components/recordBar/recordBar";
import { useQuery } from "@apollo/client";
import { GET_MY_CARD } from "./../apollo/queries/cardItem/getCard";
import CardList from "./../components/cardList/cardList";

function Record() {
  const { loading, error, data } = useQuery(GET_MY_CARD);

  console.log(data);
  return (
    <>
      <RecordBar></RecordBar>
      {data?.length ? (
        <>
          <EmptyCard></EmptyCard>
        </>
      ) : (
        <CardList data={data}></CardList>
      )}
    </>
  );
}

export default Record;
