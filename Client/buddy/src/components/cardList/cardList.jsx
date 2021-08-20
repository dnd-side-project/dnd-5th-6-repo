import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import CardItem from "../cardItem/cardItem";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";
import { useQuery } from "@apollo/client";

function CardList({ data }) {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  const postData = data && Object.values(data)[0]["PostData"];
  const likeArray = data && Object.values(data)[0]["likeArray"];

  return (
    <ul className={styles.cardList}>
      {postData?.map((card) => (
        <CardItem
          key={card["Post"].postIndex}
          card={card}
          likeArray={likeArray}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </ul>
  );
}

export default CardList;
