import cheerio from "cheerio";
import request from "request";

const cache: any = {};

const get = (username: string, size: string) => {
	const url = "https://mobile.twitter.com/" + username;
	return new Promise((resolve) => {
		if (cache[username]) resolve(cache[username]);
		else {
			request(url, (_: any, __: any, body: any) => {
				const $ = cheerio.load(body);
				const url = ($(".avatar img").attr("src") || "").replace(
					"_normal",
					size
				);
				cache[username] = url;
				resolve(url);
			});
		}
	});
};

export default async (req: any, res: any) => {
	let {
		query: { username, size },
	} = req;

	if (!username) {
		throw new Error("Missing /?username=jack param");
	}

	if (size === "original") {
		size = "";
	}

	if (size === "large") {
		size = "_400x400";
	}

	if (size === "small") {
		size = "_mini";
	}

	if (!size) {
		size = "_200x200";
	}

	const result = await get(username as string, size);
	request(result as any).pipe(res);
};
