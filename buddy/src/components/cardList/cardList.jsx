import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import CardItem from "../cardItem/cardItem";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";

function CardList({ data }) {
  const postData = data && Object.values(data)[0]["PostData"];
  const likeArray = data && Object.values(data)[0]["likeArray"];

  return (
    <ul className={styles.cardList}>
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
