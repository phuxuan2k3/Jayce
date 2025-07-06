import { ClipboardList } from "lucide-react";
import { TestFullSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import ExamCoreItemCard from "./ExamCoreItemCard";
import ExamCoreItemRow from "./ExamCoreItemRow";
import MyButton from "../../../../../features/tests/ui/buttons/MyButton";


export default function ExamListViewLayout({
	view,
	examList,
	onExamClick,
	className = "",
}: {
	view: "grid" | "table";
	examList: TestFullSchema[];
	onExamClick?: (exam: TestFullSchema) => void;
	className?: string;
}) {
	let component = null;

	if (view === "table") {
		component = <TableLayout
			examList={examList}
			className={className}
			onExamClick={onExamClick}
		/>;
	} else if (view === "grid") {
		component = <GridLayout
			examList={examList}
			className={className}
			onExamClick={onExamClick}
		/>;
	}

	return <div className="min-h-[70vh] flex-1 flex flex-col">
		{examList.length === 0 ? (
			<div className="flex items-center justify-center h-full text-gray-500">
				<div className="flex flex-col items-center">
					<ClipboardList className="h-12 w-12 mb-4" />
					<p className="text-lg font-semibold">You have no exams available at the moment.</p>
					<p className="text-sm text-gray-400">Create a new exam to get started.</p>

					<MyButton size={"normal"}
						onClick={() => { }}
					>
						Create Exam
					</MyButton>
				</div>
			</div>
		) : component}
	</div>;
}


type LayoutProps = {
	examList: TestFullSchema[];
	onExamClick?: (exam: TestFullSchema) => void;
	className?: string;
};

const TableLayout = ({ examList, className = "", onExamClick }: LayoutProps) => {
	return (
		<div className={className}>
			<div className="overflow-x-auto rounded-lg border border-primary-toned-200 shadow-lg">
				<table className="min-w-full bg-white">
					<ExamCoreItemRow.Header />
					<ExamCoreItemRow.Body
						examList={examList}
						onExamClick={onExamClick}
					/>
				</table>
			</div>
		</div>
	);
};

const GridLayout = ({ examList, className = "", onExamClick }: LayoutProps) => {
	return (
		<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
			{examList.map((exam) => (
				<ExamCoreItemCard
					key={exam.id}
					test={exam}
					onClick={onExamClick}
				/>
			))}
		</div>
	);
};