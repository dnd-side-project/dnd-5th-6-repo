import React, { memo, useState } from "react";
import styles from "./cardItem.module.css";
import { Modal } from "../modal/cardModal";
import Like from "./../like/like";
import { TOGGLE_LIKE } from "./../../apollo/queries/CardItem/like";

const CardItem = memo(({ card }) => {
  const [showModal, setShowModal] = useState(false);
  // const [toggleLike]=useMutation(TOGGLE_LIKE,{
  //   variables:{postIndex}
  // })
  const post = card["Post"];
  const user = card["User"];
  const like = card["Like"];

  console.log({ card });
  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
    document.body.style.overflow = "hidden";
  };

  const handleLikeToggle = (index) => {
    console.log(index);
  };
  return (
    <>
      <div className={styles.container}>
        {showModal ? (
          <Modal
            uploadDate={post.uploadDate}
            content={post.content}
            setShowModal={setShowModal}
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
        <Like
          like={like}
          handleLikeToggle={handleLikeToggle}
          postIndex={post.postIndex}
        ></Like>
        {/* <div className={styles.like}>
          <button
            onClick={() => handleLikeClick(post.postIndex)}
            className={styles.likeBtn}
          >
            {" "}
          </button>
          <span className={styles.likeCount}>{like}</span>
        </div> */}
      </div>
    </>
  );
});

export default CardItem;
