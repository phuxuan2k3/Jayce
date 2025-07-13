import { TestFullSchema } from '../../../../../features/tests/api/test.api-gen-v2';
import { Check, X } from 'lucide-react';
import { statusEnum } from './utils';
import { cn } from '../../../../../app/cn';
import { useLanguage } from '../../../../../LanguageProvider';

interface ExamCoreItemRowProps {
	test: TestFullSchema;
	onClick?: (test: TestFullSchema) => void;
	className?: string;
}

export default function ExamCoreItemRow({ test, onClick, className = '' }: ExamCoreItemRowProps) {
	if (test.mode !== 'EXAM' || test._detail.mode !== 'EXAM') return null;

	const { title, updatedAt, _detail, _aggregate } = test;
	const { roomId, isPublic, closeDate, openDate, hasPassword } = _detail;
	const { totalCandidates } = _aggregate;

	return (
		<tr
			className={`hover:bg-primary-toned-50 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-sm' : ''} ${className}`}
			onClick={() => onClick?.(test)}
		>
			<td className="px-6 py-4 font-semibold text-gray-800">{title}</td>
			<td className="px-6 py-4 text-sm text-primary-toned-600">{formatDate(updatedAt)}</td>
			<td className="px-6 py-4 font-mono text-sm text-gray-700 rounded-md mx-1">{roomId}</td>
			<td className="px-6 py-4 text-center">{booleanIcon(hasPassword)}</td>
			<td className="px-6 py-4 text-center">{booleanIcon(isPublic)}</td>
			<td className="px-6 py-4 text-center">
				<StatusItem openDate={openDate} closeDate={closeDate} />
			</td>
			<td className="px-6 py-4 text-right font-medium text-primary-toned-700">{totalCandidates}</td>
		</tr>
	);
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
		return (
			<div className="inline-flex items-center justify-center w-6 h-6 bg-primary-toned-100 rounded-full">
				<Check className="h-4 w-4 text-primary-toned-700" />
			</div>
		);
	}
	return (
		<div className="inline-flex items-center justify-center w-6 h-6 bg-secondary-toned-100 rounded-full">
			<X className="h-4 w-4 text-secondary-toned-700" />
		</div>
	);
}

function StatusItem({
	openDate,
	closeDate,
	className = "",
}: {
	openDate: string | null;
	closeDate: string | null;
	className?: string;
}) {
	const status = statusEnum(openDate, closeDate);
	const statusColor = (status: "UPCOMING" | "OPEN" | "CLOSED") => {
		switch (status) {
			case "UPCOMING":
				return cn("bg-yellow-100 text-yellow-800");
			case "OPEN":
				return cn("bg-blue-200 text-blue-800");
			case "CLOSED":
				return cn("bg-red-100 text-red-800");
			default:
				return cn("bg-gray-100 text-gray-800");
		}
	}

	return (
		<span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor(status)} ${className}`}>
			{status}
		</span>
	);
}


ExamCoreItemRow.Header = () => {
	const { t } = useLanguage();

	return (
		<thead>
			<tr className="bg-primary-toned-700 text-white font-bold">
				<th className="px-6 py-4 text-left">{t("exam_table_title")}</th>
				<th className="px-6 py-4 text-left">{t("exam_table_modified")}</th>
				<th className="px-6 py-4 text-left">{t("exam_table_room_id")}</th>
				<th className="px-6 py-4 text-center">{t("exam_table_password")}</th>
				<th className="px-6 py-4 text-center">{t("exam_table_public")}</th>
				<th className="px-6 py-4 text-center">{t("exam_table_status")}</th>
				<th className="px-6 py-4 text-right">{t("exam_table_candidates")}</th>
			</tr>
		</thead>
	)
};

ExamCoreItemRow.Body = ({
	examList,
	onExamClick
}: {
	examList: TestFullSchema[];
	onExamClick?: (exam: TestFullSchema) => void;
}) => (
	<tbody className="divide-y divide-gray-300">
		{examList.map((exam, index) => (
			<ExamCoreItemRow
				key={exam.id}
				test={exam}
				onClick={onExamClick}
				className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
			/>
		))}
	</tbody>
);
