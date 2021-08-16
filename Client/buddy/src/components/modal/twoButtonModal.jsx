import React, { useRef } from "react";
import styles from "./twoButtonModal.module.css";
import { Link } from "react-router-dom";

export const TwoButtonModal = ({
  setShowModal,
  message1,
  message2,
  left,
  right,
  link,
}) => {
  const modalRef = useRef();
  console.log("modal open");
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
        <div className={styles.modal_container}>
          <div className={styles.message}>
            {message1}
            <br />
            {message2}
          </div>
          <div className={styles.button_container}>
            <Link to={link} style={{ textDecoration: "none" }}>
              <div className={styles.full}>
                <span className={styles.full_text}>{left}</span>
              </div>
            </Link>
            <div className={styles.empty} onClick={closeModal}>
              <span className={styles.empty_text}>{right}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoButtonModal;
