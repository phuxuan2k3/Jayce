export function statusEnum(openDate: string | null, closeDate: string | null): "UPCOMING" | "OPEN" | "CLOSED" {
	const now = new Date();
	const openDateDate = openDate ? new Date(openDate) : new Date();
	const closeDateDate = closeDate ? new Date(closeDate) : new Date();
	if (openDateDate > now) {
		return "UPCOMING";
	} else if (closeDateDate < now) {
		return "CLOSED";
	} else {
		return "OPEN";
	}
}