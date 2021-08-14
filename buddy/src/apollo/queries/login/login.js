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
    isLoggedIn @client(always: true)
  }
`;
