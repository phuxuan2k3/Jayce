import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import SubjectIcon from '@mui/icons-material/Subject';
import { useGetTemplatesQuery } from "../../../../features/tests/api/test.api-gen-v2";
import SpinnerLoading from "../../../../components/ui/loading/SpinnerLoading";
import { useLanguage } from "../../../../LanguageProvider";

const RecentTemplates = () => {
	const { t } = useLanguage();
	const navigate = useNavigate();

	const { data: templatesData, isLoading: isTemplatesLoading } = useGetTemplatesQuery({ sortByCreatedAt: "desc", perPage: 2 });

	return (
		<div id="recent-templates" className="mb-8 pb-8 border-b-gradient scroll-mt-20">
			<div className="flex justify-between items-center flex-wrap gap-2 text-primary mb-4">
				<h2 className="text-2xl font-semibold">{t("candidate_home_recent_templates_title")}</h2>
				<a className="text-sm hover:underline cursor-pointer" onClick={() => navigate(paths.candidate.tests.TEMPLATES)}>
					{t("candidate_home_recent_templates_see_more")}
				</a>
			</div>

			{isTemplatesLoading ? (
				<div className="mb-2">
					<SpinnerLoading />
				</div>
			) : templatesData?.data?.length ? (
				templatesData.data.slice(0, 2).map((template, _) => (
					<div key={template.id} className="p-4 border rounded-lg shadow-md mb-4 bg-white">
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
							<div className="flex">
								<div className="mr-4 text-primary">
									<SubjectIcon className="w-10 h-10" />
								</div>
								<div className="flex flex-col">
									<h3 className="font-semibold text-xl break-words">{template.title}</h3>
									<p className="text-sm text-gray-700 mt-1 break-words">{template.description}</p>

									<div className="flex gap-2 mt-2 flex-wrap">
										{template.tags.map((tag: string, i: number) => (
											<span key={i} className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded">
												{tag}
											</span>
										))}
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 text-sm text-gray-700">
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
								className="w-full sm:w-auto px-6 py-2 rounded-lg font-bold bg-primary text-white border hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-200"
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
	);
};

export default RecentTemplates;
