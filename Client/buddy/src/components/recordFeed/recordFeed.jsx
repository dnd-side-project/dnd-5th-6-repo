import React, { useState } from "react";
import styles from "./recordFeed.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { TwoButtonModal } from "./../modal/twoButtonModal";
import { EmptyCard, RecordBtn } from "./../../icons";
import CardList from "./../cardList/cardList";
import { GET_MY_CARD } from "../../apollo/queries/cardItem/getCard";
import ErrorPage from "../feedPage/errorPage";
import Load from "components/loader/loader";
import { IS_LOGGED_IN } from "./../../apollo/queries/login/login";

function RecordFeed() {
  const [showModal, setShowModal] = useState(false);
  const { loading, error, data } = useQuery(GET_MY_CARD);
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  console.log(isLoggedIn);

  const postData = data && Object.values(data)[0]["PostData"];

  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {showModal ? (
        <TwoButtonModal
          setShowModal={setShowModal}
          message1="로그인 후 기록할 수 있어요!"
          message2="로그인 하시겠어요?"
          left="로그인"
          right="취소"
          link="/login"
        ></TwoButtonModal>
      ) : null}
      <section className={styles.section}>
        <div className={styles.box_section}>
          <div className={styles.record_bar}>
            <div className={styles.section_name}>기록</div>
            <div className={styles.section_text}>오늘의 컨디션은 어땠나요?</div>
          </div>

          <div className={styles.record_button}>
            {isLoggedIn ? (
              <Link to="/record/post">
                <RecordBtn></RecordBtn>
              </Link>
            ) : (
              <div onClick={openModal}>
                <RecordBtn></RecordBtn>
              </div>
            )}
          </div>
        </div>
      </section>
      {error ? (
        <ErrorPage></ErrorPage>
      ) : loading ? (
        <Load></Load>
      ) : isLoggedIn ? (
        !!postData.length ? (
          <>
            <section className={styles.section}>
              <CardList data={data}></CardList>
            </section>
          </>
        ) : (
          <>
            <button className={styles.button}>
              <Link to="/record/post">
                <EmptyCard></EmptyCard>
              </Link>
            </button>
          </>
        )
      ) : (
        <>
          <button className={styles.button} onClick={openModal}>
            <EmptyCard></EmptyCard>
          </button>
        </>
      )}
    </>
  );
}

export default RecordFeed;
