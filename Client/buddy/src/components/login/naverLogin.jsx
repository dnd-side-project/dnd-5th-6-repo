import React, { useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { ADD_NAVER_TOKEN } from "../../apollo/queries/login/login";
import { LOCAL_LOG_IN } from "./../../apollo/queries/login/login";
import { NaverLoginImg } from "icons";

const { naver } = window;
const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;
const NaverBtn = styled.div`
  display: none;
`;
function NaverLogin() {
  const history = useHistory();
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const [addToken, { loading, error, data }] = useMutation(ADD_NAVER_TOKEN, {
    onCompleted: (res) => {
      console.log(res);
      const naverLogin = JSON.parse(res.naverLogin);
      if (naverLogin.code === 201 || 200) {
        //localLogInMutation({ variables: { Token: naverLogin.JWT } });
        localStorage.setItem("Token", naverLogin.JWT);
        history.push("/");
        history.go(0);
      }
    },
  });
  console.log(error);
  const Naver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: `${CLIENT_KEY}`,
      callbackUrl: "http://localhost:8080/login",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 5, height: "47" },
    });
    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { name, gender, email } = naverLogin.user;

        if (name === undefined) {
          alert("이름은 필수 동의 항목입니다. 정보 제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        } else if (gender === undefined) {
          alert("성별은 필수 동의 항목입니다. 정보 제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        } else if (email === undefined) {
          alert("이메일은 필수 동의 항목입니다. 정보 제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        }
      }
    });
  };

  const getNaverToken = () => {
    window.location.href.includes("access_token") && GetToken();
    function GetToken() {
      const accessToken = window.location.href.split("=")[1].split("&")[0];
      addToken({ variables: { accessToken } });
    }
  };

  const handleNaverLogin = () => {
    if (
      document &&
      document?.querySelector("#naverIdLogin")?.firstChild &&
      window !== undefined
    ) {
      const loginBtn = document.getElementById("naverIdLogin")?.firstChild;
      loginBtn.click();
    }
  };
  useEffect(() => {
    Naver();
    getNaverToken();
  }, []);

  return (
    <>
      <NaverBtn id="naverIdLogin" styles={{ display: "none" }} />
      <div onClick={handleNaverLogin}>
        <NaverLoginImg image="naver"></NaverLoginImg>
      </div>
    </>
  );
}

export default NaverLogin;
