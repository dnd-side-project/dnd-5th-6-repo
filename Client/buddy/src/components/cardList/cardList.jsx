// import React from "react";
// import styles from "./cardList.module.css";
// import { gql, useQuery } from "@apollo/client";
// import CardItem from "../cardItem/cardItem";

// const GET_CARD = gql`
//   query getCard {
//     getAllLatestPost {
//       postIndex
//       uploadDate
//       content
//     }
//   }
// `;

// function CardList() {
//   const { loading, error, data } = useQuery(GET_CARD);
//   const items = data && Object.values(data)[0];

//   return (
//     <ul className={styles.cardList}>
//       {loading && <h1>loading</h1>}
//       {items?.map((card) => (
//         <CardItem key={card.postIndex} card={card} />
//       ))}
//     </ul>
//   );
// }

// export default CardList;


import React from "react";
import styles from "./cardList.module.css"; //css 임포트 적용
import { gql, useQuery } from "@apollo/client"; //서버에서 쿼리받기
import CardItem from "../cardItem/cardItem";  



const GET_CARD = gql`
  query getCard {
    getAllLatestPost {
      postIndex
      uploadDate
      content
    }
  }
`;


function CardList() {
  const { loading, error, data } = useQuery(GET_CARD);
  const items = data && Object.values(data)[0];

  return (
    // 카드 스타일 css 적용
    // 제일 바깥 : 카드 전체 적용
    
    <div className={styles.container}> 

    
      <ul className={styles.cardList}>
      {loading && <h1>loading</h1>}
      {items?.map((card) => (
        //카드 끼리 띄우기 : carddescription
        <div className={styles.carddescription}>
        <CardItem key={card.postIndex} card={card} />

        {/* 추후 좋아요 수 서버에서 받아 출력 */}
        <button>좋아용</button> 
        </div>
      ))}
      </ul>
    </div >
  );
}

export default CardList;
