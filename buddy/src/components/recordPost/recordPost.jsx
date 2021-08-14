import React, { useState, useRef } from "react";
import styles from "./recordPost.module.css";
import Button from "../button/button";
import { GET_EXERCISES } from "./../../apollo/queries/exercises/getExercises";
import { useQuery } from "@apollo/client";
import { Weathers } from "./../../weathers";
import Toggle from "./../toggle/toggle";

function RecordPost() {
  const [selectExe, setSelectExe] = useState(0);
  const [isSelected, setIsSelected] = useState(0);
  const [textByte, setTextByte] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const textRef = useRef();

  const { data } = useQuery(GET_EXERCISES);
  const exercises = data && data["getExercise"];

  const handlecheckByte = () => {
    setTextByte(textRef.current.value.length);
    console.log(textRef.current.value);
  };

  const handleWClick = (key) => {
    setIsSelected(key);
  };
  console.log(isSelected);
  const limitedByte = () => {};
  const checkAll = () => {};
  //    const onSubmit = () => (

  //    );

  return (
    <>
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
            maxLength={limitedByte}
          ></textarea>
          <div className={styles.text_byte}>{textByte}/45</div>
        </div>
      </form>
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
      <div className={styles.submit}>
        <p className={styles.submit_text}>저장하기</p>
      </div>
    </>
  );
}

export default RecordPost;
