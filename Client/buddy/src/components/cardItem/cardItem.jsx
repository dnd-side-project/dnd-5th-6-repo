import React from "react";
import styles from "./cardItem.module.css";

function CardItem(props) {
  return (
    <li className={styles.cardItem}>
      <div className={styles.card}>
        <p>{props.card.content}</p>
      </div>
    </li>
  );
}

export default CardItem;
