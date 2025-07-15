import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import SubjectIcon from '@mui/icons-material/Subject';
import { TemplateCoreSchema, useGetTemplatesQuery } from "../../../../features/tests/api/test.api-gen-v2";
import { useLanguage } from "../../../../LanguageProvider";
import { ChevronRightIcon } from "lucide-react";

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
				<div className="flex flex-col gap-4">
					<div className="bg-gray-200 h-48 animate-pulse rounded-lg" />
					<div className="bg-gray-200 h-48 animate-pulse rounded-lg" />
				</div>
			) : templatesData?.data?.length ? (
				templatesData.data.slice(0, 2).map((template, _) => (
					<TemplateLargeCard
						key={template.id}
						template={template}
					/>
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


const TemplateLargeCard = ({
	template,
}: {
	template: TemplateCoreSchema;
}) => {
	const { t } = useLanguage();
	const navigate = useNavigate();

	return (
		<div key={template.id} className="px-4 py-6 border border-primary rounded-lg shadow-md mb-4 bg-white flex flex-col md:flex-row md:justify-between md:items-start gap-4">
			<div className="flex">
				<div className="mr-4 text-primary">
					<SubjectIcon className="w-10 h-10" />
				</div>
				<div className="flex flex-col">
					<h3 className="font-semibold text-xl break-words">{template.name}</h3>

					<p className="text-sm text-gray-700 break-words">
						{template.title}
					</p>

					<div className="flex items-center gap-2 mt-4 flex-wrap">
						<span className="text-xs font-semibold text-gray-700">Tags:</span>
						{template.tags.map((tag: string, i: number) => (
							<span key={i} className="text-xs bg-primary-toned-50 rounded-full h-fit w-fit border border-primary-toned-200 text-primary font-medium px-2 py-0.5">
								{tag}
							</span>
						))}
					</div>

					{template.outlines.length > 0 && (
						<div className="mt-2">
							<strong className="text-sm">{t("candidate_home_template_field_outlines")}:</strong>
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
				className="w-full flex items-center justify-center gap-1 sm:w-auto px-4 py-2 rounded-lg font-bold bg-primary text-white border hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-200"
				onClick={() => navigate(
					paths.candidate.tests.GENERATE,
					{ state: { template } }
				)}
			>
				{t("candidate_home_template_button_apply")}
				<ChevronRightIcon className="h-5 w-5" />
			</button>
		</div>
	);
}

