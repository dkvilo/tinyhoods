import moment from "moment";

export function isMembershipExpired(date: any): boolean {
	if (!date) return true;
	return moment({}).diff(moment(date).format()) >= 0;
}
