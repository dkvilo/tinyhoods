import { FormEvent } from "react";

export interface IProps {
	id?: string;
	author: any;
	publishedAt: string;
	content: string;
	images: any;
	comments: any;
	recentComment: any;
	onPostShallowClick(): (event: FormEvent<any>) => void;
	onImageClick({
		post,
		imageIndex,
	}: {
		post: any;
		imageIndex: number;
	}): (event: FormEvent<any>) => void;
}
