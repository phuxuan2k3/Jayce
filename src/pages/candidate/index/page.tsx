// import * as React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SubjectIcon from '@mui/icons-material/Subject';
import GradientBorderNotGood from "../../../components/ui/border/GradientBorder.notgood";
// import GradientBorderNotSoGood from "../../../components/ui/border/GradientBorder.notsogood";
import { useGetTestsSuggestedQuery, useGetTemplatesQuery } from "../../../features/tests/api/test.api-gen-v2";
import { useAppSelector } from "../../../app/hooks";
import { authSelectors } from "../../../features/auth/store/authSlice";
import SpinnerLoading from "../../../components/ui/loading/SpinnerLoading";
import { useLanguage } from "../../../LanguageProvider";

const SuggestedInterviewPositions = [
	{ position: "software_engineer", experience: "intern" },
	{ position: "software_engineer", experience: "junior" },
	{ position: "data_analyst", experience: "fresher" },
	{ position: "project_manager", experience: "mid" },
	{ position: "software_engineer", experience: "senior" },
	{ position: "data_analyst", experience: "lead" },
	{ position: "project_manager", experience: "manager" },
	{ position: "software_engineer", experience: "director" },
	{ position: "data_analyst", experience: "senior" },
];

const CandidateHomePage = () => {
	const { t } = useLanguage();

	const navigate = useNavigate();

	const authData = useAppSelector(authSelectors.selectUserInfo);
	console.log("Auth Data", authData);

	const { data: testsSuggestedData, isLoading: isTestsLoading } = useGetTestsSuggestedQuery({ numberOfTests: 2 });
	const { data: templatesData, isLoading: isTemplatesLoading } = useGetTemplatesQuery({ sortByCreatedAt: "desc", perPage: 2 });

	console.log("Tests Suggested Data", testsSuggestedData);
	console.log("Templates Data", templatesData);

	return (
		<>
			<div className="p-2 max-w-7xl mx-auto mt-4">
				<h1 className="text-3xl font-bold">{t("candidate_home_welcome")}, {authData?.metadata.fullname || authData?.username}</h1>
				<p className="text-lg mb-6">{t("candidate_home_subtitle")}</p>

				<div className="flex gap-8">
					<div className="w-3/4 flex flex-col">
						<div id="suggested-tests" className="mb-8 pb-8 border-b-gradient">
							<div className="flex justify-between items-center text-primary mb-4">
								<h2 className="text-2xl font-semibold">{t("candidate_home_suggested_tests_title")}</h2>
								<a className="text-sm hover:underline cursor-pointer" onClick={() => { navigate(paths.candidate.tests.ROOT) }}>{t("candidate_home_suggested_tests_see_more")}</a>
							</div>
							{isTestsLoading ? (
								<div className="mb-2">
									<SpinnerLoading />
								</div>
							) : testsSuggestedData?.length ? (
								null
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

						<div id="recent-templates" className="mb-8 pb-8 border-b-gradient">
							<div className="flex justify-between items-center text-primary mb-4">
								<h2 className="text-2xl font-semibold">{t("candidate_home_recent_templates_title")}</h2>
								<a className="text-sm hover:underline cursor-pointer" onClick={() => { navigate(paths.candidate.tests.TEMPLATES) }}>{t("candidate_home_recent_templates_see_more")}</a>
							</div>
							{isTemplatesLoading ? (
								<div className="mb-2">
									<SpinnerLoading />
								</div>
							) : templatesData?.data?.length ? (
								templatesData.data.slice(0, 2).map((template, _) => (
									<div key={template.id} className="p-4 border rounded-lg shadow-md">
										<div className="flex justify-between items-start">
											<div className="flex items-start">
												<div className="mr-4 text-primary">
													<SubjectIcon className="w-10 h-10" />
												</div>
												<div className="flex flex-col justify-center">
													<h3 className="font-semibold text-xl">{template.title}</h3>
													<p className="text-sm text-gray-700 mt-1">{template.description}</p>

													<div className="flex gap-2 mt-2 flex-wrap">
														{template.tags.map((tag: string, i: number) => (
															<GradientBorderNotGood key={i}>{tag}</GradientBorderNotGood>
														))}
													</div>

													<div className="grid grid-cols-3 gap-3 mt-4 text-sm text-gray-700">
														<span><strong>{t("candidate_home_template_field_name")}:</strong> {template.name}</span>
														<span><strong>{t("candidate_home_template_field_difficulty")}:</strong> {template.difficulty}</span>
														<span><strong>{t("candidate_home_template_field_language")}:</strong> {template.language}</span>
														<span><strong>{t("candidate_home_template_field_minutes")}:</strong> {template.minutesToAnswer} min</span>
														<span><strong>{t("candidate_home_template_field_questions")}:</strong> {template.numberOfQuestions}</span>
														<span><strong>{t("candidate_home_template_field_options")}:</strong> {template.numberOfOptions}</span>
													</div>

													{template.outlines.length > 0 && (
														<div className="mt-4">
															<strong>{t("candidate_home_template_field_outlines")}:</strong>
															<ul className="list-disc list-inside text-sm mt-1 text-gray-800">
																{template.outlines.slice(0, 2).map((outline: string, index: number) => (
																	<li key={index}>{outline}</li>
																))}
																{template.outlines.length > 2 && (
																	<li title={template.outlines.slice(2).join("\n")}>
																		{t("candidate_home_template_field_outlines_more").replace("{{count}}", (template.outlines.length - 2).toString())}
																	</li>
																)}
															</ul>
														</div>
													)}
												</div>
											</div>

											<button
												className="px-10 rounded-lg py-2 font-bold cursor-pointer bg-[var(--primary-color)] border text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-200"
												onClick={() => navigate(paths.candidate.tests.GENERATE)}
											>
												{t("candidate_home_template_button_apply")}
											</button>
										</div>
									</div>
								))
							) : (
								<div className="text-center">
									<p className="text-gray-500 mb-4">{t("candidate_home_recent_templates_empty")}</p>
									<button
										className="px-6 py-2 rounded-lg font-bold bg-primary border text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-200"
										onClick={() => navigate(paths.candidate.tests.TEMPLATES)}
									>
										{t("candidate_home_recent_templates_create")}
									</button>
								</div>
							)}
						</div>

						<div id="suggested-positions" className="mb-8">
							<div className="flex justify-between items-center text-primary mb-4">
								<h2 className="text-2xl font-semibold">{t("candidate_home_positions_title")}</h2>
								<a className="text-sm hover:underline cursor-pointer" onClick={() => { navigate(paths.candidate.interview.SETUP) }}>{t("candidate_home_positions_customize")}</a>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{SuggestedInterviewPositions.map((item, idx) => (
									<div
										key={idx}
										onClick={() =>
											navigate(paths.candidate.interview.SETUP, {
												state: {
													position: item.position
														.split("_")
														.map(word => word.charAt(0).toUpperCase() + word.slice(1))
														.join(" "),
													experience: item.experience,
												},
											})
										}
										className="cursor-pointer border p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
									>
										<div className="font-semibold text-lg">{t("position_" + item.position)}</div>
										<div className="text-sm text-gray-600">{t("experience_" + item.experience)}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="w-1/4 flex flex-col gap-4 sticky top-10 self-start mb-8">
						<div className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white">
							<h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
								{t("candidate_home_quick_nav_title")}
							</h3>
							<ul className="space-y-3 text-sm font-medium text-gray-700">
								<li>
									<a
										href="#suggested-tests"
										className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition"
									>
										{t("candidate_home_suggested_tests_title")}
									</a>
								</li>
								<li>
									<a
										href="#recent-templates"
										className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition"
									>
										{t("candidate_home_recent_templates_title")}
									</a>
								</li>
								<li>
									<a
										href="#suggested-positions"
										className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition"
									>
										{t("candidate_home_positions_title")}
									</a>
								</li>
							</ul>
						</div>

						{/* <div className="bg-white border p-4 rounded-xl shadow-sm">
							<div className="flex items-center gap-2 text-secondary-toned-600 font-bold text-lg mb-2">
								<CardGiftcardIcon />
								<span>Subscribe and Get 60 SSC</span>
							</div>
							<p className="mt-4 mb-2 text-sm text-gray-700">
								Subscribe to receive updates about new features, promotions, and career tips. As a thank-you, you'll get
								<span className="relative group inline-block ml-1 mr-1">
									<span className="font-bold text-primary underline cursor-help">60 SSC</span>
									<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-gray-800 text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
										SSC is a virtual currency that can be used to access LLM features on our website.
									</div>
								</span>
								added to your account.
							</p>
							<button
								className="mt-3 w-full py-2 border border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all duration-200"
								onClick={() => alert("tu bi khong tinh iu")}
							>
								Subscribe
							</button>
						</div> */}

						<div className="border border-gray-300 rounded-md overflow-hidden">
							<img src="/defaults/landing_img_316.png" alt="Ad Banner" className="w-full object-cover" />
							<div className="bg-blue-100 text-xs text-center py-1 text-blue-600 font-medium cursor-pointer">
								{t("candidate_home_ad_remove")}
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
}

export default CandidateHomePage;