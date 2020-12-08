import { FormEvent } from "react";

export interface IProps {
	id: string;
	content: string;
	author: any;
	publishedAt: string;
	isClickable?: boolean;
	canReply?: boolean;
	onReply?(e: FormEvent<any>): (comment: IProps) => void;
}
