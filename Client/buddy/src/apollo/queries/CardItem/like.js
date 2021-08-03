import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
  mutation AddLike($postIndex: Int!) {
    likePost(postIndex: $postIndex)
  }
`;
