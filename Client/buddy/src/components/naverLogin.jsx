import React, { useEffect } from "react";

const { naver } = window;
const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;

function NaverLogin() {
  const Naver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: `${CLIENT_KEY}`,
      callbackUrl: "http://localhost:3000",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 1, height: "47" },
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    window.location.href.includes("access_token") && GetToken();
    function GetToken() {
      const token = window.location.href.split("=")[1].split("&")[0];
      console.log(token);
    }
  };
  useEffect(() => {
    Naver();
    getNaverToken();
  }, []);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;
