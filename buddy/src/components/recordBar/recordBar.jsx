import React from "react";
import styles from "./recordBar.module.css";
import { Link } from "react-router-dom";
import { RecordBtn } from "./../../icons";

function RecordBar() {
  return (
    <section>
      <div className={styles.box_section}>
        <div className={styles.record_bar}>
          <div className={styles.section_name}>기록</div>
          <div className={styles.section_text}>오늘의 컨디션은 어땠나요?</div>
        </div>
        <div className={styles.record_button}>
          <Link to="/record/post">
            <RecordBtn></RecordBtn>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecordBar;
