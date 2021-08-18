import { gql } from "@apollo/client";

export const GET_ALL_CARD = gql`
  query getAllCard($flag: Int!) {
    getAllLatestPost(flag: $flag) {
      PostData {
        Post {
          postIndex
          uploadDate
          content
          condition
          exercise
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

export const GET_OPTIONAL_CARD = gql`
  query getOptionalCard($flag: Int!, $exercise: Int!) {
    getSpecificExercise(flag: $flag, exercise: $exercise) {
      PostData {
        Post {
          postIndex
          uploadDate
          content
          condition
          exercise
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

export const GET_MY_CARD = gql`
  query getMyCard {
    getMyPost {
      PostData {
        Post {
          postIndex
          uploadDate
          exercise
          content
          condition
        }
        Like
      }
      likeArray
    }
  }
`;
