import React, { useRef } from "react";
import styles from "./twoButtonModal.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const TwoButtonModal = ({
  setShowModal,
  message1,
  message2,
  left,
  right,
  link,
  func,
}) => {
  const modalRef = useRef();
  const history = useHistory();
  console.log("modal open");

  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  };
  const doFunctional = () => {
    if (func) {
      func();
      history.push(link);
    } else {
      history.push(link);
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
            <div onClick={doFunctional}>
              <div className={styles.full}>
                <span className={styles.full_text}>{left}</span>
              </div>
            </div>
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
