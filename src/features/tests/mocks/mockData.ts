import { GetUserAttemptsByAttemptIdAnswersApiResponse, GetUserAttemptsByAttemptIdApiResponse } from "../api/test.api-gen";
import { QuestionDTO } from "../types/crud";

export const mockQuestions: QuestionDTO[] = [
	{
		id: 1,
		text: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
		correctOption: 0,
		points: 1,
	},
	{
		id: 2,
		text: "What is the largest planet in our solar system?",
		options: ["Earth", "Mars", "Jupiter", "Saturn"],
		correctOption: 2,
		points: 1,
	},
	{
		id: 3,
		text: "What is the chemical symbol for gold?",
		options: ["Au", "Ag", "Fe", "Pb"],
		correctOption: 0,
		points: 1,
	},
	{
		id: 4,
		text: "What is the speed of light?",
		options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000 km/s"],
		correctOption: 0,
		points: 1,
	},
]

export const mockGetUserAttemptsByAttemptIdAnswersApiResponse: GetUserAttemptsByAttemptIdAnswersApiResponse = {
	page: 1,
	perPage: 10,
	total: 30,
	totalPages: 3,
	data: [
		{
			question: {
				id: 1,
				text: "Alo alo",
				options: [
					"abc",
					"asd",
					"adc",
				],
				correctOption: 1,
				points: 10,
			},
			chosenOption: 1,
		},
		{
			question: {
				id: 1,
				text: "Alo alo",
				options: [
					"abc",
					"asd",
					"adc",
				],
				correctOption: 1,
				points: 10,
			},
			chosenOption: 1,
		},
		{
			question: {
				id: 1,
				text: "Alo alo",
				options: [
					"abc",
					"asd",
					"adc",
				],
				correctOption: 1,
				points: 10,
			},
			chosenOption: 1,
		},
		{
			question: {
				id: 1,
				text: "Alo alo",
				options: [
					"abc",
					"asd",
					"adc",
				],
				correctOption: 1,
				points: 10,
			},
			chosenOption: 1,
		}
	]
}

export const mockGetUserAttemptsByAttemptIdApiResponse: GetUserAttemptsByAttemptIdApiResponse = {
	id: 1,
	test: {
		id: 1,
		managerId: "1",
		title: "This is a test",
		minutesToAnswer: 20,
		tags: ["Pro", "Data"],
	},
	candidateId: "1",
	startDate: new Date().toString(),
	secondsSpent: 1230,
	score: 15,
	totalScore: 100,
	totalCorrectAnswers: 2,
	totalWrongAnswers: 8,
	totalQuestions: 10,

}