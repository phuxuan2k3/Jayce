import { PromptTemplate } from '../../../../../features/tests/model/test/test-practice';

// Sample data for demonstration purposes
export const sampleTemplates: PromptTemplate[] = [
	{
		id: 1,
		name: "React technical skills",
		title: "React Frontend Development",
		description: "A template focused on modern React development practices and patterns",
		numberOfQuestions: 10,
		difficulty: 3,
		tags: ['JavaScript', 'React', 'Frontend'],
		numberOfOptions: 4,
		outlines: [
			'Focus on React hooks and state management',
			'Include questions about component lifecycle',
			'Cover modern React best practices'
		]
	},
	{
		id: 2,
		name: "Python hard skills",
		title: "Python Data Science",
		description: "Comprehensive assessment of Python data science skills and libraries",
		numberOfQuestions: 15,
		difficulty: 4,
		tags: ['Python', 'Data Science', 'Backend'],
		numberOfOptions: 3,
		outlines: [
			'Include questions about pandas and numpy',
			'Focus on data manipulation techniques',
			'Cover visualization libraries like matplotlib'
		]
	}
];