export interface IProps {
	postId: string;
	onSuccess(): void;
	onReply: {
		id: string;
		author: {
			username: string;
			image: string;
			avatar: string;
		};
	};
}
