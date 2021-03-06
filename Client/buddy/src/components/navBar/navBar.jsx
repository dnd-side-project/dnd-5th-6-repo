import React, { Fragment, useState, useRef } from "react";
import classname from "classnames";
import styles from "./navBar.module.css";
import { HamBurger, PaceBuddy, Close } from "../../icons";
import { Link } from "react-router-dom";
import { Next, Profilepoto } from "icons";
import { ProfileActive } from "./../../icons";
import { useHistory } from "react-router";

export const NavBar = () => {
  // 처음엔 닫겨있기
  const history = useHistory();
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sidebarClasses = classname([
    styles.SideDrawer,
    {
      [styles.show]: showSideDrawer,
    },
  ]);

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
          <Link onClick={() => setShowSideDrawer(false)} to="/">
            <PaceBuddy />
          </Link>

          {/* navbar 페이지 분기로 수정, 라우팅 시 애니메이션 효과를 따로 적용 */}
          <Link
            className={styles.ham_button}
            onClick={() => setShowSideDrawer(!showSideDrawer)}
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
      <Fragment>
        {/* 내용물.. */}
        <div className={sidebarClasses}>
          <div className={styles.profile}>
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
          </div>
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
            <Link className={styles.link} style={{ color: "#C5C5C5" }}>
              리포트🚧
            </Link>
            <Link
              className={styles.link}
              style={{ color: "#00BEE6" }}
              to="/help"
            >
              페이스버디란?
            </Link>
          </div>
        </div>
        <ToggleSidebar />
      </Fragment>
    </>
  );
};

export default NavBar;
