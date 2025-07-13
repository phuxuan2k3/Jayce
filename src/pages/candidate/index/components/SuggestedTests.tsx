import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useGetTestsSuggestedQuery } from "../../../../features/tests/api/test.api-gen-v2";
import SpinnerLoading from "../../../../components/ui/loading/SpinnerLoading";
import { useLanguage } from "../../../../LanguageProvider";

const SuggestedTests = () => {
	const { t } = useLanguage();
	const navigate = useNavigate();

	const { data: testsSuggestedData, isLoading: isTestsLoading } = useGetTestsSuggestedQuery({ numberOfTests: 2 });

	return (
		<div id="suggested-tests" className="mb-8 pb-8 border-b-gradient scroll-mt-20">
			<div className="flex justify-between items-center text-primary mb-4">
				<h2 className="text-2xl font-semibold">{t("candidate_home_suggested_tests_title")}</h2>
				<a className="text-sm hover:underline cursor-pointer" onClick={() => navigate(paths.candidate.tests.ROOT)}>
					{t("candidate_home_suggested_tests_see_more")}
				</a>
			</div>

			{isTestsLoading ? (
				<div className="mb-2">
					<SpinnerLoading />
				</div>
			) : testsSuggestedData?.filter(test => test._detail.mode === "PRACTICE").length ? (
				<div className="grid gap-4">
					{testsSuggestedData.filter(test => test._detail.mode === "PRACTICE").map(test => {
						const isNew = test._aggregate.totalAttempts === 0;
						const isLowScore = test._aggregate.averageScore > 0 &&
							test._aggregate.averageScore < test._aggregate.totalPoints * 0.4;

						return (
							<div key={test.id} className="flex flex-col sm:flex-row justify-between sm:items-start border-l-4 border-primary p-4 rounded-lg shadow-md bg-white">
								<div className="flex flex-col">
									<h3 className="text-lg font-bold text-gray-800 break-words">{test.title}</h3>

									<div className="flex flex-wrap gap-2 mt-1 mb-1">
										{isNew && (
											<span className="text-xs bg-primary-toned-200 text-primary font-medium px-2 py-0.5 rounded-full">
												{t("candidate_home_suggested_tests_no_attempt")}
											</span>
										)}
										{isLowScore && (
											<span className="text-xs bg-secondary-toned-50 text-secondary-toned-600 font-medium px-2 py-0.5 rounded-full">
												{t("candidate_home_suggested_tests_low_score")}
											</span>
										)}
									</div>

									<p className="text-sm text-gray-600 mb-2 break-words">{test.description}</p>

									<div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-gray-700 mb-2">
										<span>{t("candidate_home_field_difficulty")}: <strong>{test._detail.mode === "PRACTICE" ? test._detail.difficulty : null}</strong></span>
										<span>{t("candidate_home_field_questions")}: <strong>{test._detail.mode === "PRACTICE" ? test._detail.numberOfQuestions : null}</strong></span>
										<span>{t("candidate_home_field_language")}: <strong>{test.language}</strong></span>
										<span>{t("candidate_home_field_time")}: <strong>{test.minutesToAnswer} min</strong></span>
									</div>

									<div className="flex gap-2 flex-wrap">
										{test._detail.mode === "PRACTICE" && test._detail.tags.map((tag, i) => (
											<span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">{tag}</span>
										))}
									</div>
								</div>

								<button
									className="ml-0 sm:ml-4 mt-4 sm:mt-0 px-5 py-2 font-semibold text-sm rounded-md bg-primary text-white border border-primary hover:bg-white hover:text-primary transition"
									onClick={() => navigate(`${paths.candidate.tests.in(test.id).PRACTICE}`)}
								>
									{t("candidate_home_template_button_more_details")}
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className="text-center">
					<p className="text-gray-500 mb-4">{t("candidate_home_suggested_tests_empty")}</p>
					<button
						className="px-6 py-2 rounded-lg font-bold bg-primary border text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-200"
						onClick={() => navigate(paths.candidate.tests.GENERATE)}
					>
						{t("candidate_home_suggested_tests_create")}
					</button>
				</div>
			)}
		</div>
	);
};

export default SuggestedTests;
