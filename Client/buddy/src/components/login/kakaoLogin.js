import React from "react";
import { useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

// 코드 참고 URL : https://velog.io/@seize/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8

const { Kakao } = window;

// 캐싱 쿼리
const ADD_TOKEN = gql`
  query AddToken($authObj: String!) {
    kakaoLogin(authObj: $authObj)
  }
`;


function KakaoLogin() { //카카오 로그인 함수
  const history = useHistory(); // history를 props에서 얻어왔을 때 처럼 동일하게 사용 가능, withRouter hoc가 필요없음
  const { Kakao } = window;

  const [addToken, { loading, error, data }] = useLazyQuery(ADD_TOKEN, {  //addToken
    onCompleted: (token) => {
      {
        token &&
          localStorage.setItem("jwtToken", JSON.parse(token.kakaoLogin).JWT);
      }
    }
  });

  const kakaoLoginClickHandler = () => {  //버튼 클릭시 실행 함순
    Kakao.Auth.login({  //카카오 로그인 함수
      success: function (authObj) {
        console.log(authObj);  //토큰 출력
        addToken({ variables: { authObj} }); //토큰 저장
      }

      //     fetch('요청 보낼 백엔드 서버 url 입력', {
      //       method: "POST",
      //       body: JSON.stringify({
      //         access_token: authObj.access_token, //토큰
      //       }),
      //     })
      //       .then((res) => res.json())
      //       .then((res) => {
      //         console.log(authObj.access_token)   //액세스 토큰 출력받기


      //         // localStorage.setItem("KAkao_token", res.access_token);
      //         // if (res.access_token) {
      //         //   alert("Pace Buddy");
      //         //   history.push("/login");}

      //       });
      //   },
      //   fail: function (err) {
      //     alert(JSON.stringify(err));
      //   },
    });
  };



  return (
    <div>
      {/* 버튼에 함수 연결 추후 이미지로 교체 */}
      <button className="btn kakao" onClick={kakaoLoginClickHandler}>
        소셜로그인
      </button>
    </div>
  );
}

export default KakaoLogin;
