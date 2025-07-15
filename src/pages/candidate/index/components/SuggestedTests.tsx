import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import paths from "../../../../router/paths";
import { useGetTestsSuggestedQuery, TestFullSchema } from "../../../../features/tests/api/test.api-gen-v2";
import { useLanguage } from "../../../../LanguageProvider";
import TestListSkeleton from "../../../../features/tests/ui/skeletons/TestListSkeleton";
import { ChevronRightIcon } from "lucide-react";

type PracticeTest = TestFullSchema & {
	_detail: {
		mode: "PRACTICE";
		difficulty: string;
		tags: string[];
		numberOfQuestions: number;
		numberOfOptions: number;
		outlines: string[]
	}
};

// Type guard for practice tests
const isPracticeTest = (test: TestFullSchema): test is PracticeTest => {
	return test._detail.mode === "PRACTICE";
};

// Constants
const SUGGESTED_TESTS_COUNT = 2;
const LOW_SCORE_THRESHOLD = 0.4;

// Components
const TestBadge = ({
	children,
	variant = "primary"
}: {
	children: React.ReactNode;
	variant?: "primary" | "secondary"
}) => {
	const baseClasses = "text-xs font-medium px-2 py-0.5 rounded-full";
	const variantClasses = variant === "primary"
		? "bg-primary-toned-200 text-primary"
		: "bg-secondary-toned-50 text-secondary-toned-600";

	return (
		<span className={`${baseClasses} ${variantClasses}`}>
			{children}
		</span>
	);
};

const TestTag = ({ tag }: { tag: string }) => (
	<span className="text-xs bg-primary-toned-50 text-primary-toned-700 border border-primary-toned-200 px-3 py-0.5 rounded-full h-fit w-fit">
		{tag}
	</span>
);

const TestCard = ({
	test,
	onDetailsClick,
	t
}: {
	test: PracticeTest;
	onDetailsClick: (id: string) => void;
	t: (key: string) => string;
}) => {
	const isNew = test._aggregate.totalAttempts === 0;
	const isLowScore = test._aggregate.averageScore > 0 &&
		test._aggregate.averageScore < test._aggregate.totalPoints * LOW_SCORE_THRESHOLD;

	return (
		<div className="flex flex-col border border-primary border-l-4 border-l-primary p-4 rounded-lg shadow-md bg-white">
			<div className="flex justify-between items-start mb-2">
				<h3 className="text-lg font-bold text-gray-800 break-words flex-1 mr-4">
					{test.title}
				</h3>
				{(isNew || isLowScore) && (
					<div className="flex flex-wrap gap-2 mb-2">
						{isNew && (
							<TestBadge variant="primary">
								{t("candidate_home_suggested_tests_no_attempt")}
							</TestBadge>
						)}
						{isLowScore && (
							<TestBadge variant="secondary">
								{t("candidate_home_suggested_tests_low_score")}
							</TestBadge>
						)}
					</div>
				)}
			</div>

			<p className="text-sm text-gray-600 mb-3 break-words">
				{test.description}
			</p>

			<div className="grid grid-cols-2 gap-x-12 gap-y-1 text-sm text-gray-700 mb-4">
				<div>
					<span>{t("candidate_home_field_difficulty")}: </span>
					<strong>{test._detail.difficulty}</strong>
				</div>
				<div>
					<span>{t("candidate_home_field_questions")}: </span>
					<strong>{test._detail.numberOfQuestions}</strong>
				</div>
				<div>
					<span>{t("candidate_home_field_language")}: </span>
					<strong>{test.language}</strong>
				</div>
				<div>
					<span>{t("candidate_home_field_time")}: </span>
					<strong>{test.minutesToAnswer} min</strong>
				</div>
			</div>

			<div className="flex items-center gap-2 flex-wrap">
				{test._detail.tags.length > 0 && (
					<div className="flex items-center gap-2 flex-wrap mb-4">
						<span className="text-xs font-semibold">Tags:</span>
						{test._detail.tags.map((tag: string, index: number) => (
							<TestTag key={index} tag={tag} />
						))}
					</div>
				)}

				<button
					className="ml-auto w-fit px-5 py-2 font-semibold text-sm rounded-md bg-primary text-white border border-primary hover:bg-white hover:text-primary transition-colors duration-200 flex items-center justify-center"
					onClick={() => onDetailsClick(test.id)}
				>
					{t("candidate_home_template_button_more_details")}
					<ChevronRightIcon className="inline ml-1 h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

const EmptyState = ({
	onCreateTest,
	t
}: {
	onCreateTest: () => void;
	t: (key: string) => string;
}) => (
	<div className="text-center py-8">
		<p className="text-gray-500 mb-4">
			{t("candidate_home_suggested_tests_empty")}
		</p>
		<button
			className="px-6 py-2 rounded-lg font-bold bg-primary border text-white hover:bg-white hover:text-primary hover:border-primary transition-all duration-200"
			onClick={onCreateTest}
		>
			{t("candidate_home_suggested_tests_create")}
		</button>
	</div>
);

const SuggestedTests = () => {
	const { t } = useLanguage();
	const navigate = useNavigate();

	const { data: testsSuggestedData, isLoading: isTestsLoading } = useGetTestsSuggestedQuery({
		numberOfTests: SUGGESTED_TESTS_COUNT
	});

	// Memoized practice tests filtering
	const practiceTests = useMemo(() =>
		testsSuggestedData?.filter(isPracticeTest) || [],
		[testsSuggestedData]
	);

	// Event handlers
	const handleSeeMore = () => navigate(paths.candidate.tests.ROOT);
	const handleCreateTest = () => navigate(paths.candidate.tests.GENERATE);
	const handleTestDetails = (testId: string) =>
		navigate(`${paths.candidate.tests.in(testId).PRACTICE}`);

	return (
		<section
			id="suggested-tests"
			className="mb-8 pb-8 border-b-gradient scroll-mt-20"
			aria-labelledby="suggested-tests-title"
		>
			<header className="flex justify-between items-center text-primary mb-6">
				<h2 id="suggested-tests-title" className="text-2xl font-semibold">
					{t("candidate_home_suggested_tests_title")}
				</h2>
				<button
					className="text-sm hover:underline cursor-pointer transition-colors duration-200"
					onClick={handleSeeMore}
					type="button"
				>
					{t("candidate_home_suggested_tests_see_more")}
				</button>
			</header>

			{isTestsLoading ? (
				<TestListSkeleton />
			) : practiceTests.length > 0 ? (
				<div className="grid gap-4">
					{practiceTests.map((test: PracticeTest) => (
						<TestCard
							key={test.id}
							test={test}
							onDetailsClick={handleTestDetails}
							t={t}
						/>
					))}
				</div>
			) : (
				<EmptyState onCreateTest={handleCreateTest} t={t} />
			)}
		</section>
	);
};

export default SuggestedTests;
