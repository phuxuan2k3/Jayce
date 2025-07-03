import { cn } from "../../../../app/cn";
import { AttemptCoreSchema } from "../../api/test.api-gen-v2";

export class AttemptUtils {
	static status(status: AttemptCoreSchema["status"]): {
		text: string;
		fontColor: string;
		bandage: string;
	} {
		switch (status) {
			case "GRADED":
				return {
					text: "Graded",
					fontColor: cn("text-emerald-700"),
					bandage: cn("bg-emerald-50 text-emerald-700 border-emerald-200")
				};
			case "COMPLETED":
				return {
					text: "Reviewing...",
					fontColor: cn("text-blue-700"),
					bandage: cn("bg-blue-50 text-blue-700 border-blue-200")
				};
			case "IN_PROGRESS":
				return {
					text: "In Progress",
					fontColor: cn("text-amber-700"),
					bandage: cn("bg-amber-50 text-amber-700 border-amber-200")
				};
			default:
				return {
					text: "Unknown",
					fontColor: cn("text-gray-700"),
					bandage: cn("bg-gray-50 text-gray-700 border-gray-200")
				};
		}
	}
}