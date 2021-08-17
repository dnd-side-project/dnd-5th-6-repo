import React, { useRef } from "react";
import ReactDom from "react-dom";
import styles from "./calendarModal.module.css"
import Calendar from "components/calendar/calendar";
// import Calenderclose from "../../icons";
import { CalenderClose } from "icons";
import styled from "styled-components";

const Close = styled.div`
    margin-top: 0;
    height : 1rem;
    margin-bottom : 18.5rem;
    margin-left : 88%;
    position:absolute;
`;

export const Modal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  // render the modal JSX in the portal div.
  return (
    <div className={styles.container} ref={modalRef} onClick={closeModal}>
      <div className={styles.modal}>
          <div className={styles.inner}>
        <Calendar></Calendar>
        </div>
        {/* 버튼 */}
        <Close onClick={() => setShowModal(false)}>
        
        <CalenderClose>X</CalenderClose>
        </Close>
      </div>
    </div>
  );
};