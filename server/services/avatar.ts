import squareicon from "squareicon";
import { promisify } from "util";

export default function (username: string) {
	return promisify(squareicon)({
		id: username,
		symmetry: "vertical",
		size: 128,
		padding: 5,
		pixels: 5,
		colors: 0,
		scheme: "raw",
		background: "rgba(255, 255, 255, 1)",
	} as any);
}
