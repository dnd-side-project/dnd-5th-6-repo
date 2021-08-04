import React from "react";
import styles from "./like.module.css";
function Like({ like, handleLikeToggle, postIndex }) {
  return (
    <div className={styles.like}>
      <button
        className={styles.likeBtn}
        onClick={() => handleLikeToggle(postIndex)}
      >
        {" "}
      </button>
      <span className={styles.likeCount}>{like}</span>
    </div>
  );
}

export default Like;
