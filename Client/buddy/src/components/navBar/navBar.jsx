import React, { useState } from "react";
import styles from "./navBar.module.css";
import { NavItem, NavLink } from "reactstrap";
import { Hamburger, PaceBuddy } from "../../icons";
import { Link } from "react-router-dom";

function NavBar() {

// const Navbar = () => {

  return (<>
      <div className={styles.height}>
        <Link to="/">
          <PaceBuddy />
        </Link>

        {/* navbar 페이지 분기로 수정, 라우팅 시 애니메이션 효과를 따로 적용 */}
        <Link className={styles.hambtn} to="/navbar">
          <Hamburger />
        </Link>
      </div>
      <hr className={styles.line}></hr>
      </>
  );
};
// }

export default NavBar;
