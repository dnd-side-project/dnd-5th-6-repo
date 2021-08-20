import React, { Fragment, useState, useRef } from "react";
import classname from "classnames";
import styles from "./navBar.module.css";
import { HamBurger, PaceBuddy, Close } from "../../icons";
import { Link } from "react-router-dom";
import { Next, ProfilePhoto } from "icons";
import { ProfileActive } from "./../../icons";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../../apollo/queries/login/login";
import { GET_NICKNAME } from "./../../apollo/queries/users/users";
import { NavbarNext } from "../../icons";
import InfoModal from "./../modal/infoModal";

export const NavBar = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  const { data } = useQuery(GET_NICKNAME);
  const nickName = data && data["userNickname"];
  // 처음엔 닫겨있기
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sidebarClasses = classname([
    styles.SideDrawer,
    {
      [styles.show]: showSideDrawer,
    },
  ]);

  const reload = () => {
    setShowSideDrawer(false);
    history.push("/");
    history.go(0);
  };
  const handleInfoModal = () => {
    setShowSideDrawer(false);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  // const modalRef = useRef();

  // const close = (e) => {
  //   if (e.target === modalRef.current) {
  //     setShowSideDrawer(true);
  //     document.body.style.overflow = "unset";
  //   }
  // };

  const ToggleSidebar = () => {
    return (
      <>
        <div className={styles.height}>
          <Link onClick={reload} to="/">
            <PaceBuddy />
          </Link>

          {/* navbar 페이지 분기로 수정, 라우팅 시 애니메이션 효과를 따로 적용 */}
          <Link
            className={styles.ham_button}
            onClick={() => setShowSideDrawer(!showSideDrawer)}
            to="#"
          >
            {/* 상태 따라서 전환 */}
            {showSideDrawer ? <Close /> : <HamBurger />}
          </Link>
        </div>
        {/* <button onClick={() => setShowSideDrawer(!showSideDrawer)}>
        Toggle Sidebar
      </button> */}
      </>
    );
  };

  return (
    <>
      {showModal ? <InfoModal setShowModal={setShowModal}></InfoModal> : null}
      <Fragment>
        {/* 내용물.. */}
        <div className={sidebarClasses}>
          {isLoggedIn ? (
            <div className={styles.profile}>
              <ProfileActive
                size={"60"}
                className={styles.profile_photo}
              ></ProfileActive>
              <Link to="/myPage" className={styles.nickname}>
                {nickName}님
              </Link>
              <div className={styles.next}>
                <NavbarNext className={styles.next}></NavbarNext>
              </div>
              <br></br>
              <div className={styles.ment}>오늘도 힘차게 움직여요 :)</div>
            </div>
          ) : (
            <div className={styles.profile}>
              <ProfilePhoto
                size={"60"}
                className={styles.profile_photo}
              ></ProfilePhoto>
              <Link to="/login" className={styles.login}>
                로그인하기
              </Link>
              <div className={styles.next}>
                <Next className={styles.next}></Next>
              </div>
              <br></br>
              <div className={styles.hello}>반가워요!</div>
            </div>
          )}

          {/* <div className={styles.profile}>            
            <ProfileActive
              size={"60"}
              className={styles.profile_photo}
            ></ProfileActive>
            <Link to="/login" className={styles.login}>
              로그인하기
            </Link>
            <Next className={styles.next}></Next>
            <br></br>
            <div className={styles.hello}>반가워요!</div>
          </div> */}
          {/* <hr className={styles.line}></hr> */}
          <div className={styles.container}>
            <Link
              className={styles.link}
              onClick={() => setShowSideDrawer(false)}
              to="/"
            >
              피드
            </Link>
            <Link
              className={styles.link}
              onClick={() => setShowSideDrawer(false)}
              to="/record"
            >
              기록
            </Link>
            <Link className={styles.link} style={{ color: "#C5C5C5" }} to="#">
              리포트🚧
            </Link>
            <div
              className={styles.link}
              style={{ color: "#00BEE6" }}
              onClick={handleInfoModal}
            >
              페이스버디란?
            </div>
          </div>
        </div>
        <ToggleSidebar />
      </Fragment>
    </>
  );
};

export default NavBar;
