import React, { useEffect } from "react";
import styles from "./cardList.module.css";
import { useLazyQuery } from "@apollo/client";
import CardItem from "../cardItem/cardItem";
import { GET_CARD } from "../../apollo/queries/CardItem/getCard";

function CardList() {
  const [Addsort, { loading, error, data }] = useLazyQuery(GET_CARD);

  const postData = data && data["getAllLatestPost"]["PostData"];
  const likeArray = data && data["getAllLatestPost"]["likeArray"];

  useEffect(() => {
    Addsort({ variables: { flag: 1 } });
  }, []);

  return (
    <ul className={styles.cardList}>
      {loading && <h1>loading</h1>}
      {error ? <h1>error: {error.message}</h1> : null}
      {postData?.map((card) => (
        <CardItem key={card["Post"].postIndex} card={card} />
      ))}
    </ul>
  );
}

export default React.memo(CardList);
