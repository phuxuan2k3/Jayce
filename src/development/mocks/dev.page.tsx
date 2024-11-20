import InterviewQuestionsPage, { QuestionCardProps } from "../../pages/F1/InterviewQuestions.page";

const exampleQuestions: QuestionCardProps[] = [
	{
		company: "Meta (Facebook)",
		timeAgo: "2 days ago",
		question: "Design a product that helps people find contract",
		tags: ["Product Manager", "Designer", "+1 more"],
		answersCount: 6,
		timeToAnswer: "45 minutes",
		clarifyingQuestion: "What type of contract you are considering?",
	},
	{
		company: "Amazon",
		timeAgo: "Now",
		question: "What key metrics would you use to measure the success of Zoom?",
		tags: ["Product Manager", "Designer", "+1 more"],
		answersCount: 6,
		timeToAnswer: "30 minutes",
		clarifyingQuestion: "An online Food Ordering and Food Delivery Company",
	},
];

export default function Page() {
	return <InterviewQuestionsPage questions={exampleQuestions} />
}