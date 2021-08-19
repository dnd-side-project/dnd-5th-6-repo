import React, { useRef } from "react";
import styles from "./cardModal.module.css";
import styled from "styled-components";
import ReactDom from "react-dom";
import { Liked, UnLiked } from "./../../icons";

const CardImageCondition = styled.li`
  display: block;
  border-radius: 14px;
  background-size: cover;
  align-items: flex-end;
  /* align-content: center; */
  margin-bottom: 0.2em;
  width: 18.063rem;
  height: 24.063rem;
  border: none;
  cursor: pointer;
  transition: transform 250ms ease-in;
  z-index: 0;
`;
const CardImageExercise = styled.div`
  background-size: cover;
  position: relative;
  display: flex-box;
  width: 18.063rem;
  height: 24.063rem;
  z-index: 1;
`;

export const CardModal = ({
  setShowModal,
  uploadDate,
  content,
  condition,
  exercise,
  handleLikeToggle,
  isLiked,
  setIsLiked,
  likeCount,
}) => {
  const modalRef = useRef();
  const exerciseImgURL = "images/exercises/exercise" + exercise + ".svg";
  const conditionImgURL = "images/conditions/condition" + condition + ".svg";

  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className={styles.container} ref={modalRef} onClick={close}>
        <CardImageCondition
          style={{ backgroundImage: `url(${conditionImgURL})` }}
        >
          <CardImageExercise
            style={{ backgroundImage: `url(${exerciseImgURL})` }}
          >
            <div className={styles.card}>
              <p className={styles.date}>{uploadDate}</p>
              <p className={styles.content}>{content}</p>
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
};
