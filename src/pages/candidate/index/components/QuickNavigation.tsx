
import { useNavigate } from "react-router-dom";
import { LanguageTranslations, useLanguage } from "../../../../LanguageProvider";
import { Briefcase, Mic, Rocket } from "lucide-react";
import MyButton from "../../../../features/tests/ui/buttons/MyButton";
import paths from "../../../../router/paths";
import { cn } from "../../../../app/cn";


const QuickNavItem = ({
	title,
	description,
	className = "",
	button,
}: {
	title: string;
	description: string;
	className?: string;
	button: React.ReactNode;
}) => {
	return (
		<div className={cn("flex flex-col w-full gap-2 px-4 py-4 bg-gradient-to-br from-primary-toned-100 to-primary-toned-50 rounded-lg shadow-md mb-4 border border-primary-toned-300 text-primary-toned-700", className)}>
			<h2 className="text-lg font-semibold">
				{title}
			</h2>
			<p>
				{description}
			</p>
			<div className="flex justify-end mt-2">
				{button}
			</div>
		</div>
	)
}


interface QuickNavigationProps {
	isVisible?: boolean;
}

const Translations: LanguageTranslations = {
	en: {
		practice_test: "Practice with AI",
		practice_test_description: "Practice with AI to improve your skills and prepare for real exams.",
		practice_test_go: "Start Practicing",

		join_exams: "Join Exams",
		join_exams_description: "Let managers evaluate your performance and compete with others.",
		join_exams_go: "Join Exams",

		interview: "Interview",
		interview_description: "Prepare for interviews with real questions and exercises.",
		interview_go: "Start Interview",
	},
	vi: {
		practice_test: "Luyện tập với AI",
		practice_test_description: "Luyện tập với AI để cải thiện kỹ năng và chuẩn bị cho các kỳ thi thực tế.",
		practice_test_go: "Bắt đầu luyện tập",

		join_exams: "Tham gia kỳ thi",
		join_exams_description: "Để nhà quản lý đánh giá hiệu suất của bạn và cạnh tranh với các ứng viên khác.",
		join_exams_go: "Tham gia kỳ thi",

		interview: "Phỏng vấn",
		interview_description: "Chuẩn bị cho các buổi phỏng vấn với các câu hỏi và bài tập thực tế.",
		interview_go: "Bắt đầu phỏng vấn",
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
			<div className="flex flex-col gap-4">

				<QuickNavItem
					title={t("practice_test")}
					description={t("practice_test_description")}
					button={
						<MyButton
							className="mt-2 w-full"
							onClick={() => navigate(paths.candidate.tests.GENERATE)}
						>
							{t("practice_test_go")}
							<Rocket className="inline-block w-5 h-5" />
						</MyButton>
					}
				/>

				<QuickNavItem
					className="bg-gradient-to-br from-blue-chill-100 to-secondary-toned-50 border-blue-chill-300 text-blue-chill-700"
					title={t("interview")}
					description={t("interview_description")}
					button={
						<MyButton
							className="mt-2 w-full bg-blue-chill-700"
							variant={"secondary"}
							onClick={() => navigate(paths.candidate.interview._layout)}
						>
							{t("interview_go")}
							<Mic className="inline-block w-5 h-5" />
						</MyButton>
					}
				/>

				<QuickNavItem
					className="bg-gradient-to-br from-secondary-toned-100 to-secondary-toned-50 border-secondary-toned-300 text-secondary-toned-700"
					title={t("join_exams")}
					description={t("join_exams_description")}
					button={
						<MyButton
							className="mt-2 w-full bg-secondary-toned-600"
							variant={"secondary"}
							onClick={() => navigate(paths.candidate.tests.JOIN)}
						>
							{t("join_exams_go")}
							<Briefcase className="inline-block w-5 h-5" />
						</MyButton>
					}
				/>
			</div>
		</div>
	);
};



export default QuickNavigation;
