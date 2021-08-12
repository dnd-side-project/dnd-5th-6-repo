import React, { memo, useState, useEffect } from "react";
import styles from "./cardItem.module.css";
import { CardModal } from "../modal/cardModal";
import { TOGGLE_LIKE } from "./../../apollo/queries/CardItem/like";
import { useMutation } from "@apollo/client";
import { Liked, UnLiked } from "../../icons";

const CardItem = memo(({ card, likeArray }) => {
  const post = card["Post"];
  const user = card["User"];
  const like = card["Like"];

  const exerciseImgURL = "images/exercises/exercise" + post.exercise + ".svg";
  const conditionImgURL =
    "images/conditions/condition" + post.condition + ".svg";

  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likeCount, setLikeCount] = useState(like);
  const [likeArr, setLikeArr] = useState(likeArray);

  const [toggleLike, { data }] = useMutation(TOGGLE_LIKE);

  console.log(post.condition);
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
          <CardModal
            uploadDate={post.uploadDate}
            content={post.content}
            setShowModal={setShowModal}
          />
        ) : null}
        <li className={styles.cardItem} onClick={openModal}>
          <img alt={post.exercise} src={exerciseImgURL}></img>
          {/* <img alt={post.condition} src={conditionImgURL}></img> */}

          <div className={styles.card} id={post.condition}>
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
