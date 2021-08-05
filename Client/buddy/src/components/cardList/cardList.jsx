import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import { useLazyQuery, useQuery } from "@apollo/client";
import CardItem from "../cardItem/cardItem";
import {
  GET_ALL_CARD,
  GET_OPTIONAL_CARD,
} from "./../../apollo/queries/CardItem/getCard";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";

function CardList({ flag, exercise }) {
  const [sortBy, { loading, error, data }] = useLazyQuery(
    exercise ? GET_OPTIONAL_CARD : GET_ALL_CARD
  );
  const postData = data && Object.values(data)[0]["PostData"];
  const likeArray = data && Object.values(data)[0]["likeArray"];

  console.log({ flag, exercise });

  useEffect(() => {
    sortBy({
      variables: exercise ? { flag, exercise: exercise - 1 } : { flag },
    });
  }, [flag, exercise]);

  return (
    <ul className={styles.cardList}>
      {loading && <h1>loading</h1>}
      {error ? <h1>error: {error.message}</h1> : null}
      {postData?.map((card) => (
        <CardItem
          key={card["Post"].postIndex}
          card={card}
          likeArray={likeArray}
        />
      ))}
    </ul>
  );
}

export default CardList;
