import React from "react";
import styles from "../styles/ProgressBar.module.scss";

function ProgressBar({ state }) {
  if (state === 1)
    return (
      <div className={styles.container}>
        <div className={styles.circleFull}></div>
        <div className={styles.line}></div>
        <div className={styles.circleEmpty}></div>
        <div className={styles.line}></div>
        <div className={styles.circleEmpty}></div>
      </div>
    );
  else {
    return (
      <div className={styles.container}>
        <div className={styles.circleFull}></div>
        <div className={styles.line}></div>
        <div className={styles.circleFull}></div>
        <div className={styles.line}></div>
        <div className={styles.circleEmpty}></div>
      </div>
    );
  }
}

export default ProgressBar;
