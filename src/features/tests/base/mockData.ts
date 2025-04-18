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