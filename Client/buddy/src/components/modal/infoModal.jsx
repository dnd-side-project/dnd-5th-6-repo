import React, { useRef } from "react";
import styles from "./infoModal.module.css";
import { EggFirst, InfoClose } from "./../../icons";

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
      <div className={styles.x} onClick={()=>setShowModal(false)}>
        <InfoClose></InfoClose>
      </div>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.big_font}>운동 기록 남기기</div>
          <div className={styles.font}>
            오늘 했던 운동과 컨디션을 기록할 수 있어요.
            <br></br>
            나만의 운동기록 카드를 모아보세요.
          </div>
          <EggFirst></EggFirst>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
