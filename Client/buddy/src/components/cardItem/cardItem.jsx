import React, { memo, useState, useEffect } from "react";
import styles from "./cardItem.module.css";
import { Modal } from "../modal/cardModal";
import { TOGGLE_LIKE } from "./../../apollo/queries/CardItem/like";
import { useMutation } from "@apollo/client";
import { Liked, UnLiked } from "../../icons";

const CardItem = memo(({ card, likeArray }) => {
  const post = card["Post"];
  const user = card["User"];
  const like = card["Like"];

  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likeCount, setLikeCount] = useState(like);
  const [likeArr, setLikeArr] = useState(likeArray);

  const [toggleLike, { data }] = useMutation(TOGGLE_LIKE);

  const checkAlreadyLiked = () => {
    if (likeArr?.includes(post.postIndex)) {
      setIsLiked(true);
    }
  };

  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
    document.body.style.overflow = "hidden";
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      setLikeArr(likeArr.filter((index) => index !== post.postIndex));
      toggleLike({
        variables: { postIndex: post.postIndex, isDuplicate: true },
      });
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      setLikeArr([...likeArr, post.postIndex]);
      toggleLike({
        variables: { postIndex: post.postIndex, isDuplicate: false },
      });
    }
  };

  useEffect(() => {
    checkAlreadyLiked();
  });

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
        <span onClick={handleLikeToggle}>
          {isLiked ? <Liked /> : <UnLiked />}
          {likeCount}
        </span>
      </div>
    </>
  );
});

export default CardItem;
