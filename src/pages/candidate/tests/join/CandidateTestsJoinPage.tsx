import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import { useState, useEffect } from "react";
import SidebarActions from "../../../../features/tests/ui2/sidebar/SidebarActions";
import JoinTestSection from "./components/JoinTestSection";
import ExamInfoDialog from "./components/ExamInfoDialog";
import OngoingTests from "./components/OngoingTests";
import { TestExam } from "../../../../features/tests/model/test.model";

export default function CandidateTestsJoinPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentExamCode, setCurrentExamCode] = useState("");
	const [examData, setExamData] = useState<TestExam | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [ongoingExams, setOngoingExams] = useState<TestExam[]>([]);
	const [loadingOngoingExams, setLoadingOngoingExams] = useState(false);

	// Mock data for templates and tests - in real implementation these would come from API calls

	// Fetch ongoing exams on component mount
	useEffect(() => {
		fetchOngoingExams();
	}, []);

	const fetchOngoingExams = () => {
		setLoadingOngoingExams(true);

		// Simulate API call with a timeout
		setTimeout(() => {
			// Mock data for ongoing exams - in real implementation this would come from an API call
			const mockOngoingExams: TestExam[] = [
				{
					id: 789,
					author: {
						id: "author789",
						name: "David Johnson",
						avatar: "https://example.com/avatar3.jpg"
					},
					title: "React Advanced Concepts",
					description: "Test your knowledge of advanced React patterns, hooks, and state management.",
					minutesToAnswer: 60,
					language: "JavaScript",
					mode: "exam",
					createdAt: "2025-05-10T09:30:00Z",
					roomId: "REACT123",
					numberOfAttemptsAllowed: 1,
					isAnswerVisible: false,
					isAllowedToSeeOthersResults: true,
					openDate: "2025-05-10T00:00:00Z",
					closeDate: "2025-05-30T23:59:59Z"
				}
			];

			setOngoingExams(mockOngoingExams);
			setLoadingOngoingExams(false);
		}, 1000);
	};

	const handleJoinTest = (code: string) => {
		setCurrentExamCode(code);
		setIsDialogOpen(true);
		setIsLoading(true);
		setExamData(null);
		setError(null);

		// Simulate API call with a timeout
		setTimeout(() => {
			setIsLoading(false);

			// Mock response - in real implementation this would be an API call
			// Here we're simulating different scenarios based on the code entered
			if (code === "TEST123") {
				// Successfully found the test
				setExamData({
					id: 123,
					author: {
						id: "author123",
						name: "Jane Smith",
						avatar: "https://example.com/avatar.jpg"
					},
					title: "JavaScript Fundamentals Test",
					description: "Test your knowledge of JavaScript core concepts, ES6 features, and common patterns.",
					minutesToAnswer: 45,
					language: "JavaScript",
					mode: "exam",
					createdAt: "2023-08-10T15:30:00Z",
					roomId: code,
					password: "pass123", // Example with password
					numberOfAttemptsAllowed: 2,
					isAnswerVisible: true,
					isAllowedToSeeOthersResults: false,
					openDate: "2023-08-10T00:00:00Z",
					closeDate: "2023-12-31T23:59:59Z"
				});
			} else if (code === "NOPASS") {
				// Test without password
				setExamData({
					id: 456,
					author: {
						id: "author456",
						name: "John Doe",
						avatar: "https://example.com/avatar2.jpg"
					},
					title: "Python Basics Exam",
					description: "Evaluate your Python programming skills with questions on syntax, data structures and more.",
					minutesToAnswer: 60,
					language: "Python",
					mode: "exam",
					createdAt: "2023-07-20T10:15:00Z",
					roomId: code,
					numberOfAttemptsAllowed: 1,
					isAnswerVisible: false,
					isAllowedToSeeOthersResults: true,
					openDate: "2023-07-20T00:00:00Z",
					closeDate: "2023-12-31T23:59:59Z"
				});
			} else {
				// Test not found
				setError("We couldn't find a test with that code. Please check the code and try again.");
			}
		}, 1500); // Simulate network delay
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Skillsharp Tests"
					description="Join hosted tests or generate your own practice tests from templates"
				/>
			}
			left={
				<SidebarActions>
					<SidebarActions.BrowseTemplates />
					<SidebarActions.GenerateTest />
					<SidebarActions.TestsHistory />
				</SidebarActions>
			}
		>			<div className="flex flex-col gap-8">
				{/* Join tests by code */}
				<JoinTestSection onJoinTest={handleJoinTest} />

				{/* Ongoing Exams */}
				<OngoingTests ongoingExams={ongoingExams} isLoading={loadingOngoingExams} />

				{/* Exam Info Dialog */}
				<ExamInfoDialog
					isOpen={isDialogOpen}
					onClose={handleCloseDialog}
					code={currentExamCode}
					isLoading={isLoading}
					examData={examData}
					error={error}
				/>
			</div>
		</NewLeftLayoutTemplate>
	);
};