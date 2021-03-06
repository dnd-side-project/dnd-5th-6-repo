import React, { useEffect, useState, useRef } from "react";
import styles from "./recordPost.module.css";
import Button from "../button/button";
import { GET_EXERCISES } from "./../../apollo/queries/exercises/getExercises";
import { useQuery, useMutation } from "@apollo/client";
import { Weathers } from "./../../weathers";
import Toggle from "./../toggle/toggle";
import { ADD_CARD } from "../../apollo/queries/cardItem/addCard";
import { useHistory } from "react-router";
import { OneButtonModal } from "./../modal/oneButtonModal";
import CalendarBar from "components/calendar/calendarbar";

function RecordPost() {
  const history = useHistory();
  const [exeSelected, setExeSelected] = useState(false);
  const [selectExe, setSelectExe] = useState(0);
  const [isSelected, setIsSelected] = useState(0);
  const [textByte, setTextByte] = useState(0);
  const [isToggled, setIsToggled] = useState(true);
  const [isDone, setIsDone] = useState(false);
  //const [isBlocked, setIsBlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const textRef = useRef();

  const clearState = () => {
    setSelectExe(0);
    setIsSelected(0);
    setTextByte(0);
    setIsToggled(true);
    setIsDone(false);
  };
  const { data } = useQuery(GET_EXERCISES);

  const [addCard, { loading, error, dataS }] = useMutation(ADD_CARD, {
    onCompleted: (res) => {
      console.log(res);
      clearState();
      res.addPost && openModal();
    },
  });

  const exercises = data && data["getExercise"];

  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
    document.body.style.overflow = "hidden";
  };
  const handlecheckByte = () => {
    setTextByte(textRef.current.value.length);
  };

  const handleWClick = (key) => {
    setIsSelected(key);
  };

  const limitedByte = () => {};

  const checkAll = () => {
    if (selectExe && isSelected && textByte) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    isDone &&
      addCard({
        variables: {
          uploadDate: "2021-08-16",
          exercise: selectExe,
          content: textRef.current.value,
          condition: isSelected,
          feedOpen: +isToggled,
        },
      });
    textRef.current.value = "";
  };

  // useEffect(() => {
  //   const unblock = history.block((location, action) => {
  //     if (action === "POP" && isBlocked) {
  //       console.log(isDone);
  //       console.log("isNotDone");
  //       return window.confirm("Navigate Back?");
  //     }
  //     return true;
  //   });
  //   return () => {
  //     unblock();
  //   };
  // }, [isBlocked]);

  useEffect(() => {
    checkAll();
    // setIsBlocked(true);
  }, [selectExe, isSelected, textByte, isToggled]);

  return (
    <div className={styles.all}>
      <CalendarBar></CalendarBar>
      {showModal ? (
        <OneButtonModal
          setShowModal={setShowModal}
          message1="????????? ??????????????????!"
          right="??????"
          link="/record"
        ></OneButtonModal>
      ) : null}
      <section className={styles.section}>
        <div className={styles.box_section}>
          <div className={styles.section_name}>?????? ??????</div>
          <div className={styles.section_detail}>?????? ????????? ?????????????</div>
        </div>
        <div>
          {exercises?.map((exercise) => (
            <Button
              key={exercise.Index}
              exercise={exercise.Name}
              index={exercise.Index}
              exeSelected={exeSelected}
              setExeSelected={setExeSelected}
              setSelectExe={setSelectExe}
            ></Button>
          ))}
        </div>
      </section>
      <hr />
      <section className={styles.section}>
        <div className={styles.box_section}>
          <div className={styles.section_name}>????????? ??????</div>
          <div className={styles.section_detail}>
            ????????? ??? ???????????? ?????????????
          </div>
        </div>
        <div className={styles.conditions}>
          {Weathers.map((condition) =>
            condition.key === isSelected ? (
              <div key={condition.key}>{condition.active}</div>
            ) : (
              <div
                key={condition.key}
                onClick={() => handleWClick(condition.key)}
              >
                {condition.disabled}
              </div>
            )
          )}
        </div>
      </section>
      <hr />
      <section className={styles.section}>
        <form>
          <div className={styles.box_section}>
            <div className={styles.section_name}>??? ??? ??????</div>
            <div className={styles.section_detail}>
              ????????? ????????? ???????????? ??????????????????!
            </div>
          </div>
          <div className={styles.text_form}>
            <textarea
              ref={textRef}
              name="message"
              placeholder="?????? 10????????? ?????? 45????????? ????????? ??? ?????????."
              onKeyUp={handlecheckByte}
              max="45"
            ></textarea>
            <div className={styles.text_byte}>{textByte}/45</div>
          </div>
        </form>
      </section>
      <hr />
      <section className={styles.section}>
        <div className={styles.box_section}>
          <div className={styles.feed}>
            <div className={styles.section_text}>
              <div className={styles.section_name}>????????? ??????</div>
              <div className={styles.section_detail}>
                ?????? ???????????? ????????? ????????? ??? ?????????.
              </div>
            </div>
            <div className={styles.toggle_button}>
              <Toggle
                setIsToggled={setIsToggled}
                isToggled={isToggled}
              ></Toggle>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.feed_open}>
        {isDone ? (
          <div className={styles.submit_active} onClick={onSubmit}>
            <p className={styles.submit_text_active}>????????????</p>
          </div>
        ) : (
          <div className={styles.submit_disable}>
            <p className={styles.submit_text_disable}>????????????</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default RecordPost;
