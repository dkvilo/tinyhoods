import { emailQueue } from "../../providers";
import { IEventNames } from "../email";
import { registrationSuccess } from "./processor";

type ListItemType = { name: IEventNames; handler: any };
const list: [ListItemType] = [
	{
		name: "registration:success",
		handler: registrationSuccess,
	},
];

list.forEach((item: ListItemType) =>
	emailQueue.process(item.name, item.handler)
);
