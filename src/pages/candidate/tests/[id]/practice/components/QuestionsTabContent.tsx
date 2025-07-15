import React from "react";
import { useGetTestsByTestIdQuestionsQuery } from "../../../../../../features/tests/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../../features/tests/hooks/useGetTestIdParams";
import { QueryBoolean, PagingFilter } from "../../../../../../features/tests/types/query";
import { QuestionDefault } from "../../../../../../features/tests/ui-items/question/views/QuestionDefault";
import MyButton from "../../../../../../features/tests/ui/buttons/MyButton";
import FetchStateCover2 from "../../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../../../../features/tests/ui-sections/MyPaginationSection";
import { arrayPagination } from "../../../../../../helpers/array";
import { useLanguage } from "../../../../../../LanguageProvider";
import { TriangleAlert } from "lucide-react";

export default function QuestionsTabContent({
	numberOfAttempts,
}: {
	numberOfAttempts: number;
}) {
	const { t } = useLanguage();

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
					<div className="bg-yellow-50 border border-orange-200 rounded-lg p-4 mb-6 shadow-md flex items-center justify-center w-fit">
						<TriangleAlert className="text-amber-600 mr-2" size={18} />
						<p className="text-sm text-amber-600">
							{t("questions_tab_view_warning")}
						</p>
					</div>
					<MyButton onClick={() => setViewQuestions(true)}>
						{t("questions_tab_view_button")}
					</MyButton>
				</div>
			)}
			{viewQuestions && (
				<div className="flex-1 flex flex-col gap-4">
					<FetchStateCover2
						fetchState={questionsQuery}
						dataComponent={(questionsData) => {
							const paged = arrayPagination(questionsData, filter.page, filter.perPage);
							return (
								questionsData.length === 0 ? (
									<div className="flex justify-center items-center h-40">
										<p className="text-gray-500">{t("questions_tab_no_questions")}</p>
									</div>
								) : (
									<div className="bg-white rounded-lg shadow-md p-6">
										<div className="flex justify-between items-center mb-4">
											<h3 className="text-lg font-semibold">{t("questions_tab_total_questions").replace("{{count}}", questionsData.length.toString())}</h3>
											<div className="flex items-center gap-2">
												<MyButton
													onClick={() => setViewCorrectAnswer("1")}
													disabled={viewCorrectAnswer === "1"}
													size={"medium"}
												>
													{questionsQuery.isFetching ? (
														t("questions_tab_loading")
													) : (
														t("questions_tab_load_correct_answers")
													)}
												</MyButton>
												{viewCorrectAnswer === "1" && (
													<MyButton onClick={() => setShowAllAnswers(!showAllAnswers)}
														variant="secondary"
														size={"medium"}
													>
														{showAllAnswers ? t("questions_tab_hide_all_answers") : t("questions_tab_show_all_answers")}
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
			)}
		</div>
	);
}
