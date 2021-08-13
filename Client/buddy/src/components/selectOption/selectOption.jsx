import React, { memo, useState, useEffect } from "react";
import styles from "./selectOption.module.css";
import Button from "../button/button";
import CardList from "./../cardList/cardList";
import { useQuery, useLazyQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";
import styled from "styled-components";
import { GET_EXERCISES } from "./../../apollo/queries/exercises/getExercises";
import {
  GET_ALL_CARD,
  GET_OPTIONAL_CARD,
} from "../../apollo/queries/CardItem/getCard";

const Sss = styled.span`
  color: #c5c5c5;
  :hover {
    color: #00bee6;
  }
`;

const SelectOption = memo(() => {
  const [sortByFlag, setSortByFlag] = useState(0);
  const [selectExe, setSelectExe] = useState(0);
  const { data: exeList } = useQuery(GET_EXERCISES);

  console.log(selectExe, sortByFlag);

  const [sortBy, { loading, error, data }] = useLazyQuery(
    selectExe ? GET_OPTIONAL_CARD : GET_ALL_CARD
  );

  const exercises = exeList && exeList["getExercise"];

  useEffect(() => {
    sortBy({
      variables: selectExe
        ? { flag: sortByFlag, exercise: selectExe }
        : { flag: sortByFlag },
    });
  }, [sortByFlag, selectExe]);

  return (
    <>
      <div>
        <div className={styles.sortBar}>
          <span className={styles.feed}>피드</span>
          <div className={styles.sort}>
            <Sss onClick={() => setSortByFlag(0)}>최신순</Sss>
            <span> · </span>
            <Sss onClick={() => setSortByFlag(1)}>인기순</Sss>
          </div>
        </div>
        <div className={styles.wrapbar}>
          <Button key="0" index={0} setSelectExe={setSelectExe}></Button>
          {exercises?.map((exercise) => (
            <Button
              key={exercise.Index}
              exercise={exercise.Name}
              index={exercise.Index}
              setSelectExe={setSelectExe}
            ></Button>
          ))}
        </div>
      </div>
      {loading && <h1>loading</h1>}
      {error && (
        <>
          <h1>에러가 발생했어요.. 잠시후 다시 실행해 주세요.</h1>
          {console.log("error:", error.message)}
        </>
      )}
      <CardList data={data}></CardList>
    </>
  );
});

export default SelectOption;
