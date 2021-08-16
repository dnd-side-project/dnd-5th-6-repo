import { gql } from "@apollo/client";

export const ADD_CARD = gql`
  mutation AddCard(
    $uploadDate: String!
    $exercise: Int!
    $content: String!
    $condition: Int!
    $feedOpen: Int!
  ) {
    addPost(
      uploadDate: $uploadDate
      exercise: $exercise
      content: $content
      condition: $condition
      feedOpen: $feedOpen
    )
  }
`;
