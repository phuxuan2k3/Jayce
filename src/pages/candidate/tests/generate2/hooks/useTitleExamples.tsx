export default function useTitleExamples() {
	const examples = [
		"JavaScript Interview Questions",
		"Python Coding Challenges",
		"Data Structures and Algorithms Practice",
		"React.js Interview Prep",
		"Machine Learning Basics Quiz",
		"Full Stack Developer Mock Test",
		"Web Development Fundamentals",
		"Database Management Systems Questions",
	];

	const getRandomExample = () => {
		const randomIndex = Math.floor(Math.random() * examples.length);
		return examples[randomIndex];
	};

	return { getRandomExample };
}
