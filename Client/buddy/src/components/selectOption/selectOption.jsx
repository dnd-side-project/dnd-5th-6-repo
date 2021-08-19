import React, { memo, useState, useEffect } from "react";
import styles from "./selectOption.module.css";
import CardList from "./../cardList/cardList";
import { useQuery, useLazyQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";
import styled from "styled-components";
import { GET_EXERCISES } from "./../../apollo/queries/exercises/getExercises";
import ErrorPage from "../feedPage/errorPage";
import {
  GET_ALL_CARD,
  GET_OPTIONAL_CARD,
} from "../../apollo/queries/cardItem/getCard";
import NullPage from "components/feedPage/nullPage";
import loader from "components/loader/loader";
import Load from "./../loader/loader";

const SortFlag = styled.span`
  color: ${(props) => (props.color === "on" ? "#c5c5c5" : "#00bee6")};
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 0.75rem;
  font-weight: normal;
  :hover {
    color: #00bee6;
  }
`;

const Btn = styled.button`
  margin-right: 1.5%;
  margin-bottom: 1.5%;
  margin-top: 1.5%;
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 0.75rem;
  background-color: ${(props) =>
    props.isSelectedExe === "on" ? "#00bee6" : "white"};
  border: 1.5px solid
    ${(props) => (props.isSelectedExe === "on" ? "white" : "#c5c5c5")};
  border-radius: 28px;
  height: 1.8rem;
  box-shadow: none;
  color: ${(props) => (props.isSelectedExe === "on" ? "white" : "#474747")};
`;

const SelectOption = memo(() => {
  const [sortByFlag, setSortByFlag] = useState(0);
  const [selectExe, setSelectExe] = useState(0);
  const { data: exeList } = useQuery(GET_EXERCISES);

  console.log(selectExe, sortByFlag);

  const { loading, error, data } = useQuery(
    selectExe ? GET_OPTIONAL_CARD : GET_ALL_CARD,
    {
      variables: selectExe
        ? { flag: sortByFlag, exercise: selectExe }
        : { flag: sortByFlag },
    }
  );

  const exercises = exeList && exeList["getExercise"];
  const postData = data && Object.values(data)[0]["PostData"];

  const handleClickExe = (key) => {
    setSelectExe(key);
  };
  return (
    <>
      <section className={styles.section}>
        <div className={styles.sortBar}>
          <span className={styles.feed}>피드</span>
          <div className={styles.sort}>
            <SortFlag
              color={sortByFlag ? "on" : "off"}
              onClick={() => setSortByFlag(0)}
            >
              최신순
            </SortFlag>
            <span> · </span>
            <SortFlag
              color={sortByFlag ? "off" : "on"}
              onClick={() => setSortByFlag(1)}
            >
              인기순
            </SortFlag>
          </div>
        </div>
        <div className={styles.wrapbar}>
          <Btn
            key="0"
            isSelectedExe={selectExe ? "off" : "on"}
            onClick={() => handleClickExe(0)}
          >
            전체
          </Btn>
          {exercises?.map((exercise) => (
            <Btn
              key={exercise.Index}
              isSelectedExe={exercise.Index === selectExe ? "on" : "off"}
              onClick={() => handleClickExe(exercise.Index)}
            >
              {exercise.Name}
            </Btn>
          ))}
        </div>
      </section>
      {error ? (
        <ErrorPage></ErrorPage>
      ) : loading ? (
        <Load></Load>
      ) : postData?.length ? (
        <section className={styles.section}>
          <CardList data={data}></CardList>
        </section>
      ) : (
        <NullPage></NullPage>
      )}
    </>
  );
});

export default SelectOption;
