import React from "react";
import TestExamCard from "./TestExamCard";
import MyPagination from "../../../../../components/ui/common/MyPagination";
import { ExamCore } from "../../../../../features/tests/model/test.model";

interface Props {
	tests: ExamCore[];
	totalPages: number;
	onEdit: (testId: string) => void;
	onDelete: (testId: string) => void;
	onTestClick: (testId: string) => void;
	onPageChange: (page: number) => void;
}

const TestExamList: React.FC<Props> = ({
	tests,
	onEdit,
	onDelete,
	onTestClick,
	onPageChange,
	totalPages,
}) => {
	return (
		<div className="flex flex-col gap-8 mt-4 mb-4 items-center">
			<div className="w-full flex flex-col gap-4 px-4">
				{tests.map((test, index) => (
					<TestExamCard
						key={index}
						test={test}
						onEdit={onEdit}
						onDelete={onDelete}
						onTestClick={onTestClick}
					/>
				))}
			</div>

			<MyPagination
				totalPage={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default TestExamList;