import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import {
	selectWizardState,
	selectGeneratedQuestions,
	updateGeneratedQuestion,
	setExportFormat,
	setCandidateEmail,
	setLoading
} from '../../state/wizardSlice';

// Question card component
const QuestionCard: React.FC<{
	question: {
		id: string;
		question: string;
		difficulty: 'easy' | 'medium' | 'hard';
	};
	onEdit: (id: string, newQuestion: string) => void;
	onRegenerate: (id: string) => void;
}> = ({ question, onEdit, onRegenerate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedQuestion, setEditedQuestion] = useState(question.question);

	const difficultyColors = {
		easy: 'bg-green-100 text-green-800 border-green-200',
		medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
		hard: 'bg-red-100 text-red-800 border-red-200'
	};

	const handleSaveEdit = () => {
		onEdit(question.id, editedQuestion);
		setIsEditing(false);
	};

	return (
		<div className="border border-gray-200 rounded-lg p-4 mb-3 bg-white shadow-sm hover:shadow transition-shadow">
			<div className="flex justify-between items-start mb-2">
				<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
					{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
				</span>
				<div className="flex space-x-2">
					<button
						type="button"
						onClick={() => setIsEditing(!isEditing)}
						className="text-gray-500 hover:text-blue-600"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
					</button>
					<button
						type="button"
						onClick={() => onRegenerate(question.id)}
						className="text-gray-500 hover:text-blue-600"
						title="Regenerate this question"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
			</div>

			{isEditing ? (
				<div className="space-y-2">
					<textarea
						value={editedQuestion}
						onChange={(e) => setEditedQuestion(e.target.value)}
						className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						rows={4}
					></textarea>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={() => {
								setEditedQuestion(question.question);
								setIsEditing(false);
							}}
							className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleSaveEdit}
							className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							Save
						</button>
					</div>
				</div>
			) : (
				<p className="text-gray-700 whitespace-pre-wrap">{question.question}</p>
			)}
		</div>
	);
};

// Blueprint summary component
const BlueprintSummary: React.FC = () => {
	const { roleTitle, purpose, totalQuestions, topics } = useAppSelector(selectWizardState);

	return (
		<div className="space-y-4">
			<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
				<h3 className="text-lg font-medium text-gray-800 mb-2">Test Overview</h3>
				<dl className="grid grid-cols-1 gap-x-4 gap-y-2">
					<div className="flex justify-between">
						<dt className="text-sm font-medium text-gray-500">Role & Title:</dt>
						<dd className="text-sm text-gray-900">{roleTitle}</dd>
					</div>
					<div className="flex justify-between">
						<dt className="text-sm font-medium text-gray-500">Purpose:</dt>
						<dd className="text-sm text-gray-900">{purpose}</dd>
					</div>
					<div className="flex justify-between">
						<dt className="text-sm font-medium text-gray-500">Total Questions:</dt>
						<dd className="text-sm text-gray-900">{totalQuestions}</dd>
					</div>
				</dl>
			</div>

			<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
				<h3 className="text-lg font-medium text-gray-800 mb-2">Topics</h3>
				{topics.length > 0 ? (
					<div className="space-y-3">
						{topics.map((topic) => (
							<div key={topic.id} className="border border-gray-200 rounded-md p-3 bg-white">
								<div className="flex justify-between mb-1">
									<h4 className="text-sm font-medium text-gray-700">{topic.name}</h4>
									<span className="text-sm text-gray-500">{topic.questionCount} questions</span>
								</div>
								<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-green-500"
										style={{ width: `${topic.difficulty.easy}%`, float: 'left' }}
									></div>
									<div
										className="h-full bg-yellow-500"
										style={{ width: `${topic.difficulty.medium}%`, float: 'left' }}
									></div>
									<div
										className="h-full bg-red-500"
										style={{ width: `${topic.difficulty.hard}%`, float: 'left' }}
									></div>
								</div>
								<div className="flex justify-between text-xs text-gray-500 mt-1">
									<span>{topic.difficulty.easy}% Easy</span>
									<span>{topic.difficulty.medium}% Medium</span>
									<span>{topic.difficulty.hard}% Hard</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-500">No topics defined</p>
				)}
			</div>
		</div>
	);
};

// Export section component
const ExportSection: React.FC = () => {
	const dispatch = useAppDispatch();
	const { exportFormat, candidateEmail, isLoading } = useAppSelector(selectWizardState);

	const handleExport = () => {
		// Simulate export process
		dispatch(setLoading(true));
		setTimeout(() => {
			dispatch(setLoading(false));
			alert('Test exported successfully!');
		}, 1500);
	};

	const handleSendInvite = () => {
		// Simulate sending invite
		dispatch(setLoading(true));
		setTimeout(() => {
			dispatch(setLoading(false));
			alert(`Invitation sent to ${candidateEmail}`);
		}, 1500);
	};

	return (
		<div className="space-y-4">
			<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
				<h3 className="text-lg font-medium text-gray-800 mb-3">Export Options</h3>
				<div className="space-y-4">
					<div className="flex flex-wrap gap-3">
						{(['JSON', 'PDF', 'CSV'] as const).map((format) => (
							<label key={format} className="flex items-center">
								<input
									type="radio"
									name="exportFormat"
									value={format}
									checked={exportFormat === format}
									onChange={() => dispatch(setExportFormat(format))}
									className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700">{format}</span>
							</label>
						))}
					</div>

					<button
						type="button"
						onClick={handleExport}
						disabled={isLoading}
						className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
					>
						{isLoading ? (
							<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
						)}
						Export as {exportFormat}
					</button>
				</div>
			</div>

			<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
				<h3 className="text-lg font-medium text-gray-800 mb-3">Invite Candidates</h3>
				<div className="space-y-3">
					<div>
						<label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700">
							Candidate Email
						</label>
						<input
							type="email"
							id="candidateEmail"
							value={candidateEmail}
							onChange={(e) => dispatch(setCandidateEmail(e.target.value))}
							placeholder="candidate@example.com"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
						/>
					</div>

					<button
						type="button"
						onClick={handleSendInvite}
						disabled={isLoading || !candidateEmail || !candidateEmail.includes('@')}
						className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
					>
						{isLoading ? (
							<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						)}
						Send Invite
					</button>
				</div>
			</div>
		</div>
	);
};

// Main component
const PreviewExport: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector(selectWizardState);
	const generatedQuestions = useAppSelector(selectGeneratedQuestions);

	// Mock data for preview - typically this would come from the AI generation
	React.useEffect(() => {
		if (generatedQuestions.length === 0) {
			dispatch(setLoading(true));

			// Simulating API call to generate questions
			setTimeout(() => {
				const mockQuestions = [
					{
						id: 'q1',
						question: `Explain the difference between React's useState and useReducer hooks, including when you might prefer one over the other.`,
						difficulty: 'medium' as const
					},
					{
						id: 'q2',
						question: 'What are React portals and in what scenarios would you use them?',
						difficulty: 'easy' as const
					},
					{
						id: 'q3',
						question: 'Implement a custom useDebouce hook in React that delays invoking a function until after a specified wait time has elapsed since the last invocation.',
						difficulty: 'hard' as const
					},
					{
						id: 'q4',
						question: 'Describe the concept of code splitting in React and how it improves application performance.',
						difficulty: 'medium' as const
					},
					{
						id: 'q5',
						question: 'What is the virtual DOM in React and how does it improve performance?',
						difficulty: 'easy' as const
					}
				];

				// In a real application, this would be the response from an API call
				dispatch({ type: 'wizard/setGeneratedQuestions', payload: mockQuestions });
				dispatch(setLoading(false));
			}, 2000);
		}
	}, [dispatch, generatedQuestions]);

	const handleEditQuestion = (id: string, newQuestion: string) => {
		dispatch(updateGeneratedQuestion({ id, question: newQuestion }));
	};

	const handleRegenerateQuestion = (id: string) => {
		dispatch(setLoading(true));

		// Simulate API call to regenerate a single question
		setTimeout(() => {
			const newQuestions = [...generatedQuestions];
			const index = newQuestions.findIndex(q => q.id === id);

			if (index !== -1) {
				newQuestions[index] = {
					...newQuestions[index],
					question: `[Regenerated] ${newQuestions[index].question.replace('[Regenerated] ', '')}`
				};

				dispatch({ type: 'wizard/setGeneratedQuestions', payload: newQuestions });
			}

			dispatch(setLoading(false));
		}, 1500);
	};

	return (
		<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
			{/* Left side: Generated questions */}
			<div className="w-full md:w-1/2">
				<h3 className="text-lg font-medium text-gray-800 mb-4">Generated Questions</h3>

				{isLoading && generatedQuestions.length === 0 ? (
					<div className="space-y-3">
						{[1, 2, 3, 4, 5].map((i) => (
							<div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
								<div className="flex justify-between items-start mb-2">
									<div className="h-5 w-16 bg-gray-200 rounded-full"></div>
									<div className="flex space-x-2">
										<div className="h-4 w-4 bg-gray-200 rounded"></div>
										<div className="h-4 w-4 bg-gray-200 rounded"></div>
									</div>
								</div>
								<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-2/3"></div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-4">
						<div className="flex justify-between items-center mb-2">
							<p className="text-sm text-gray-500">
								Total: {generatedQuestions.length} questions
							</p>
							<button
								type="button"
								className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
								disabled={isLoading}
								onClick={() => {
									if (confirm('Regenerate all questions?')) {
										// This would trigger a full regeneration in a real app
										handleRegenerateQuestion('q1');
									}
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
								Regenerate All
							</button>
						</div>

						<div className="overflow-y-auto max-h-[500px] pr-2">
							{generatedQuestions.map((question) => (
								<QuestionCard
									key={question.id}
									question={question}
									onEdit={handleEditQuestion}
									onRegenerate={handleRegenerateQuestion}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Right side: Summary and export */}
			<div className="w-full md:w-1/2">
				<h3 className="text-lg font-medium text-gray-800 mb-4">Blueprint & Export</h3>

				<div className="space-y-6">
					<BlueprintSummary />
					<ExportSection />
				</div>
			</div>
		</div>
	);
};

export default PreviewExport;
