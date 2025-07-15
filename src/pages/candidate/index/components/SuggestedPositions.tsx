import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useLanguage } from "../../../../LanguageProvider";
import { DifficultiesAsConst } from "../../../manager/tests/new/common/base-schema";

const SuggestedInterviewPositions = [
	{ position: "Software Engineer", experience: DifficultiesAsConst[0] },
	{ position: "Full-Stack Developer", experience: DifficultiesAsConst[1] },
	{ position: "DevOps Engineer", experience: DifficultiesAsConst[3] },
	{ position: "AI Engineer", experience: DifficultiesAsConst[2] },
	{ position: "UI/UX Designer", experience: DifficultiesAsConst[0] },
	{ position: "Network Engineer", experience: DifficultiesAsConst[3] },
	{ position: "Game Developer", experience: DifficultiesAsConst[1] },
	{ position: "Project Manager (IT)", experience: DifficultiesAsConst[5] },
	{ position: "Data Scientist", experience: DifficultiesAsConst[3] },
];

const SuggestedPositions = () => {
	const { t } = useLanguage();
	const navigate = useNavigate();

	return (
		<div id="suggested-positions" className="mb-8 scroll-mt-20">
			<div className="flex justify-between items-center flex-wrap gap-2 text-primary mb-4">
				<h2 className="text-2xl font-semibold">{t("candidate_home_positions_title")}</h2>
				<a className="text-sm hover:underline cursor-pointer" onClick={() => navigate(paths.candidate.interview.SETUP)}>
					{t("candidate_home_positions_customize")}
				</a>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{SuggestedInterviewPositions.map((item, idx) => (
					<div
						key={idx}
						onClick={() =>
							navigate(paths.candidate.interview.SETUP, {
								state: {
									position: item.position,
									experience: item.experience,
								},
							})
						}
						className="cursor-pointer border p-4 rounded-lg shadow-sm hover:bg-gray-50 transition bg-white"
					>
						<div className="font-semibold text-lg">{item.position}</div>
						<div className="text-sm text-gray-600">{item.experience}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SuggestedPositions;
