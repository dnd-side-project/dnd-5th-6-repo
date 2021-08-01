import React, { memo, useState } from "react";
import styles from "./cardItem.module.css";
import { Modal } from "../modal/cardModal";

const CardItem = memo((props) => {
  const [showModal, setShowModal] = useState(false);

  const post = props.card["Post"];
  const user = props.card["User"];
  const like = props.card["Like"];

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
            uploadDate={post.uploadDate}
            content={post.content}
          />
        ) : null}
        <li className={styles.cardItem} onClick={openModal}>
          <div className={styles.card}>
            <p className={styles.date}>{post.uploadDate}</p>
            <p className={styles.content}>
              {post.content.length >= 30
                ? post.content.slice(0, 30) + " .. "
                : post.content}
            </p>
          </div>
        </li>
        <div className={styles.like}>
          <button className={styles.likeBtn}> </button>
          <span className={styles.likeCount}>{like}</span>
        </div>
      </div>
    </>
  );
});

export default CardItem;
