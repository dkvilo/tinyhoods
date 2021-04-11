import { FormEvent } from "react";

export interface IProps {
	index?: number;
	id?: string;
	author: any;
	publishedAt: string;
	content: string;
	images: any;
	comments: any;
	likesCount: number;
	commentsCount: number;
	recentComment: any;
	_liked: boolean;
	_editable: boolean;
	onPostShallowClick(): (event: FormEvent<any>) => void;
	onImageClick({
		post,
		imageIndex,
	}: {
		post: any;
		imageIndex: number;
	}): (event: FormEvent<any>) => void;
}
