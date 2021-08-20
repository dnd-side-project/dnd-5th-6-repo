import React, { useRef } from "react";
import styles from "./infoModal.module.css";
import { EggFirst } from "./../../icons";

function InfoModal({ setShowModal }) {
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
        <div className={styles.modal_container}>
          <EggFirst></EggFirst>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
