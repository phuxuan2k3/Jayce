import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TestCore } from '../../../../../../features/tests/model/test/test-core';
import { QuestionHideAnswer, QuestionCore } from '../../../../../../features/tests/model/question.model';

// Import components
import TestHeader from './components/TestHeader';
import QuestionsList from './components/QuestionsList';

// Import mock API functions
import { fetchTest, fetchQuestions, fetchQuestionWithAnswer } from './mock/testApi';

const CandidateTestPracticePage: React.FC = () => {
	const location = useLocation();
	const testId = location.state?.testId || 1; // Default to 1 for demo purposes

	const [loading, setLoading] = useState(true);
	const [test, setTest] = useState<TestCore | null>(null);
	const [showQuestions, setShowQuestions] = useState(false);
	const [questions, setQuestions] = useState<QuestionHideAnswer[]>([]);
	const [questionsWithAnswers, setQuestionsWithAnswers] = useState<Record<number, QuestionCore>>({});
	const [loadingAllAnswers, setLoadingAllAnswers] = useState(false);
	const [loadingQuestions, setLoadingQuestions] = useState(false);
	const [loadingAnswerIds, setLoadingAnswerIds] = useState<number[]>([]);

	// Load test data
	useEffect(() => {
		const loadTest = async () => {
			try {
				const testData = await fetchTest(testId);
				setTest(testData);
				setLoading(false);
			} catch (error) {
				console.error('Error loading test:', error);
				setLoading(false);
			}
		};

		loadTest();
	}, [testId]);

	// Load questions when user clicks "View Questions"
	const handleViewQuestions = async () => {
		if (questions.length === 0) {
			setLoadingQuestions(true);
			setShowQuestions(true); // Show questions immediately to display loading indicator
			try {
				const fetchedQuestions = await fetchQuestions(testId);
				setQuestions(fetchedQuestions);
			} catch (error) {
				console.error('Error loading questions:', error);
			} finally {
				setLoadingQuestions(false);
			}
		} else {
			setShowQuestions(true);
		}
	};

	// Load specific question with answer
	const handleViewAnswer = async (questionId: number) => {
		if (!questionsWithAnswers[questionId] && !loadingAnswerIds.includes(questionId)) {
			setLoadingAnswerIds(prev => [...prev, questionId]);
			try {
				const questionWithAnswer = await fetchQuestionWithAnswer(questionId);
				setQuestionsWithAnswers(prev => ({
					...prev,
					[questionId]: questionWithAnswer
				}));
			} catch (error) {
				console.error('Error loading question answer:', error);
			} finally {
				setLoadingAnswerIds(prev => prev.filter(id => id !== questionId));
			}
		}
	};

	// Load all questions with answers
	const handleViewAllAnswers = async () => {
		setLoadingAllAnswers(true);
		try {
			// Create an array of promises for all questions that don't have answers loaded yet
			const promises = questions
				.filter(q => !questionsWithAnswers[q.id])
				.map(q => fetchQuestionWithAnswer(q.id));

			// Wait for all promises to resolve
			const loadedAnswers = await Promise.all(promises);

			// Update the state with all loaded answers
			const newQuestionsWithAnswers = { ...questionsWithAnswers };
			loadedAnswers.forEach((question: QuestionCore) => {
				newQuestionsWithAnswers[question.id] = question;
			});

			setQuestionsWithAnswers(newQuestionsWithAnswers);
		} catch (error) {
			console.error('Error loading all answers:', error);
		} finally {
			setLoadingAllAnswers(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 p-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Test Generated</h1>
				<div className="flex flex-col items-center justify-center h-64">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
					<p className="mt-4 text-lg text-gray-600">Loading test information...</p>
				</div>
			</div>
		);
	}

	if (!test) {
		return (
			<div className="min-h-screen bg-gray-50 p-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Error</h1>
				<p>Could not load test information. Please try again.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<TestHeader
				test={test}
				onViewQuestions={handleViewQuestions}
				showQuestions={showQuestions}
			/>

			{showQuestions && loadingQuestions && (
				<div className="flex flex-col items-center justify-center h-64">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
					<p className="mt-4 text-lg text-gray-600">Loading questions...</p>
				</div>
			)}

			{showQuestions && !loadingQuestions && (
				<QuestionsList
					questions={questions}
					questionsWithAnswers={questionsWithAnswers}
					handleViewAnswer={handleViewAnswer}
					handleViewAllAnswers={handleViewAllAnswers}
					setShowQuestions={setShowQuestions}
					loadingAllAnswers={loadingAllAnswers}
					loadingAnswerIds={loadingAnswerIds}
				/>
			)}
		</div>
	);
};

export default CandidateTestPracticePage;