import React from "react";
import styles from "./like.module.css";
function Like(props) {
  console.log(props);
  return (
    <div className={styles.like}>
      <button
        className={styles.likeBtn}
        onClick={() => props.handleLikeClick(props.postIndex)}
      >
        {" "}
      </button>
      <span className={styles.likeCount}>{props.like}</span>
    </div>
  );
}

export default Like;
