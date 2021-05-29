import { gql } from "apollo-boost";

export const GET_USER_PROJECTS = gql`
	query getUserProjects($username: String!, $page: Int!, $token: String) {
		getUserProjects(username: $username, page: $page, token: $token) {
			totalDocs
			docs {
				name
				avatar
				description
				createdAt
				updatedAt
				followers {
					username
				}
				author {
					username
					image
				}
			}
		}
	}
`;
