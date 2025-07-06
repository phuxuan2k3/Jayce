import React from "react";
import { useGetTestsByTestIdQuestionsQuery } from "../../../../../../features/tests/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../../features/tests/hooks/useGetTestIdParams";
import { QueryBoolean, PagingFilter } from "../../../../../../features/tests/types/query";
import { QuestionDefault } from "../../../../../../features/tests/ui-items/question/views/QuestionDefault";
import MyButton from "../../../../../../features/tests/ui/buttons/MyButton";
import FetchStateCover2 from "../../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../../../../features/tests/ui-sections/MyPaginationSection";
import { arrayPagination } from "../../../../../../helpers/array";

export default function QuestionsTabContent({
	numberOfAttempts,
}: {
	numberOfAttempts: number;
}) {
	const testId = useGetTestIdParams();

	const [showAllAnswers, setShowAllAnswers] = React.useState<boolean>(false);
	const [viewQuestions, setViewQuestions] = React.useState<boolean>(numberOfAttempts > 0);
	const [viewCorrectAnswer, setViewCorrectAnswer] = React.useState<QueryBoolean>("0");
	const [filter, setFilter] = React.useState<PagingFilter>({
		page: 1,
		perPage: 5,
	});

	const questionsQuery = useGetTestsByTestIdQuestionsQuery({
		testId,
		viewCorrectAnswer
	}, {
		skip: viewQuestions === false,
		refetchOnMountOrArgChange: true,
	});

	return (
		<div className="flex flex-col gap-4 min-h-full">
			{(numberOfAttempts === 0 && viewQuestions === false) && (
				<div className="mt-4 flex flex-col items-center">
					<p className="text-amber-600 mb-2">
						Viewing questions may reveal test content. Are you sure you want to continue?
					</p>
					<MyButton onClick={() => setViewQuestions(true)}>
						View Questions
					</MyButton>
				</div>
			)}
			<div className="flex-1 flex flex-col gap-4">
				<FetchStateCover2
					fetchState={questionsQuery}
					dataComponent={(questionsData) => {
						const paged = arrayPagination(questionsData, filter.page, filter.perPage);
						return (
							questionsData.length === 0 ? (
								<div className="flex justify-center items-center h-40">
									<p className="text-gray-500">No questions available.</p>
								</div>
							) : (
								<div className="bg-white rounded-lg shadow-md p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold">Total {questionsData.length} Questions</h3>
										<div className="flex items-center gap-2">
											<MyButton
												onClick={() => setViewCorrectAnswer("1")}
												disabled={viewCorrectAnswer === "1"}
												size={"medium"}
											>
												{questionsQuery.isFetching ? (
													"Loading..."
												) : (
													"Load Correct Answers"
												)}
											</MyButton>
											{viewCorrectAnswer === "1" && (
												<MyButton onClick={() => setShowAllAnswers(!showAllAnswers)}
													variant="secondary"
													size={"medium"}
												>
													{showAllAnswers ? "Hide All Answers" : "Show All Answers"}
												</MyButton>
											)}
										</div>
									</div>

									<div className="flex flex-col gap-4">
										{questionsData.map((question, index) => (
											<QuestionDefault
												showAnswer={showAllAnswers}
												question={question}
												key={question.id}
												index={index}
											/>
										))}
									</div>

									<MyPaginationSection
										page={filter.page}
										perPage={paged.perPage}
										onPageChange={(page) => setFilter({ ...filter, page })}
										total={paged.total}
										totalPages={paged.totalPages}
									/>
								</div>
							)
						);
					}}
				/>
			</div>
		</div>
	);
}
