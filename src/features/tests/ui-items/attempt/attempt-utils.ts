import { AttemptCoreSchema } from "../../api/test.api-gen-v2";

export class AttemptUtils {
	static status(attempt: AttemptCoreSchema): {
		text: string;
		fontColor: string;
		color: string;
	} {
		switch (attempt.status) {
			case "GRADED":
				return {
					text: "Graded",
					fontColor: "text-emerald-700",
					color: "bg-emerald-50 text-emerald-700 border-emerald-200"
				};
			case "COMPLETED":
				return {
					text: "Completed",
					fontColor: "text-blue-700",
					color: "bg-blue-50 text-blue-700 border-blue-200"
				};
			case "IN_PROGRESS":
				return {
					text: "In Progress",
					fontColor: "text-amber-700",
					color: "bg-amber-50 text-amber-700 border-amber-200"
				};
			default:
				return {
					text: "Unknown",
					fontColor: "text-gray-700",
					color: "bg-gray-50 text-gray-700 border-gray-200"
				};
		}
	}
}