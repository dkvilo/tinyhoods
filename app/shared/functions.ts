import moment from "moment";

export function isMembershipExpired(date: any): Boolean {
	if (!date) return true;
	return moment({}).diff(moment(date).format()) >= 0;
}

export function createElementFromHTML(htmlString: string) {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}
