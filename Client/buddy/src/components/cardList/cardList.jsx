import React from "react";
import styles from "./cardList.module.css";
import { gql, useQuery } from "@apollo/client";
import CardItem from "../cardItem/cardItem";

const GET_CARD = gql`
  query getCard {
    getAllLatestPost {
      PostData {
        Post {
          postIndex
          uploadDate
          content
        }
      }
    }
  }
`;

function CardList() {
  const { loading, error, data } = useQuery(GET_CARD);
  const postData = data && data["getAllLatestPost"]["PostData"];

  return (
    <ul className={styles.cardList}>
      {loading && <h1>loading</h1>}
      {postData?.map((card) => (
        <CardItem key={card["Post"].postIndex} card={card["Post"]} />
      ))}
    </ul>
  );
}

export default CardList;
