import styles from "./feedPage.module.css";
import { NullFrame } from "icons";
import React from "react";

function NullPage() {
  return (
    <div className={styles.set}>
      <div className={styles.icon}>
        <NullFrame></NullFrame>
      </div>
      <div className={styles.message}>아직 데이터가 없어요.</div>
    </div>
  );
}

export default NullPage;
