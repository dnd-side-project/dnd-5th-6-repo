import React from "react";
import styles from "./cardItem.module.css";

function CardItem(props) {
  const content = props.card.content;
  console.log(props);
  return (
    <div className={styles.container}>
      <li className={styles.cardItem}>
        <div className={styles.card}>
          <p className={styles.date}>{props.card.uploadDate}</p>
          <p className={styles.content}>
            {content.length >= 30 ? content.slice(0, 30) + " .. " : content}
          </p>
        </div>
      </li>
      <button>좋아요</button>
    </div>
  );
}

export default CardItem;
