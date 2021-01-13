import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
	mutation createToggleLikePost($data: ToggleLikePostInput!) {
		createToggleLikePost(data: $data)
	}
`;
