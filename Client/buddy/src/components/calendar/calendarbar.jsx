import React, {useState} from "react";
import styles from "./calendarbar.module.css"
import Calendar from "./calendar";
import moment from "moment";
import { Modal } from "components/modal/calendarMoeal";
import classname from "classnames";
import styled from "styled-components";
import { Dropdown } from "icons";

const DateBtn = styled.button`
font-family: pretendard;
font-style: normal;
font-weight: bold;
font-size: 18px;
height: 2rem;
width: 10%;
border: none;
border-radius: 100px;
margin-left: 32%;
padding-top: 3%;
background-color: white;
`;

const DropBtn = styled.svg`
position: absolute;
width:2rem;
height: 2rem;
top: 1rem;
right: 7rem;
`;

function CalendarBar() {
    const [getMoment, setMoment] = useState(moment());
    // const [showModal, setShowModal] = useState(false);
    // const [showCalendarModal, setShowCalendarModal] = useState(false);
    // const sidebarClasses = classname([
    //     styles.CalendarModal,
    //     {
    //         [styles.show]: showCalendarModal
    //     }

    // ]);

    // const openModal = () => {
    //     setShowModal(true);
    //     console.log(showModal);
    //     document.body.style.overflow = "hidden";
    //     // setShowCalendarModal(!showCalendarModal);
    //   };

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const today = getMoment;
    return (<> 
        <div className={styles.height} >
        
        
            {/* 캘린더 모달 */}
        {/* {showModal ? (
          <CalendarModal
            setShowModal={setShowModal}
          />
        ) : null} */}
        {/* <div className={sidebarClasses}>  */}
        {showModal ? <Modal setShowModal={setShowModal} /> : null}
            <DateBtn onClick={openModal}>
            <span>{today.format('YYYY.MM.DD')}</span>
            <DropBtn onClick={openModal}>

            <Dropdown></Dropdown>
            </DropBtn>
            </DateBtn>
            {/* </div> */}
        </div>
    </>);
}

export default CalendarBar;