import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useLanguage } from "../../../../LanguageProvider";

const SuggestedInterviewPositions = [
	{ position: "Software Engineer", experience: "intern" },
	{ position: "Full-Stack Developer", experience: "junior" },
	{ position: "DevOps Engineer", experience: "fresher" },
	{ position: "AI Engineer", experience: "mid" },
	{ position: "UI/UX Designer", experience: "senior" },
	{ position: "Network Engineer", experience: "lead" },
	{ position: "Game Developer", experience: "manager" },
	{ position: "Project Manager (IT)", experience: "director" },
	{ position: "Data Scientist", experience: "senior" },
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
						<div className="text-sm text-gray-600">{t("experience_" + item.experience)}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SuggestedPositions;
