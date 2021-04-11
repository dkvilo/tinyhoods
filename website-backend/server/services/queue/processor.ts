import { EmailEventEmitter, emit, IEmailParams } from "../email";

export const registrationSuccess = async (job: { data: IEmailParams }) => {
	const { to, subject, params } = job.data;
	emit(
		{
			event: "registration:success",
			params: {
				to,
				subject: `Tiny Hoods - ${subject}`,
				params: {
					name: params.name,
					username: params.username,
					actionText: params.actionText,
					actionUrl: params.actionUrl,
					hasAction: params.hasAction,
				},
			},
		},
		EmailEventEmitter
	);
};
