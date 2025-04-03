import { useState } from "react";
import GradientBorderGood from "../../../../../../components/ui/border/GradientBorder.good";
import GradientBorderNotGood from "../../../../../../components/ui/border/GradientBorder.notgood";
import ChoiceIcon from "../../../../../../components/ui/icon/ChoiceIcon";
import FetchState from "../../../../../../components/wrapper/FetchState";
import { useGetAttemptsByAttemptIdAnswersQuery } from "../../../../../../features/tests/api/test.api-gen";
import MyPagination from "../../../../../../components/ui/common/MyPagination";

type Props = {
	attemptId: number;
}

export default function AttemptsList({ attemptId }: Props) {
	const [page, setPage] = useState(1);
	const { data: answers, isLoading, error } = useGetAttemptsByAttemptIdAnswersQuery({ attemptId, page });

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	return (
		<>
			<FetchState
				isLoading={isLoading}
				error={error}
			>
				{answers && answers.data.map((answer) => (
					<div key={answer.question.id} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
						<span className="font-bold mb-2 opacity-50">
							Question {answer.question.id}
						</span>
						<div className="w-3/5 flex flex-col">
							{/* Question */}
							<div className="w-11/12 mb-4">
								<GradientBorderGood className="w-full h-fit font-semibold">
									{answer.question.text}
								</GradientBorderGood>
							</div>
							{answer.question.options.map((option, index) => (
								<div key={index} className="w-full flex flex-row mt-2" >
									<GradientBorderNotGood className="w-11/12 h-fit">
										{String.fromCharCode(97 + Number(index))}. {option}
									</GradientBorderNotGood>
									{answer.chosenOption &&
										<div className="w-1/12 flex items-center justify-center">
											<ChoiceIcon isCorrect={index === answer.question.correctOption} />
											<ChoiceIcon isCorrect={index === answer.chosenOption} />
										</div>
									}
								</div>
							))}
						</div>
						<GradientBorderGood className="font-bold h-fit">
							{(answer.chosenOption && answer.question.correctOption === answer.chosenOption)
								? answer.question.points
								: 0}
						</GradientBorderGood>
					</div>
				))}
			</FetchState>
			{answers && (
				<div>
					<MyPagination
						totalPage={answers.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</>
	);
}
