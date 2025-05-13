import React from 'react';
import { TestExamCore } from '../../../../../features/tests/model/test.model';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../router/paths';
import { AlarmClock, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface OngoingTestsProps {
	ongoingExams: TestExamCore[];
	isLoading: boolean;
}

const OngoingTests: React.FC<OngoingTestsProps> = ({ ongoingExams, isLoading }) => {
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<section className="border-b pb-6 border-primary-toned-200">
				<h2 className="text-2xl font-bold mb-4">Ongoing Exams</h2>
				<div className="p-6 flex justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
				</div>
			</section>
		);
	}

	if (ongoingExams.length === 0) {
		return (
			<section className="border-b pb-6 border-primary-toned-200">
				<h2 className="text-2xl font-bold mb-4">Ongoing Exams</h2>
				<p className="text-primary-toned-700 mb-4">You don't have any ongoing exams at the moment.</p>
			</section>
		);
	}

	const handleContinueExam = (examId: number) => {
		navigate(paths.candidate.tests.in(examId).DO);
	};

	const formatExamDate = (dateString: string) => {
		try {
			return format(new Date(dateString), 'MMM dd, yyyy • hh:mm a');
		} catch (error) {
			return dateString;
		}
	};

	return (
		<section className="border-b pb-6 border-primary-toned-200">
			<h2 className="text-2xl font-bold mb-4">Ongoing Exams</h2>
			<p className="text-primary-toned-700 mb-4">Continue your ongoing exams below.</p>

			<div className="space-y-4">
				{ongoingExams.map((exam) => (
					<div
						key={exam.id}
						className="bg-white rounded-lg text-secondary-toned-500 shadow-secondary p-6 cursor-pointer hover:shadow-md transition-shadow"
						onClick={() => handleContinueExam(exam.id)}
					>
						<div className="flex justify-between items-start mb-3">
							<div>
								<h3 className="font-semibold text-xl text-gray-800">{exam.title}</h3>
								<p className="text-gray-600 text-sm">By {exam.author.name}</p>
							</div>
							<div className="bg-blue-chill-100 text-blue-chill-700 px-3 py-1 rounded-full text-sm font-medium">
								{exam.mode === 'exam' ? 'Exam' : 'Practice'}
							</div>
						</div>

						<hr className="my-3 border-gray-200" />

						<div className="flex flex-col text-sm text-gray-600">
							<div className="flex items-center gap-2 my-1">
								<AlarmClock size={16} />
								<span>Duration: {exam.minutesToAnswer} minutes</span>
							</div>
							<div className="flex items-center gap-2 my-1">
								<Clock size={16} />
								<span>Started {formatDistanceToNow(new Date(exam.createdAt))} ago</span>
							</div>
							<div className="flex items-center gap-2 my-1">
								<span className="font-medium">Language:</span>
								<span>{exam.language}</span>
							</div>
							<div className="flex items-center gap-2 my-1">
								<span className="font-medium">Available until:</span>
								<span>{formatExamDate(exam.closeDate)}</span>
							</div>
						</div>

						<div className="mt-4 flex justify-end">
							<button
								className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
								onClick={(e) => {
									e.stopPropagation();
									handleContinueExam(exam.id);
								}}
							>
								Continue Exam
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default OngoingTests;