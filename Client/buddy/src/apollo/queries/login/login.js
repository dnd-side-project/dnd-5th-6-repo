import { gql } from "@apollo/client";

export const ADD_KAKAO_TOKEN = gql`
  mutation AddToken($accessToken: String!) {
    kakaoLogin(accessToken: $accessToken)
  }
`;

export const ADD_NAVER_TOKEN = gql`
  mutation AddNaverToken($accessToken: String!) {
    naverLogin(accessToken: $accessToken)
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export const LOCAL_LOG_IN = gql`
  mutation logUserIn($Token: String!) {
    logUserIn(Token: $Token) @client
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
