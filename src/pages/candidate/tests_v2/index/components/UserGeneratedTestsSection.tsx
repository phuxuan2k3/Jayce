import { useNavigate } from "react-router-dom";
import { TestPractice } from "../../../../../features/tests/model/test/test-practice";
import paths from "../../../../../router/paths";

type UserGeneratedTestsProps = {
	tests: TestPractice[];
	onManageTest: (testId: number) => void;
};

const UserGeneratedTestsSection = ({ tests, onManageTest }: UserGeneratedTestsProps) => {
	const navigate = useNavigate();

	return (
		<section className="border-b pb-6 border-primary-toned-200">
			<h2 className="text-2xl font-bold mb-4">Your Generated Tests</h2>
			<p className="text-primary-toned-700 mb-4">View and manage the practice tests you've generated.</p>

			{tests.length > 0 ? (
				<div className="space-y-4">
					{tests.map(test => (
						<div key={test.id} className="border border-primary-toned-300 rounded-lg p-4 hover:shadow-md transition-shadow">
							<div className="flex justify-between">
								<h3 className="font-bold text-lg">{test.title}</h3>
								<span className="text-sm bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">
									{test.difficulty === 1 ? 'Easy' : test.difficulty === 2 ? 'Medium' : 'Hard'}
								</span>
							</div>
							<p className="text-primary-toned-600 text-sm mt-2">{test.description}</p>

							<div className="flex flex-wrap gap-1 mt-2">
								{test.tags.map(tag => (
									<span key={tag} className="text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">
										{tag}
									</span>
								))}
							</div>

							<div className="flex justify-between items-center mt-4">
								<div>
									<span className="text-sm text-primary-toned-500">
										Created: {new Date(test.createdAt).toLocaleDateString()} • {test.minutesToAnswer} min
									</span>
									<div className="flex items-center mt-1">
										<span className="text-sm text-primary-toned-500 mr-2">Rating:</span>
										<div className="flex">
											{[1, 2, 3, 4, 5].map(star => (
												<span key={star} className={`text-lg ${star <= test.feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
											))}
										</div>
									</div>
								</div>
								<button
									onClick={() => onManageTest(test.id)}
									className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
								>
									View Test
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center p-8 bg-gray-50 rounded-lg">
					<p className="text-gray-500">You haven't generated any tests yet.</p>
					<button
						onClick={() => navigate(paths.candidate.tests.GENERATE)}
						className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
					>
						Create Your First Test
					</button>
				</div>
			)}
		</section>
	);
};

export default UserGeneratedTestsSection;