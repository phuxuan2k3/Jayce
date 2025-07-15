import { TestFullSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import { Clock, CircleQuestionMark, Globe, ListCollapse } from "lucide-react";
import { TestUtils } from "../../../../../features/tests/ui-items/test/test-utils";
import { cn } from "../../../../../app/cn";
import { LanguageTranslations, useLanguage } from "../../../../../LanguageProvider";

export default function PracticeCoreCard({
	test,
	onClick,
	className = "",
}: {
	test: TestFullSchema;
	onClick?: (test: TestFullSchema) => void;
	className?: string;
}) {
	const { t, tTranslation } = useLanguage();

	if (test._detail.mode !== "PRACTICE") return null;

	const tLocal = (key: string) => tTranslation(key, Language);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div
			className={cn(
				"flex flex-col gap-2 bg-white border border-primary-toned-300 border-l-4 border-l-primary-toned-700 shadow-sm rounded-lg p-0 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1",
				onClick && "cursor-pointer",
				className
			)}
			onClick={() => onClick?.(test)}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-4 bg-primary-toned-50 border-b border-primary-toned-100">
				<div className="flex items-center gap-3">
					<h3 className="font-extrabold text-xl text-primary-toned-700">
						{test.title}
					</h3>

					<Bandage>
						<Globe size={16} />
						<span>{test.language}</span>
					</Bandage>
				</div>

				<div className="text-sm text-primary-toned-600 font-semibold">
					{test._aggregate.totalAttempts > 0 ? (
						<span>
							{tLocal("attempts")}: {test._aggregate.totalAttempts}
						</span>
					) : (
						<span>
							{tLocal("no_attempts")}
						</span>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] px-6 py-2">

				{/* Context */}
				<div className="flex flex-col justify-between h-full">
					{test.description && (<p className="text-primary-toned-600 text-sm leading-relaxed mb-2 line-clamp-2">
						{tLocal("description")}: {test.description}
					</p>
					)}
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-xs text-primary-toned-600 font-semibold">TAGS:</span>

						{test._detail.tags.map(tag => (
							<Bandage key={tag} className="bg-blue-chill-50 text-blue-chill-600 border-blue-chill-300">{tag}</Bandage>
						))}
					</div>

				</div>

				<div className="flex flex-wrap gap-4 justify-end">
					<div className="flex items-center gap-2">
						<Bandage>
							<Clock size={16} />
							<span>{test.minutesToAnswer} {t("practice_card_time_unit")}</span>
						</Bandage>
						<Bandage>
							<CircleQuestionMark size={16} />
							<span>{test._detail.numberOfQuestions} {tLocal("question_count")}</span>
						</Bandage>
					</div>
					<Bandage className={TestUtils.getDifficultyClassName(test._detail.difficulty)}>
						<ListCollapse size={16} />
						<span>{test._detail.difficulty}</span>
					</Bandage>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between px-6 py-3 bg-primary-toned-50 border-t border-primary-toned-100 text-xs text-primary-toned-500">
				<span>{t("practice_card_created")}: {formatDate(test.createdAt)}</span>
				<span>{t("practice_card_updated")}: {formatDate(test.updatedAt)}</span>
			</div>
		</div>
	);
}

const Bandage = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn(`
			bg-primary-toned-50 text-primary-toned-600 border border-primary-toned-300 inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full h-fit w-fit shadow-sm`,
			className
		)}>
			{children}
		</div>
	);
}

const Language: LanguageTranslations = {
	en: {
		description: "Description",
		no_attempts: "No attempts yet",
		attempts: "Attempts",
		question_count: "Questions",
		language: "Language",
	},
	vi: {
		description: "Mô tả",
		no_attempts: "Chưa có lượt làm",
		attempts: "Lượt làm",
		question_count: "Câu hỏi",
		language: "Ngôn ngữ",
	}
}