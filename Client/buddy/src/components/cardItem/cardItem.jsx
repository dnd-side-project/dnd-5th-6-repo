import React, { memo, useState, useEffect } from "react";
import styles from "./cardItem.module.css";
import styled from "styled-components";
import { CardModal } from "../modal/cardModal";
import { TOGGLE_LIKE } from "../../apollo/queries/cardItem/like";
import { useQuery, useMutation } from "@apollo/client";
import { Liked, UnLiked } from "../../icons";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";
import TwoButtonModal from "components/modal/twoButtonModal";

const CardImageCondition = styled.li`
  display: block;
  border-radius: 14px;
  background-size: cover;
  align-items: flex-end;
  /* align-content: center; */
  margin-bottom: 0.2em;
  width: 10.5rem;
  height: 14.063rem;
  border: none;
  cursor: pointer;
  transition: transform 250ms ease-in;
  z-index: 0;
`;
const CardImageExercise = styled.div`
  background-size: cover;
  position: relative;
  display: flex-box;
  width: 10.5rem;
  height: 14.063rem;
  z-index: 1;
`;

const CardItem = memo(({ card, likeArray, isLoggedIn }) => {
  const post = card["Post"];
  const user = card["User"];
  const like = card["Like"];

  const exerciseImgURL = "images/exercises/exercise" + post.exercise + ".svg";
  const conditionImgURL =
    "images/conditions/condition" + post.condition + ".svg";

  const [showModal, setShowModal] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
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
    if (isLoggedIn) {
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
    } else {
      setShowModalAlert(true);
    }
  };

  useEffect(() => {
    checkAlreadyLiked();
  });

  return (
    <>
      <div className={styles.container}>
        {showModalAlert ? (
          <TwoButtonModal
            setShowModal={setShowModalAlert}
            message1="로그인 후 기록할 수 있어요!"
            message2="로그인 하시겠어요?"
            left="로그인"
            right="취소"
            link="/login"
          ></TwoButtonModal>
        ) : null}
        {showModal ? (
          <CardModal
            uploadDate={post.uploadDate}
            content={post.content}
            condition={post.condition}
            exercise={post.exercise}
            setShowModal={setShowModal}
            handleLikeToggle={handleLikeToggle}
            isLiked={isLiked}
            likeCount={likeCount}
          />
        ) : null}
        <CardImageCondition
          style={{ backgroundImage: `url(${conditionImgURL})` }}
          onClick={openModal}
        >
          <CardImageExercise
            style={{ backgroundImage: `url(${exerciseImgURL})` }}
          >
            <div className={styles.card}>
              <p className={styles.date}>{post.uploadDate}</p>
              <p className={styles.content}>
                {post.content.length >= 25
                  ? post.content.slice(0, 23) + " .. "
                  : post.content}
              </p>
            </div>
          </CardImageExercise>
        </CardImageCondition>
        <div className={styles.like}>
          <div className={styles.like_icon} onClick={handleLikeToggle}>
            {isLiked ? <Liked /> : <UnLiked />}
          </div>
          <span className={styles.like_text}>{likeCount}</span>
        </div>
      </div>
    </>
  );
});

export default CardItem;
