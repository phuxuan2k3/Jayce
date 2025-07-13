import { Globe, Timer, ListCollapse, ClipboardList } from "lucide-react";
import { TestFullSchema } from "../../api/test.api-gen-v2";
import { TestUtils } from "../../ui-items/test/test-utils";
import { SmallUserInfo } from "../SmallUserInfo";
import { useLanguage } from "../../../../LanguageProvider";

export const TestSidebarPrimitives = {
	Header: TestSidebarHeader,
	CommonInfo: TestSidebarCommonInfo,
};

function TestSidebarHeader({ test, mode, authorId }: { test: TestFullSchema; mode: TestFullSchema["mode"]; authorId: string; }) {
	return (
		<div className="flex flex-col items-center gap-2">
			<h2 className="text-2xl text-center">{test.title}</h2>
			<span className={TestUtils.getClassNames(mode).bandage}>{test.mode}</span>

			<SmallUserInfo userId={authorId} />
		</div>
	);
}

function TestSidebarCommonInfo({ language, minutesToAnswer, _aggregate }: { language: string, minutesToAnswer: number, _aggregate: any }) {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<Globe size={16} strokeWidth={2.5} />
				<span className="w-20 font-medium text-primary-toned-700">{t("test_sidebar_language")}:</span>
				<span className="font-semibold ml-auto">{language}</span>
			</div>

			<div className="flex items-center gap-2">
				<Timer size={18} strokeWidth={2.5} />
				<span className="w-20 font-medium text-primary-toned-700">{t("test_sidebar_duration")}:</span>
				<span className="font-semibold ml-auto">{minutesToAnswer} {t("test_sidebar_duration_unit")}</span>
			</div>

			<div className="flex items-center gap-2">
				<ListCollapse size={18} strokeWidth={2.5} />
				<span className="font-medium text-primary-toned-700">{t("test_sidebar_num_questions")}:</span>
				<span className="font-semibold ml-auto">{_aggregate.numberOfQuestions || 0}</span>
			</div>

			<div className="flex items-center gap-2">
				<ClipboardList size={18} strokeWidth={2.5} />
				<span className="font-medium text-primary-toned-700">{t("test_sidebar_total_points")}:</span>
				<span className="font-semibold ml-auto">{_aggregate.totalPoints || 0}</span>
			</div>
		</div>
	)
}

