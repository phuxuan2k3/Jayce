
import { Link, useNavigate } from "react-router-dom";
import { LanguageTranslations, useLanguage } from "../../../../LanguageProvider";
import { Briefcase, ChevronRight, Mic } from "lucide-react";
import MyButton from "../../../../features/tests/ui/buttons/MyButton";
import paths from "../../../../router/paths";

const QuickNavButton = ({
	href,
	children,
	icon: Icon,
}: {
	href: string;
	children: React.ReactNode;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<li>
		<Link
			to={href}
			className="flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:from-primary/5 hover:to-primary/10 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out font-semibold text-base group"
		>
			<div className="flex items-center gap-3">
				{Icon && <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />}
				<span>{children}</span>
			</div>
			<ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
		</Link>
	</li>
);

interface QuickNavigationProps {
	isVisible?: boolean;
}

const Translations: LanguageTranslations = {
	en: {
		practice_test: "Practice with AI",
		practice_test_description: "Practice with AI to improve your skills and prepare for real exams.",
		practice_test_go: "Start Practicing",

		join_exams: "Join Exams",
		interview: "Interview",
	},
	vi: {
		practice_test: "Luyện tập với AI",
		practice_test_description: "Luyện tập với AI để cải thiện kỹ năng và chuẩn bị cho các kỳ thi thực tế.",
		practice_test_go: "Bắt đầu luyện tập",

		join_exams: "Tham gia kỳ thi",
		interview: "Phỏng vấn",
	}
}

const QuickNavigation = ({ isVisible = true }: QuickNavigationProps) => {
	const { tTranslation } = useLanguage();
	const t = (key: string) => tTranslation(key, Translations);
	const navigate = useNavigate();

	if (!isVisible) return null;

	return (
		<div className="flex flex-col gap-4 p-4">
			{/* <h3 className="text-xl font-bold text-primary mb-4 gap-2 text-center">
				{t("quick_nav_title")}
			</h3> */}
			<ul className="space-y-3 text-sm font-medium">
				<div className="flex flex-col gap-2 px-4 py-4 bg-gradient-to-br from-primary-toned-100 to-primary-toned-50 rounded-lg shadow-md mb-4 border border-primary-toned-300 text-primary-toned-700">
					<h2 className="text-lg font-semibold">
						{t("practice_test")}
					</h2>
					<p>
						{t("practice_test_description")}
					</p>
					<MyButton
						className="mt-2 w-full"
						onClick={() => navigate(paths.candidate.tests.GENERATE)}
					>
						{t("practice_test_go")}
						<ChevronRight className="inline-block ml-1 w-5 h-5" />
					</MyButton>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">
					</h2>
				</div>


				<QuickNavButton href="#recent-templates" icon={Briefcase}>
					{t("join_exams")}
				</QuickNavButton>
				<QuickNavButton href="#suggested-positions" icon={Mic}>
					{t("interview")}
				</QuickNavButton>
			</ul>
		</div>
	);
};



export default QuickNavigation;
