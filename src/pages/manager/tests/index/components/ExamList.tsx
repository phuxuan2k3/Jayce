import React from "react";
import ExamCard from "./ExamCard";
import MyPagination from "../../../../../components/ui/common/MyPagination";
import { ExamCore } from "../../../../../features/tests/model/test.model";

interface Props {
	tests: ExamCore[];
	totalPages: number;
	onDelete: (exam: ExamCore) => void;
	onTestClick: (testId: string) => void;
	onPageChange: (page: number) => void;
}

const ExamList: React.FC<Props> = ({
	tests,
	onDelete,
	onTestClick,
	onPageChange,
	totalPages,
}) => {
	return (
		<div className="flex flex-col gap-8 mt-4 mb-4 items-center">
			<div className="w-full flex flex-col gap-4 px-4">
				{tests.map((test, index) => (
					<ExamCard
						key={index}
						test={test}
						onDelete={() => onDelete(test)}
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

export default ExamList;