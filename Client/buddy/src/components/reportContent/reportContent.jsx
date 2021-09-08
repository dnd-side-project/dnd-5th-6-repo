import React from "react";
import styles from "./reportContent.module.css"
import { ReportIMG, ToReportButton, MadeReportBanner } from "icons";
import { Link } from "react-router-dom";

function ReportContent() {
  return <>
  <div className={styles.report}>리포트</div>
  <div className={styles.onement}>버디의 한 마디</div>

  {/* 추후 받아오는 결과 값에 다라 바뀌는 멘트 */}
  <div className={styles.changement}>조금만 더 힘내면 달라진 자신을 볼 수 있을거에요.</div>

    <div className={styles.emptyimg}>
    <ReportIMG></ReportIMG>
    </div>

    <div className={styles.savement1}>기록을 꾸준히 저장하고</div>
    <div className={styles.savement2}>운동 컨디션 리포트를 확인해보세요.</div>
    
    <div className={styles.to_report_button}>
    <Link to="/record">
    <ToReportButton></ToReportButton>
    </Link>
    </div>

    <div>
        <MadeReportBanner></MadeReportBanner>
    </div>

  </>;
}

export default ReportContent;