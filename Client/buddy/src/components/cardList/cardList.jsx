import React from "react";
import styles from "./cardList.module.css";
import { gql, useQuery } from "@apollo/client";
import CardItem from "../cardItem/cardItem";

const GET_CARD = gql`
  query getCard {
    getAllLatestPost {
      postIndex
      uploadDate
      content
    }
  }
`;

function CardList() {
  const { loading, error, data } = useQuery(GET_CARD);
  const items = data && Object.values(data)[0];
  return (
    <ul className={styles.cardList}>
      {loading && <h1>loading</h1>}
      {items?.map((card) => (
        <CardItem key={card.postIndex} card={card} />
      ))}
    </ul>
  );
}

export default CardList;
