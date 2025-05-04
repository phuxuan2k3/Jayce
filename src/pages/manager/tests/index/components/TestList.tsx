import React from "react";
import TestItem from "./TestItem";
import MyPagination from "../../../../../components/ui/common/MyPagination";

interface TestListProps {
	tests: {
		data: {
			id: number;
			title: string;
			answerCount: number;
			minutesToAnswer: number;
			description?: string;
		}[];
	};
	totalPages: number;
	onEdit: (testId: number) => void;
	onDelete: (testId: number) => void;
	onViewSubmissions: (testId: number) => void;
	onPageChange: (page: number) => void;
}

const TestList: React.FC<TestListProps> = ({
	tests,
	onEdit,
	onDelete,
	onViewSubmissions,
	onPageChange,
	totalPages,
}) => {
	return (
		<div className="flex flex-col gap-8 mt-4 mb-4 items-center">
			<div className="w-full flex flex-col gap-4 px-4 lg:max-h-[600px] overflow-y-auto">
				{tests.data.map((test, index) => (
					<TestItem
						key={index}
						test={test}
						onEdit={onEdit}
						onDelete={onDelete}
						onViewSubmissions={onViewSubmissions}
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

export default TestList;