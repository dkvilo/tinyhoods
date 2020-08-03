import moment from "moment";

export function isMembershipExpired(date: any): Boolean {
	if (!date) return true;
	return moment({}).diff(moment(date).format()) >= 0;
}
