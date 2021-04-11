import { gql } from "apollo-boost";

export const GET_COMMENTS_BY_POST_ID = gql`
	query getComments($id: ID!, $page: Int!) {
		getComments(id: $id, page: $page) {
			docs {
				...commentsFields
				replies {
					...commentsFields
				}
			}
			nextPage
			pagingCounter
			totalDocs
			totalPages
		}
	}
	fragment commentsFields on CommentDocumentType {
		id
		content
		publishedAt
		author {
			avatar
			username
			image
		}
	}
`;
