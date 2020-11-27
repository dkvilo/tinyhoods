import { gql } from "apollo-boost";

export const GET_POSTS = gql`
	query {
		getPosts {
			id
			author {
				username
				image
			}
			images {
				src
			}
			content
			publishedAt
		}
	}
`;
