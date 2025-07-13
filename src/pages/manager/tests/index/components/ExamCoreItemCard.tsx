import { TestFullSchema } from '../../../../../features/tests/api/test.api-gen-v2'
import { cn } from '../../../../../app/cn';
import { Check, X } from 'lucide-react';
import { statusEnum } from './utils';
import { useLanguage } from '../../../../../LanguageProvider';

export default function ExamCoreItemCard({
	test,
	className = '',
	onClick,
}: {
	test: TestFullSchema;
	className?: string;
	onClick?: (test: TestFullSchema) => void;
}) {
	const { t } = useLanguage();

	if (test.mode !== "EXAM" || test._detail.mode !== "EXAM") return null;

	const { title, updatedAt, _detail, _aggregate } = test;
	const { roomId, isPublic, closeDate, openDate, hasPassword } = _detail;
	const { totalCandidates } = _aggregate;

	return (
		<div
			className={cn(
				"flex flex-col bg-white border border-primary border-l-4 border-l-primary p-4 rounded-lg shadow-md",
				onClick && "cursor-pointer hover:bg-gray-100",
				className
			)}
			onClick={() => onClick?.(test)}
		>
			<div className='flex items-center'>
				<div className='flex flex-col'>
					<span className="font-semibold">
						{title}
					</span>
					<span className='text-gray-400 text-xs'>
						{t("exam_card_last_modified")}: {formatDate(updatedAt)}
					</span>
				</div>
			</div>

			<hr className='my-2 border-gray-200' />

			<div className='flex flex-col w-full text-sm px-2'>
				<div className='flex items-center justify-between'>
					<span className='text-gray-500'>{t("exam_card_room_id")}:</span>
					<span className='font-mono font-semibold truncate max-w-[140px] overflow-ellipsis whitespace-nowrap'>{roomId}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-gray-500'>{t("exam_card_has_password")}:</span>
					<span>{booleanIcon(hasPassword)}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-gray-500'>{t("exam_card_public")}:</span>
					<span>{booleanIcon(isPublic)}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-gray-500'>{t("exam_card_status")}:</span>
					<StatusItem openDate={openDate} closeDate={closeDate} />
				</div>
			</div>

			<hr className='my-2 border-gray-200' />

			<div className='flex flex-col w-full text-sm px-2'>
				<div className='flex items-center justify-between'>
					<span className='text-gray-500'>{t("exam_card_total_candidates")}:</span>
					<span className='truncate max-w-[140px] overflow-ellipsis whitespace-nowrap'>{totalCandidates}</span>
				</div>
			</div>
		</div>
	)
}


function formatDate(date: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	};
	return new Date(date).toLocaleDateString('en-US', options);
}

function booleanIcon(value: boolean | undefined): JSX.Element {
	if (value) {
		return <Check strokeWidth={3} className="inline h-4 w-4 text-primary" />;
	}
	return <X strokeWidth={3} className="inline h-4 w-4 text-secondary" />;
}

const StatusItem = ({
	openDate,
	closeDate,
}: {
	openDate: string | null;
	closeDate: string | null;
}) => {
	const status = statusEnum(openDate, closeDate);
	const statusColor = (status: "UPCOMING" | "OPEN" | "CLOSED") => {
		switch (status) {
			case "UPCOMING":
				return cn("text-yellow-700");
			case "OPEN":
				return cn("text-blue-700");
			case "CLOSED":
				return cn("text-red-700");
			default:
				return cn("text-gray-700");
		}
	};

	return (
		<span className={`text-xs font-semibold px-1 rounded-full ${statusColor(status)}`}>
			{String(status).toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
		</span>
	);
}