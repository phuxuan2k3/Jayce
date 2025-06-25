import React from "react";
import { useGetTestsByTestIdQuestionsQuery } from "../../../../../../infra-test/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../../infra-test/hooks/useGetTestIdParams";
import { QueryBoolean, toggleQueryBoolean } from "../../../../../../infra-test/types/query";
import FetchStateCover2 from "../../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import MyButton from "../../../../../../infra-test/ui/buttons/MyButton";
import { QuestionDefault } from "../../../../../../infra-test/ui-items/question/views/QuestionDefault";
import MyPaginationSection from "../../../../../../infra-test/ui/MyPaginationSection";
import { arrayPagination } from "../../../../../../helpers/array";
import { PagedFilter } from "../../../../../../interfaces/paged.type";

export default function QuestionsTabContent({
	numberOfAttempts,
}: {
	numberOfAttempts: number;
}) {
	const testId = useGetTestIdParams();

	const [viewQuestions, setViewQuestions] = React.useState<boolean>(numberOfAttempts > 0);
	const [viewCorrectAnswer, setViewCorrectAnswer] = React.useState<QueryBoolean>("0");
	const [filter, setFilter] = React.useState<PagedFilter>({
		page: 1,
		perPage: 5,
	});

	const questionsQuery = useGetTestsByTestIdQuestionsQuery({ testId, viewCorrectAnswer }, {
		skip: viewQuestions === false,
	});

	return (
		<FetchStateCover2
			fetchState={questionsQuery}
			dataComponent={(questionsData) => {
				const paged = arrayPagination(questionsData, filter.page, filter.perPage);
				return (
					<div className="flex flex-col gap-4">
						{numberOfAttempts === 0 && (
							<div className="mt-4 text-center">
								<p className="text-amber-600 mb-2">
									Viewing questions may reveal test content. Are you sure you want to continue?
								</p>
								<MyButton onClick={() => setViewQuestions(true)}>
									View Questions
								</MyButton>
							</div>
						)}

						{questionsData.length === 0 ? (
							<div className="flex justify-center items-center h-40">
								<p className="text-gray-500">No questions available.</p>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow-md p-6">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold">Test Questions</h3>
									<MyButton
										onClick={() => setViewCorrectAnswer(toggleQueryBoolean(viewCorrectAnswer))}
										variant={viewCorrectAnswer === "1" ? "secondary" : "primary"}
									>
										{viewCorrectAnswer === "1" ? "Hide All Answers" : "Show All Answers"}
									</MyButton>
								</div>

								<div className="flex flex-col gap-4">
									{questionsData.map((question, index) => (
										<QuestionDefault
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
						)}
					</div>
				);
			}}
		/>
	);
}
