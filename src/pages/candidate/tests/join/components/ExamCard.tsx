import { TestFullSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import { Clock, Calendar, DoorOpen, Lock } from "lucide-react";
import { cn } from "../../../../../app/cn";
import { useGetUsersQuery } from "../../../../../features/auth/api/auth-profile.api";
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import { useLanguage } from "../../../../../LanguageProvider";

export default function ExamCard({
	test,
	onClick,
	className = "",
}: {
	test: TestFullSchema;
	onClick?: (test: TestFullSchema) => void;
	className?: string;
}) {
	const { t } = useLanguage();

	if (test._detail.mode !== "EXAM") return null;

	const authorQuery = useGetUsersQuery({
		user_ids: [test.authorId],
	});

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div
			className={cn(
				"relative bg-white border-l-4 border-primary shadow-md rounded-xl p-0 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1",
				onClick && "cursor-pointer",
				className
			)}
			onClick={() => onClick?.(test)}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-4 bg-primary-toned-50 border-b border-primary-toned-100">
				<div className="flex-1 flex items-center gap-3">
					<h3 className="font-extrabold text-xl text-primary-toned-900">{test.title}</h3>
				</div>

				<FetchStateCover2
					fetchState={authorQuery}
					loadingComponent={<span className="text-sm text-primary-toned-600">{t("exam_card_loading_author")}</span>}
					dataComponent={({ users: data }) => (
						<>
							<span className="text-sm text-primary-toned-600">
								{t("exam_card_author")}:
							</span>
							&nbsp;
							<span className="text-sm text-primary-toned-600 font-semibold">
								{data.length > 0 ? data[0].metadata.fullname : t("exam_card_unknown_author")}
							</span>
						</>
					)}
				/>
			</div>

			{/* Content */}
			<div className="px-6 py-3">
				<p className="text-sm text-primary-toned-600 mb-4 ">{test.description}</p>
				<div className="flex justify-between items-start mt-2 text-sm text-primary-toned-600">
					<div className="grid grid-cols-2 gap-y-1 gap-x-4 items-center">
						<div className="flex items-center gap-2 text-primary-toned-600">
							<Calendar size={16} className="text-primary-toned-400" />
							<span>{t("exam_card_start")}:</span>
						</div>
						<span className="font-semibold">
							{formatDate(test._detail.openDate)}
						</span>

						<div className="flex items-center gap-2 text-primary-toned-600">
							<Calendar size={16} className="text-primary-toned-400" />
							<span>{t("exam_card_end")}:</span>
						</div>
						<span className="font-semibold">
							{formatDate(test._detail.closeDate)}
						</span>

						<div className="flex items-center gap-2 text-primary-toned-600">
							<DoorOpen size={16} className="text-primary-toned-400" />
							<span>{t("exam_card_room")}:</span>
						</div>
						<span className="font-semibold">
							{test._detail.roomId}
						</span>
					</div>

					<div className="flex flex-col items-end gap-2">
						<div className="flex items-center gap-2">
							<Clock size={16} className="text-primary-toned-400" />
							<span>{test.minutesToAnswer} {t("exam_card_time_unit")}</span>
						</div>
						<div>
							<span className="text-xs font-bold bg-primary-toned-200 text-primary-toned-800 px-2 py-1 rounded-full tracking-wide">
								{test.language.toUpperCase()}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Lock size={16} className="text-primary-toned-400" />
							<span>{test._detail.hasPassword === true ? t("exam_card_has_password") : t("exam_card_no_password")}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between px-6 py-3 bg-primary-toned-50 border-t border-primary-toned-100 text-xs text-primary-toned-500">
				<span>{t("exam_card_last_modified")}: {formatDate(test.updatedAt)}</span>
			</div>
		</div>
	);
}
