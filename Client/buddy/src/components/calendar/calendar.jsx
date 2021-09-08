import { useState } from "react";
// import styles from "./calender.module.css";
import styles from "./calendar.module.css";
// import moment from "moment";
import moment, { tz } from "moment-timezone";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MYDATE } from "apollo/queries/mydata/mydate";

// 달력 코드 참조 https://yeolceo.tistory.com/m/69?category=919628

import styled from "styled-components";

const DayButton = styled.button`
height: 2.2rem;
width: 10%;
border: none;
border-radius: 100px;
margin-left: 2%;
margin-right: 2%;
margin-bottom:1%;
background-color: white;
  :hover {
    background-color: #00bee6;
    color: white;
  }
`;

const TodayButton = styled.button`
height: 2.2rem;
width: 10%;
border: none;
border-radius: 100px;
margin-left: 2%;
margin-right: 2%;
margin-bottom:1%;
background-color: #00BEE6;
color: white;
:hover {
  background-color: white;
  color: #474747;
}
`;

const Calendar = (props) => {

    const [getMoment, setMoment] = useState(moment());
    const today = getMoment;    // today == moment()

    const firstWeek = today.clone().startOf('month').week();  //첫주
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();    //마지막주
    //53주 표현

    const dateState = props.dateState;
    const setDateState = props.setDateState;
    const setShowModal = props.setShowModal;


    // const mydate = props.mydate;
    // const setMydate = props.setMydate;

    // const mymydate = mydate;

    const { data: dateList } = useQuery(GET_MYDATE);



    const mymydate = dateList && dateList["getMyDate"];

    console.log(mymydate.length);
    for (let i = 0; i <= mymydate.length; i++) {
      let seoul = moment(mymydate[i]).tz("Asia/Seoul");
      console.log(seoul.format("YYYY.MM.DD"));
    }
  
  
     //버튼 선택
  const [selectExe, setSelectExe] = useState(0);
  const [click, setClick] = useState(0);

    const calendarArr=()=>{

        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) { //첫주에서 마지막주까지
          result = result.concat(
            <tr key={week}>
                {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                
                const OnLogDate =() => {
                  setDateState(days.format('YYYY.MM.DD'));
                  console.log(dateState);
                  setShowModal(false);
                }

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                    
                      <TodayButton key={index} onClick={OnLogDate}>
                        <span>{days.format('D')}</span>
                      </TodayButton>
                  );

                }else if(days.format('MM') !== today.format('MM')){
                  for (let i = 0; i <= mymydate.length; i++) {
                    let seoul = new Array();
                    seoul = moment(mymydate[i]).tz("Asia/Seoul");
                    let arr = seoul.format("YYYY.MM.DD");
                    // console.log(seoul.format("YYYY.MM.DD"));
                    if (JSON.stringify(arr) === JSON.stringify(days.format("YYYY.MM.DD"))){
                      return(
                        <button key={index} className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                    }
                  }
                  return(
                      <button key={index} className={styles.notdays}>
                        <span>{days.format('D')}</span>
                      </button>

// {isLoggedIn ? (
//   <Link to="/record/post">
//     <RecordBtn></RecordBtn>
//   </Link>
// ) : (
//   <div onClick={openModal}>
//     <RecordBtn></RecordBtn>
//   </div>
// )}
                  );
                }else{
                  
                  for (let i = 0; i <= mymydate.length; i++) {
                    let seoul = new Array();
                    seoul = moment(mymydate[i]).tz("Asia/Seoul");
                    let arr = seoul.format("YYYY.MM.DD");
                    // console.log(seoul.format("YYYY.MM.DD"));
                    if (JSON.stringify(arr) === JSON.stringify(days.format("YYYY.MM.DD"))){
                      return(
                        <button key={index} className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                    }
                  }
                  return(
                      <DayButton key={index} className={styles.days} onClick={OnLogDate}>
                        <span>{days.format('D')}</span>
                      </DayButton>
                  );
                }
              })
            }
            </tr>);
        }
        return result;
      }


    return (
        <div>
          

            <div className={styles.body}>
          <div onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')) }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15.5L7 10L12.5 4.5" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span className={styles.font}>{today.format("YYYY.MM ")}</span>

        <div
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 4.5L13 10L7.5 15.5"
              stroke="#C5C5C5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <button className={styles.mondays}>일</button>
        <button className={styles.mondays}>월</button>
        <button className={styles.mondays}>화</button>
        <button className={styles.mondays}>수</button>
        <button className={styles.mondays}>목</button>
        <button className={styles.mondays}>금</button>
        <button className={styles.mondays}>토</button>
      </div>
      <table className={styles.container}>
        <tbody>{calendarArr()}</tbody>
      </table>
    </div>
  );
};
export default Calendar;
