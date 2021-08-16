import styles from "./feedPage.module.css";
import { ErrorFrame } from "icons";
import React from "react";

function ErrorPage() {
  return (
    <div className={styles.set}>
      <div className={styles.icon}>
        <ErrorFrame></ErrorFrame>
      </div>
      <div className={styles.message}>
        오류가 발생했어요.
        <br />
        잠시 후 다시 시도해주세요.
      </div>
    </div>
  );
}

export default ErrorPage;
