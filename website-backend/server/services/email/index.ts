import { EventEmitter } from "events";
import { renderFile } from "ejs";
import { join } from "path";

import { nodemailerMailgunNoReply } from "../../providers";

export interface ISuccessfulRegistrationProps {
	username: string;
	name?: string;
	hasAction?: boolean;
	actionText?: string;
	actionUrl?: string;
}

export interface IEmailParams {
	to: string;
	subject: string;
	params: ISuccessfulRegistrationProps;
}

export type IEventNames =
	| "registration:success"
	| "password:recover"
	| "subscription:remind"
	| "subscription:success";

export interface IEventTriggerParams {
	event: IEventNames;
	params: IEmailParams;
}

interface CustomEventEmitter {
	trigger(params: IEventTriggerParams);
}

const TinyHoodsEventEmitter = EventEmitter;
export const EmailEventEmitter: NodeJS.EventEmitter &
	CustomEventEmitter = new TinyHoodsEventEmitter() as NodeJS.EventEmitter &
	CustomEventEmitter;

export function emit(
	{ event, params }: IEventTriggerParams,
	_event: NodeJS.EventEmitter
) {
	_event.emit(event, params);
}

EmailEventEmitter.on(
	"registration:success",
	async ({ to, subject, params }: IEmailParams) => {
		const template = join(
			__dirname,
			"../",
			"../",
			"../",
			"../",
			"templates/email/no-replay/account/successful-registration.ejs"
		);

		const data = await renderFile(template, {
			username: params.username,
			name: params.name,
			hasAction: params?.hasAction || false,
			actionUrl: params?.actionUrl || null,
			actionText: params?.actionText || null,
		});

		await nodemailerMailgunNoReply.sendMail({
			from: `"Tiny Hoods" <noreply@tinyhoods.net>`,
			to,
			subject,
			html: data,
		});
	}
);
