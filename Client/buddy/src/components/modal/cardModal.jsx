import React, { useRef } from "react";
import styles from "./cardModal.module.css";
import ReactDom from "react-dom";

export const Modal = ({ setShowModal, uploadDate, content }) => {
  const modalRef = useRef();

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
    <div className={styles.container} ref={modalRef} onClick={close}>
      <div>
        <button className={styles.closeBtn} onClick={closeModal}>
          닫기
        </button>
        <div className={styles.modal}>
          <div className={styles.card}>
            <p className={styles.date}>{uploadDate}</p>
            <p className={styles.content}>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
