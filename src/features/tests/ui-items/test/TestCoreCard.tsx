import { TestCoreSchema } from "../../api/test.api-gen-v2";
import { Clock, Calendar } from "lucide-react";
import { TestUtils } from "./test-utils";
import { cn } from "../../../../app/cn";

export default function TestCoreCard({
	test,
	onClick,
	className = "",
}: {
	test: TestCoreSchema;
	onClick?: (test: TestCoreSchema) => void;
	className?: string;
}) {
	const modeClass = TestUtils.getBandageClassName(test.mode);
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div
			className={cn(
				"relative bg-white border-l-4 border-primary-toned-400 shadow-sm rounded-xl p-0 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1",
				onClick && "cursor-pointer",
				className
			)}
			onClick={() => onClick?.(test)}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-4 bg-primary-toned-50 border-b border-primary-toned-100">
				<div className="flex items-center gap-3">
					<h3 className="font-extrabold text-xl text-primary-toned-900">{test.title}</h3>
				</div>
				<span className={modeClass}>
					{test.mode}
				</span>
			</div>

			{/* Content */}
			<div className="px-6 py-3">
				<p className="text-primary-toned-700 text-base leading-relaxed mb-2 min-h-[40px]">{test.description}</p>
				<div className="flex flex-wrap gap-6 mt-2 text-sm text-primary-toned-600">
					<div className="flex items-center gap-2">
						<Clock size={16} className="text-primary-toned-400" />
						<span>{test.minutesToAnswer} min</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar size={16} className="text-primary-toned-400" />
						<span>Created {formatDate(test.createdAt)}</span>
					</div>
					<div>
						<span className="text-xs font-bold bg-primary-toned-200 text-primary-toned-800 px-2 py-1 rounded-full tracking-wide">
							{test.language.toUpperCase()}
						</span>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between px-6 py-3 bg-primary-toned-50 border-t border-primary-toned-100 text-xs text-primary-toned-500">
				<span>Updated: {formatDate(test.updatedAt)}</span>
			</div>
		</div>
	);
}
