import { useState } from "react";

export default function useTagsExamples({
}: {
	testTitle: string;
}) {
	const examples = [
		"JavaScript",
		"Python",
		"Data Structures",
		"Algorithms",
		"React",
		"Machine Learning",
		"Full Stack Development",
		"Web Development",
		"Database Management",
		"Software Engineering",
		"Interview Preparation",
	];

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<string[] | undefined>(undefined);

	const getRandomExamples = (count: number) => {
		setIsLoading(true);



		return new Promise((resolve) => {
			setTimeout(() => {
				const randomExamples = getRandomUniqueExamples(examples, count);
				setIsLoading(false);
				setData(randomExamples);
				resolve(void 0);
			}, 1000); // Simulate network delay
		});
	}
	const getRandomUniqueExamples = (examples: string[], count: number) => {
		const randomIndices = Array.from({ length: count }, () => Math.floor(Math.random() * examples.length));
		const uniqueIndices = Array.from(new Set(randomIndices));
		const randomExamples = uniqueIndices.map(index => examples[index]);
		return randomExamples;
	};

	return {
		getRandomExamples,
		isLoading,
		data,
	};
}
