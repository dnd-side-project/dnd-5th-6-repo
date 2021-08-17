// import React, { useRef } from "react";
// import styles from "./calendarModal.module.css";
// import ReactDom from "react-dom";
// import Calendar from "components/calendar/calendar";
// import { useState } from "react";
// import classname from "classnames";

// export const CalendarModal = ({ setShowModal, uploadDate, content }) => {
//   const modalRef = useRef();

//   const [showmodal, setShowmodal] = useState(false);
//   const sidebarClasses = classname([
//     styles.modal,
//     {
//         [styles.show]: showmodal
//     }

// ]);

//   const close = (e) => {
//     if (e.target === modalRef.current) {
//       setShowModal(false);
//       document.body.style.overflow = "unset";
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     document.body.style.overflow = "unset";
//   };

  

//   return (
//     <div className={styles.container} ref={modalRef} onClick={close}>
//       {/* <div> */}
//         {/* <button className={styles.closeBtn} onClick={closeModal}>
//           닫기
//         </button> */}
//         <div className={sidebarClasses}> 
//         <div className={styles.modal}>
//         <Calendar></Calendar>
//         </div>
//         </div>
//       {/* </div> */}
//     </div>
//   );
// };


import React, { useRef } from "react";
import ReactDom from "react-dom";
import styles from "./calendarModal.module.css"
import Calendar from "components/calendar/calendar";
// import Calenderclose from "../../icons";
import { Calenderclose } from "icons";
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
        
        <Calenderclose>X</Calenderclose>
        </Close>
      </div>
    </div>
  );
};