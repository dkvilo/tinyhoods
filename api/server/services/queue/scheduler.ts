import { emailQueue } from "../../providers";
import { IEmailParams, IEventNames } from "../email";

interface ISchedulerParams {
	name: IEventNames;
	time: number;
	receiver: IEmailParams;
}

export default function ({ name, time, receiver }: ISchedulerParams) {
	emailQueue.add(name, receiver, {
		delay: time - Date.now(),
		attempts: 3,
	});

	if (process.env.NODE_ENV === "development") {
		console.log(`[QUEUE (EMAIL)]: Job Created ${name}`);
	}
}
