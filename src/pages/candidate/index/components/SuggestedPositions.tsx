import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useLanguage } from "../../../../LanguageProvider";
import { DifficultiesAsConst } from "../../../manager/tests/new/common/base-schema";
import {
	Code,
	Settings,
	Bot,
	Palette,
	Wifi,
	Gamepad2,
	ClipboardList,
	BarChart3,
	Briefcase
} from "lucide-react";

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

			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
				{SuggestedInterviewPositions.map((item, idx) => (
					<PositionCard
						key={idx}
						position={item.position}
						experience={item.experience}
					/>
				))}
			</div>
		</div>
	);
};

const PositionCard = ({
	position,
	experience,
}: {
	position: string;
	experience: string;
}) => {
	const navigate = useNavigate();

	const getPositionIcon = (position: string) => {
		const pos = position.toLowerCase();
		if (pos.includes('software') || pos.includes('developer')) {
			return <Code className="w-6 h-6" />;
		} else if (pos.includes('devops')) {
			return <Settings className="w-6 h-6" />;
		} else if (pos.includes('ai')) {
			return <Bot className="w-6 h-6" />;
		} else if (pos.includes('ui') || pos.includes('ux') || pos.includes('design')) {
			return <Palette className="w-6 h-6" />;
		} else if (pos.includes('network')) {
			return <Wifi className="w-6 h-6" />;
		} else if (pos.includes('game')) {
			return <Gamepad2 className="w-6 h-6" />;
		} else if (pos.includes('manager')) {
			return <ClipboardList className="w-6 h-6" />;
		} else if (pos.includes('data')) {
			return <BarChart3 className="w-6 h-6" />;
		}
		return <Briefcase className="w-6 h-6" />;
	};

	return (
		<div
			onClick={() =>
				navigate(paths.candidate.interview.SETUP, {
					state: {
						position,
						experience,
					},
				})
			}
			className="group cursor-pointer bg-white border border-gray-300 hover:border-primary-toned-500 rounded-md p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
		>
			{/* Background gradient effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

			{/* Content */}
			<div className="relative">
				{/* Icon and Header */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
							{getPositionIcon(position)}
						</div>
						<div className="flex-1">
							<h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2">
								{position}
							</h3>
						</div>
					</div>

					{/* Arrow indicator */}
					<div className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>

				{/* Experience Badge */}
				<div className="flex items-center justify-between pb-2">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border bg-gray-100 text-gray-800 border-gray-200 capitalize">
						{experience} Level
					</span>

					{/* Click indicator */}
					<span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
						Click to start
					</span>
				</div>

				{/* Bottom accent line */}
				<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
			</div>
		</div>
	);
};


export default SuggestedPositions;
