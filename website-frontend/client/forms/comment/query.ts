import { gql } from "apollo-boost";

export const CREATE_COMMENT = gql`
	mutation createComment($data: CreateCommentInput!) {
		createComment(data: $data)
	}
`;
