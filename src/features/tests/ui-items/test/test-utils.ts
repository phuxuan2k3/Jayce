import { cn } from "../../../../app/cn";

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

export class TestUtils {
	static getBandageClassName(mode: TestMode): string {
		return BandageClassName[mode];
	}

	static getClassNames(mode: TestMode): { bandage: string; text: string } {
		return classNames[mode];
	}
}
