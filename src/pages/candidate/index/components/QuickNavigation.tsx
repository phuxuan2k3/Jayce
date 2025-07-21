
import { useNavigate } from "react-router-dom";
import { LanguageTranslations, useLanguage } from "../../../../LanguageProvider";
import { Briefcase, ChevronRight, CircleQuestionMarkIcon, DollarSign, Mic, Rocket } from "lucide-react";
import MyButton from "../../../../features/tests/ui/buttons/MyButton";
import paths from "../../../../router/paths";
import { cn } from "../../../../app/cn";
import { useAppSelector } from "../../../../app/hooks";
import practiceGenSlice from "../../../../features/tests/stores/practiceGenSlice";

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
		<div className={cn("flex flex-col w-full gap-2 px-4 py-4 bg-gradient-to-br from-primary-toned-100 to-primary-toned-50 rounded-lg shadow-md border border-primary-toned-300 text-primary-toned-700", className)}>
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
		practice_test: "AI-Powered Practice",
		practice_test_description: "Sharpen your skills with personalized AI coaching and get ready to ace any challenge.",
		practice_test_go: "Start Training",
		practice_test_ready: "Practice is ready!",

		join_exams: "Live Assessments",
		join_exams_description: "Showcase your expertise in real-time evaluations and stand out from the competition.",
		join_exams_go: "Join Assessment",

		interview: "Mock Interviews",
		interview_description: "Master your interview skills with realistic scenarios and expert feedback.",
		interview_go: "Practice Interview",

		faq_help: "Questions? We're here to help!",
		faq_button: "Get Support",

		need_tokens: "Running low on tokens?",
		buy_tokens: "Purchase Credits",
	},
	vi: {
		practice_test: "Luyện Tập Với AI",
		practice_test_description: "Nâng cao kỹ năng với huấn luyện viên AI cá nhân hóa và sẵn sàng chinh phục mọi thử thách.",
		practice_test_go: "Bắt Đầu Luyện Tập",
		practice_test_ready: "Luyện tập đã sẵn sàng!",

		join_exams: "Đánh Giá Trực Tiếp",
		join_exams_description: "Thể hiện chuyên môn trong các bài đánh giá thời gian thực và nổi bật hơn đối thủ.",
		join_exams_go: "Tham Gia Đánh Giá",

		interview: "Phỏng Vấn Thử",
		interview_description: "Thành thạo kỹ năng phỏng vấn với các tình huống thực tế và phản hồi chuyên nghiệp.",
		interview_go: "Thực Hành Phỏng Vấn",

		faq_help: "Có thắc mắc? Chúng tôi sẵn sàng hỗ trợ!",
		faq_button: "Được Hỗ Trợ",

		need_tokens: "Sắp hết token rồi?",
		buy_tokens: "Mua Thêm Credits",
	}
}

const QuickNavigation = ({ isVisible = true }: QuickNavigationProps) => {
	const { tTranslation } = useLanguage();
	const t = (key: string) => tTranslation(key, Translations);
	const navigate = useNavigate();
	const savedTestId = useAppSelector(practiceGenSlice.selectors.selectSavedTestId);

	if (!isVisible) return null;

	return (
		<div className="flex flex-col gap-4 p-4">
			<div className="flex flex-col gap-6">
				<QuickNavItem
					title={t("practice_test")}
					description={t("practice_test_description")}
					button={
						savedTestId === null ? (
							<MyButton
								className="mt-2 w-full"
								onClick={() => navigate(paths.candidate.tests.GENERATE)}
							>
								{t("practice_test_go")}
								<Rocket className="inline-block w-5 h-5" />
							</MyButton>
						) : (
							<MyButton
								className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white"
								onClick={() => navigate(paths.candidate.tests.GENERATE)}
							>
								{t("practice_test_ready")}
								<Rocket className="inline-block w-5 h-5" />
							</MyButton>
						)
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

			<hr className="my-4 border-t border-gray-200" />

			<div className="flex flex-col">
				<div className="flex items-center justify-between gap-6">
					<div className="w-12 h-12 aspect-square flex items-center justify-center rounded-full bg-gray-200 p-0.5">
						<CircleQuestionMarkIcon size={30} className=" text-gray-700" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-gray-700 font-medium">
							{t("faq_help")}
						</span>
						<MyButton
							variant="outline"
							className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							onClick={() => {
								navigate(paths.FAQ);
							}}
						>
							{t("faq_button")}
							<ChevronRight size={20} className="inline-block" />
						</MyButton>
					</div>
				</div>

				<hr className="my-6 border-t border-gray-200" />

				<div className="flex flex-col items-stretch gap-4">
					<div className="flex items-center w-full justify-between gap-3">
						<span className="text-amber-700 font-semibold">
							{t("need_tokens")}
						</span>
					</div>
					<MyButton
						variant="outline"
						className="shadow-md border-amber-300 text-amber-500 hover:bg-amber-500 hover:text-white hover:transform hover:scale-105 transition-transform duration-200 ease-in-out"
						onClick={() => navigate(paths.candidate.profile.PRICING)}
					>
						{t("buy_tokens")}
						<DollarSign className="inline-block w-5 h-5" />
					</MyButton>
				</div>
			</div>

		</div>
	);
};



export default QuickNavigation;
