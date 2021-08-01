import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { ADD_NAVER_TOKEN } from "../../apollo/queries/login/login";

const { naver } = window;
const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;

function NaverLogin() {
  const history = useHistory();
  const [addToken, { loading, error, data }] = useMutation(ADD_NAVER_TOKEN, {
    onCompleted: (token) => {
      token && localStorage.setItem("Token", JSON.parse(token.naverLogin).JWT);
      token && history.push("/");
    },
  });

  const Naver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: `${CLIENT_KEY}`,
      callbackUrl: "http://localhost:8080",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 3, height: "47" },
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    window.location.href.includes("access_token") && GetToken();
    function GetToken() {
      const accessToken = window.location.href.split("=")[1].split("&")[0];
      addToken({ variables: { accessToken } });
    }
  };

  useEffect(() => {
    Naver();
    getNaverToken();
  }, []);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;
