import { useState } from 'react';
// import styles from "./calender.module.css";
import styles from "./calendar.module.css";

import moment from 'moment';

// 달력 코드 참조 https://yeolceo.tistory.com/m/69?category=919628

const Calendar = () => {

    const [getMoment, setMoment] = useState(moment());
    const today = getMoment;    // today == moment()   입니다.

    const firstWeek = today.clone().startOf('month').week();  //첫주
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();    //마지막주
    //53주 표현

    const calendarArr=()=>{

        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) { //첫주에서 마지막주까지
          result = result.concat(
            <tr key={week}>
                {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                      <button key={index} onClick={'console.log(moment().format("YYYY-MM-DD"))'} style={{backgroundColor:'red'}} >
                        <span>{days.format('D')}</span>
                      </button>
                  );
                }else if(days.format('MM') !== today.format('MM')){
                  return(
                      <button key={index} onClick={'console.log(moment().format("YYYY-MM-DD"))'} style={{backgroundColor:'gray'}} >
                        <span>{days.format('D')}</span>
                      </button>
                  );
                }else{
                  return(
                      <button key={index} onClick={'console.log(moment().format("YYYY-MM-DD"))'} >
                        <span>{days.format('D')}</span>
                      </button>
                  );
                }
              })
            }
            </tr>);
        }
        return result;
      }



    return (
        <div className="App">

            <div className="control">
                <button onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')) }}>이전달</button>
                {/* YYYY는 년도 MM 은 달 입니다. */}
                <span>{today.format('YYYY 년 MM 월')}</span>
                <button onClick={() => { setMoment(getMoment.clone().add(1, 'month')) }}>다음달</button>
            </div>
            <table>
                <tbody>
                    {calendarArr()}
                </tbody>
            </table>
        </div>
    );
}
export default Calendar;