import { cn } from '../../../../app/cn';
import { useLanguage } from '../../../../LanguageProvider';
import { AttemptCoreSchema } from '../../api/test.api-gen-v2'
import { AttemptUtils } from './attempt-utils';

export default function AttemptCard({
	attempt,
	onClick,
	className = '',
}: {
	attempt: AttemptCoreSchema;
	onClick?: (attempt: AttemptCoreSchema) => void;
	className?: string;
}) {
	const { t } = useLanguage();

	const { id, order, status, secondsSpent, createdAt, updatedAt, _aggregate, _include } = attempt;
	const { points, answered, answeredCorrect } = _aggregate;
	const { test } = _include;

	// Format time spent (seconds to mm:ss)
	const formatTime = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = s % 60;
		return `${m}:${sec.toString().padStart(2, '0')}`;
	};

	// Format date
	const formatDate = (date: string) => new Date(date).toLocaleString();

	return (
		<div className={cn(
			"border border-gray-200 bg-white rounded-lg shadow-md px-6 py-4 flex flex-col gap-2",
			onClick && "cursor-pointer hover:shadow-md transition-shadow",
			className
		)} onClick={() => onClick?.(attempt)}>
			<div className="flex justify-between items-center">
				<div className="font-semibold text-lg">{t("attempt_card_title")} #{order}</div>
				<span className={`px-2 py-1 rounded text-xs font-medium ${AttemptUtils.status(status).bandage}`}>{status}</span>
			</div>
			<div className="text-sm text-gray-600">{t("attempt_card_test")}: <span className="font-medium">{test.title}</span></div>
			<div className="flex flex-wrap gap-4 mt-2">
				<div>
					<span className="font-medium">{t("attempt_card_points")}:</span> {points}
				</div>
				<div>
					<span className="font-medium">{t("attempt_card_answered")}:</span> {answered}
				</div>
				<div>
					<span className="font-medium">{t("attempt_card_correct")}:</span> {answeredCorrect}
				</div>
				<div>
					<span className="font-medium">{t("attempt_card_time_spent")}:</span> {formatTime(secondsSpent)}
				</div>
			</div>
			<div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
				<div>{t("attempt_card_started")}: {formatDate(createdAt)}</div>
				<div>{t("attempt_card_updated")}: {formatDate(updatedAt)}</div>
				<div>{t("attempt_card_id")}: {id}</div>
			</div>
		</div>
	);
}
