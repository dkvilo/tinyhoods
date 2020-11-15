import mongoose from "mongoose";
import { isEmpty } from "ramda";

import UserModel from "../../../models/users";
import { decryptToken, requireToken } from "../../../utils";

import FormData from "form-data";
import { createReadStream, writeFile, writeFileSync } from "fs";

export default async function imageUpload(
	parent: any,
	args: any,
	context: any
) {
	try {
		// console.log(args);

		// const { createReadStream, filename, mimetype } = await args.file;
		// const requestBody = {
		// 	image: args.file,
		// };

		// var form = new FormData();
		// form.append("image", Buffer.from(args.file));

		// console.log(form);

		// const response = await fetch(
		// 	"https://tinyhoods.net/imcargo/upload?accessToken=b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad",
		// 	{
		// 		method: "POST",
		// 		body: form as any,
		// 	}
		// );

		// const data = await response.json();

		// console.log(data);

		const myHeaders = new Headers();

		writeFileSync(`./test.png`, Buffer.from(args.file, "base64"));

		myHeaders.append("Content-Type", "multipart/form-data");
		myHeaders.append(
			"Cookie",
			"__cfduid=df0fa5f3baeb6462967ad9a78257c3b5f1605298398"
		);

		const formdata = new FormData();
		// let b = Buffer.from(args.file, "base64");
		// let ui32 = new Uint32Array(
		// 	b.buffer,
		// 	b.byteOffset,
		// 	b.byteLength / Uint32Array.BYTES_PER_ELEMENT
		// );

		formdata.append("image", args.file);

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formdata,
		};

		const response = await fetch(
			"https://tinyhoods.net/imcargo/upload?accessToken=b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad&size=400x400&blur=8&",
			requestOptions as any
		);
		const data = await response.json();

		return data?.success;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}
