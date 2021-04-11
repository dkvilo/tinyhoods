import { gql } from "apollo-boost";

export const GET_USER_PROJECTS = gql`
	query getUserProjects($username: String!, $page: Int!) {
		getUserProjects(username: $username, page: $page) {
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
