import { gql } from "apollo-boost";

export const GET_USER_POSTS = gql`
	query getUserPosts($data: GetUserPostsInput!) {
		getUserPosts(data: $data) {
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
					content
					publishedAt
					author {
						avatar
						image
						username
					}
				}
				likesCount
				commentsCount
				content
				publishedAt
				_liked
				_editable
			}
			nextPage
			totalDocs
		}
	}
`;
