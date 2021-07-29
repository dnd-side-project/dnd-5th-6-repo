import { gql } from "@apollo/client";

export const GET_CARD = gql`
  query getCard($flag: Int!) {
    getAllLatestPost(flag: $flag) {
      PostData {
        Post {
          postIndex
          uploadDate
          content
        }
        User {
          userName
        }
        Like
      }
      likeArray
    }
  }
`;
