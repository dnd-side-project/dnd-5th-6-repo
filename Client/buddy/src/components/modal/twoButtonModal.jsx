import React, { useRef } from "react";
import styles from "./twoButtonModal.module.css";

export const TwoButtonModal = ({ setShowModal }) => {
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
      <div className={styles.modal}>
        <div className={styles.button_container}>
          <div className={styles.full}>
            <span className={styles.full_text}>그만두기</span>
          </div>
          <div className={styles.empty}>
            <span className={styles.empty_text}>취소</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoButtonModal;
