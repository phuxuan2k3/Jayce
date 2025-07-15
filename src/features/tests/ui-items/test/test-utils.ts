import { cn } from "../../../../app/cn";
import { DifficultyType } from "../../../../pages/manager/tests/new/common/base-schema";

type TestMode = "PRACTICE" | "EXAM";

const CommonBandageClass = cn("text-xs font-semibold px-3 py-0.5 rounded-full");

const BandageClassName: Record<TestMode, string> = {
	EXAM: cn(CommonBandageClass, "bg-rose-100 text-rose-700 border border-rose-200"),
	PRACTICE: cn(CommonBandageClass, "bg-sky-100 text-sky-700 border border-sky-200"),
};

const classNames = {
	EXAM: {
		bandage: BandageClassName.EXAM,
		text: cn("text-rose-700"),
	},
	PRACTICE: {
		bandage: BandageClassName.PRACTICE,
		text: cn("text-sky-700"),
	},
};

const DifficultyClassName: Record<DifficultyType, string> = {
	Intern: cn("bg-green-100 text-green-700 border border-green-200"),
	Junior: cn("bg-yellow-100 text-yellow-700 border border-yellow-200"),
	Middle: cn("bg-orange-100 text-orange-700 border border-orange-200"),
	Senior: cn("bg-red-100 text-red-700 border border-red-200"),
	Expert: cn("bg-purple-100 text-purple-700 border border-purple-200"),
	Lead: cn("bg-gray-100 text-gray-700 border border-gray-200"),
}


export class TestUtils {
	static getDifficultyClassName(difficulty: string): string {
		return DifficultyClassName[difficulty as DifficultyType] || cn("bg-gray-100 text-gray-700 border border-gray-200");
	}

	static getBandageClassName(mode: TestMode): string {
		return BandageClassName[mode];
	}

	static getClassNames(mode: TestMode): { bandage: string; text: string } {
		return classNames[mode];
	}
}
