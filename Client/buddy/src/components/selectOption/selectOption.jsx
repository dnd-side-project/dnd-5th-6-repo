import React, { memo, useState } from "react";
import styles from "./selectOption.module.css";
import Button from "../button/button";
import CardList from "./../cardList/cardList";
import { exercises } from "../../data/exercises/exercises";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";

const SelectOption = memo(() => {
  const [sortByFlag, setSortByFlag] = useState(0);
  const [sortByExe, setSortByExe] = useState(0);
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data);
  return (
    <>
      <div>
        <div className={styles.sortBar}>
          <span>피드</span>
          <span onClick={() => setSortByFlag(0)}>최신순</span>
          <span onClick={() => setSortByFlag(1)}>인기순</span>
        </div>
        <div className={styles.wrapbar}></div>
        {exercises.map((exercise, index) => (
          <Button
            key={index}
            exercise={exercise}
            index={index}
            setSortByExe={setSortByExe}
          ></Button>
        ))}
      </div>
      <CardList flag={sortByFlag} exercise={sortByExe}></CardList>
    </>
  );
});

export default SelectOption;
