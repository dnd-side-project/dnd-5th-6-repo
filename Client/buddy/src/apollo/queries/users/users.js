import { gql } from "@apollo/client";

export const GET_NICKNAME = gql`
  query getNickname {
    userNickname
  }
`;
