import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TestCore } from '../../../../../../../features/tests/model/test/test-core';
import paths from '../../../../../../../router/paths';
import { ArrowLeft, Book, Clock, PlayCircle, Eye } from 'lucide-react';

interface TestHeaderProps {
	test: TestCore;
	onViewQuestions: () => void;
	showQuestions: boolean;
}

const TestHeader: React.FC<TestHeaderProps> = ({ test, onViewQuestions, showQuestions }) => {
	const navigate = useNavigate();

	const handleTakeTest = () => {
		navigate(paths.candidate.tests.in(test.id).DO);
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			<button
				onClick={handleBack}
				className="mb-4 text-gray-600 flex items-center hover:text-primary transition-colors"
			>
				<ArrowLeft size={16} className="mr-1" />
				Back to generation
			</button>

			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-2">{test.title}</h1>
				<p className="text-gray-600 mb-4">{test.description}</p>

				<div className="flex flex-wrap gap-4 mb-6">
					<div className="flex items-center text-gray-700">
						<Clock size={20} className="mr-2 text-primary" />
						<span>{test.minutesToAnswer} minutes</span>
					</div>
					<div className="flex items-center text-gray-700">
						<Book size={20} className="mr-2 text-primary" />
						<span>{test.mode.charAt(0).toUpperCase() + test.mode.slice(1)} mode</span>
					</div>
				</div>

				<div className="flex flex-wrap gap-4">
					<button
						onClick={handleTakeTest}
						className="bg-primary text-white px-6 py-2 rounded-lg flex items-center hover:bg-primary-toned-700 transition-colors"
					>
						<PlayCircle size={20} className="mr-2" />
						Take Test
					</button>

					<button
						onClick={onViewQuestions}
						className="bg-white text-primary border border-primary px-6 py-2 rounded-lg flex items-center hover:bg-primary-toned-50 transition-colors"
					>
						<Eye size={20} className="mr-2" />
						{showQuestions ? 'Hide Questions' : 'View Questions'}
					</button>
				</div>
			</div>
		</>
	);
};

export default TestHeader;