import React, { useRef } from "react";
import styles from "./oneButtonModal.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const OneButtonModal = ({
  setShowModal,
  message1,
  message2,
  right,
  link,
}) => {
  const history = useHistory();
  const modalRef = useRef();
  console.log("modal open");
  //   const close = (e) => {
  //     if (e.target === modalRef.current) {
  //       setShowModal(false);
  //       document.body.style.overflow = "unset";
  //     }
  //   };

  const closeModal = () => {
    setShowModal(false);
    history.push(link);
    history.go(0);
    document.body.style.overflow = "unset";
  };

  return (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.message}>
            {message1}
            <br />
            {message2}
          </div>
          <div className={styles.button_container}>
            {/* <Link to={link} style={{ textDecoration: "none" }}> */}
            <div className={styles.full} onClick={closeModal}>
              <span className={styles.full_text}>{right}</span>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneButtonModal;
