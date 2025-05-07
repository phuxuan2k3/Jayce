import { useState } from "react";
import { useGetUserAttemptsByAttemptIdAnswersQuery } from "../../../../../../../features/tests/legacy/test.api-gen";
import MyPagination from "../../../../../../../components/ui/common/MyPagination";
import AttemptCard from "./AttemptCard";

type Props = {
	attemptId: number;
}

export default function AttemptsList({ attemptId }: Props) {
	const [page, setPage] = useState(1);
	const { data: answers } = useGetUserAttemptsByAttemptIdAnswersQuery({ attemptId, page });

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	return (
		<div className="flex flex-col w-full">
			<div className="flex-1 flex flex-col w-full py-4 px-4 overflow-y-auto">
				{answers && answers.data.map((answer, index, arr) => (
					<>
						<AttemptCard
							key={index}
							answer={answer}
							index={index}
						/>
						{index !== arr.length - 1 && (
							<hr className="bg-gray-500 w-full my-6" />
						)}
					</>
				))}
			</div>
			<div className="">
				{answers && (
					<MyPagination
						totalPage={answers.totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
		</div>
	);
}
