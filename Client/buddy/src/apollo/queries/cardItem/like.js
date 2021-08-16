import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
  mutation AddLike($postIndex: Int!, $isDuplicate: Boolean!) {
    likePost(postIndex: $postIndex, isDuplicate: $isDuplicate)
  }
`;
