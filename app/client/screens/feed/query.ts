import { gql } from "apollo-boost";

export const GET_POSTS = gql`
	query getPosts($data: GetPostsInput!) {
		getPosts(data: $data) {
			docs {
				id
				author {
					username
					avatar
					image
				}
				images {
					src
				}
				recentComment {
					id
					content
					publishedAt
					author {
						avatar
						image
						username
					}
				}
				content
				publishedAt
			}
			nextPage
			pagingCounter
			totalDocs
			totalPages
		}
	}
`;
