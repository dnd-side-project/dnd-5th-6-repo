import React, { memo, useState, useEffect } from "react";
import styles from "./selectOption.module.css";
import Button from "../button/button";
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

  // const [sortBy, { loading, error, data }] = useLazyQuery(
  //   selectExe ? GET_OPTIONAL_CARD : GET_ALL_CARD
  // );
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

  // useEffect(() => {
  //   console.log(selectExe);
  //   console.log(selectExe ? true : false);
  //   sortBy({
  //     variables: selectExe
  //       ? { flag: sortByFlag, exercise: selectExe }
  //       : { flag: sortByFlag },
  //   });
  // }, [sortByFlag, selectExe]);

  return (
    <>
      <section className={styles.section}>
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
              selectExe={selectExe}
              setSelectExe={setSelectExe}
            ></Button>
          ))}
        </div>
      </section>
      {error && <ErrorPage></ErrorPage>}
      {loading ? (
        <h1>Loading..</h1>
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
