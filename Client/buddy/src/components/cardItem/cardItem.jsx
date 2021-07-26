import React, { useState } from "react";
import styles from "./cardItem.module.css";
import { Modal } from "./../modal/modal";

function CardItem(props) {
  const [showModal, setShowModal] = useState(false);
  const content = props.card.content;
  console.log(props);
  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div className={styles.container}>
        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            uploadDate={props.card.uploadDate}
            content={content}
          />
        ) : null}
        <li className={styles.cardItem} onClick={openModal}>
          <div className={styles.card}>
            <p className={styles.date}>{props.card.uploadDate}</p>
            <p className={styles.content}>
              {content.length >= 30 ? content.slice(0, 30) + " .. " : content}
            </p>
          </div>
        </li>
        <button>좋아요</button>
      </div>
    </>
  );
}

export default CardItem;
