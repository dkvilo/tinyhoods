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
