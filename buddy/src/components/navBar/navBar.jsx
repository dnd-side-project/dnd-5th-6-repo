import React, { useState } from "react";
import styles from "./navBar.module.css";
import { NavItem, NavLink } from "reactstrap";
import { Hamburger, PaceBuddy } from "../../icons";
import { Link } from "react-router-dom";

// function NavBar() {

const Navbar = () => {
  const [isOpen, setNav] = useState(false); //useState의 기능은 this.state와 유사하다, 초기값을 false로 설정
  const toggleNav = () => {
    setNav((isOpen) => !isOpen); //on, off 개념의 boolean
  };

  return (
    <div>
      {/* 위 작성 함수 호출 */}
      {/* pacebuddylogo */}
      <div>
        <Link to="/">
          <PaceBuddy />
        </Link>
        {/* <button className={styles.hambtn} onClick={toggleNav}>햄버거바</button>  */}
        {/* <Hamburger /> */}
        <svg
          className={styles.hambtn}
          onClick={toggleNav}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.59998 7H22.4M11.9724 14H22.4M7.91722 21H22.4"
            stroke="#474747"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className={isOpen ? `${styles.showmenu}` : `${styles.hidemenu}`}>
        {/* `${styles.navLinks} ${styles.showNav}` : `${styles.navLinks}`} */}
        <div className={styles.list}>
          <NavItem className={styles.listitem}>
            <NavLink href="/">Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/record/">record</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/report">report</NavLink>
          </NavItem>
        </div>
      </div>
      <hr />
    </div>
  );
};
// }

export default Navbar;
// import React, { useState } from "react";
// import styles from "./navBar.module.css";
// import { NavItem, NavLink } from "reactstrap";
// import { Hamburger, PaceBuddy } from "../../icons";
// import { Link } from "react-router-dom";
// // function NavBar() {
// const Navbar = () => {
//   const [isOpen, setNav] = useState(false); //useState의 기능은 this.state와 유사하다, 초기값을 false로 설정
//   const toggleNav = () => {
//     setNav((isOpen) => !isOpen); //on, off 개념의 boolean
//   };
//   return (
//     <div>
//       {/* 위 작성 함수 호출 */}
//       {/* pacebuddylogo */}
//       <div>
//         <Link to="/">
//           <PaceBuddy />
//         </Link>
//         {/* <button className={styles.hambtn} onClick={toggleNav}>햄버거바</button>  */}
//         {/* <Hamburger /> */}
//         <svg
//           className={styles.hambtn}
//           onClick={toggleNav}
//           width="28"
//           height="28"
//           viewBox="0 0 28 28"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M5.59998 7H22.4M11.9724 14H22.4M7.91722 21H22.4"
//             stroke="#474747"
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//           />
//         </svg>
//       </div>
//       <div className={isOpen ? `${styles.showmenu}` : `${styles.hidemenu}`}>
//         {/* `${styles.navLinks} ${styles.showNav}` : `${styles.navLinks}`} */}
//         <div className={styles.list}>
//           <NavItem className={styles.listitem}>
//             <NavLink href="/">Feed</NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink href="/record/">record</NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink href="/report">report</NavLink>
//           </NavItem>
//         </div>
//       </div>
//       <hr />
//     </div>
//   );
// };
// // }
// export default Navbar;
