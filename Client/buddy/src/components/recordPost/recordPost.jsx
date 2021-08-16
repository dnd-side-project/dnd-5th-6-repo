import React, { useEffect, useState, useRef } from "react";
import styles from "./recordPost.module.css";
import Button from "../button/button";
import { GET_EXERCISES } from "./../../apollo/queries/exercises/getExercises";
import { useQuery, useMutation } from "@apollo/client";
import { Weathers } from "./../../weathers";
import Toggle from "./../toggle/toggle";
import { ADD_CARD } from "./../../apollo/queries/cardItem/addCard";
import { useHistory } from "react-router";
import { OneButtonModal } from "./../modal/oneButtonModal";

function RecordPost() {
  const history = useHistory();
  const [selectExe, setSelectExe] = useState(0);
  const [isSelected, setIsSelected] = useState(0);
  const [textByte, setTextByte] = useState(0);
  const [isToggled, setIsToggled] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
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

  useEffect(() => {
    checkAll();
    setIsBlocked(true);
  }, [selectExe, isSelected, textByte, isToggled]);

  return (
    <>
      {showModal ? (
        <OneButtonModal
          setShowModal={setShowModal}
          message1="기록이 저장되었어요!"
          right="확인"
          link="/record"
        ></OneButtonModal>
      ) : null}
      <section>
        <div className={styles.box_section}>
          <div className={styles.section_name}>운동 선택</div>
          <div className={styles.section_detail}>어떤 운동을 하셨나요?</div>
        </div>
        {exercises?.map((exercise) => (
          <Button
            key={exercise.Index}
            exercise={exercise.Name}
            index={exercise.Index}
            setSelectExe={setSelectExe}
          ></Button>
        ))}
      </section>
      <hr />
      <section>
        <div className={styles.box_section}>
          <div className={styles.section_name}>컨디션 선택</div>
          <div className={styles.section_detail}>
            운동할 때 컨디션은 어땠나요?
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
      <section>
        <form>
          <div className={styles.box_section}>
            <div className={styles.section_name}>한 줄 기록</div>
            <div className={styles.section_detail}>
              운동의 감정을 간단하게 작성해보세요!
            </div>
          </div>
          <div>
            <textarea
              ref={textRef}
              name="message"
              placeholder="최소 10자에서 최대 45자까지 기록할 수 있어요."
              onKeyUp={handlecheckByte}
              max="45"
            ></textarea>
            <div className={styles.text_byte}>{textByte}/45</div>
          </div>
        </form>
      </section>
      <hr />
      <section>
        <div className={styles.box_section}>
          <div className={styles.feed}>
            <div className={styles.section_text}>
              <div className={styles.section_name}>피드에 게시</div>
              <div className={styles.section_detail}>
                다른 버디들과 기록을 공유할 수 있어요.
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
      {isDone ? (
        <div className={styles.submit_active} onClick={onSubmit}>
          <p className={styles.submit_text_active}>저장하기</p>
        </div>
      ) : (
        <div className={styles.submit_disable}>
          <p className={styles.submit_text_disable}>저장하기</p>
        </div>
      )}
    </>
  );
}

export default RecordPost;
