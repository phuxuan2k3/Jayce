import { Settings } from "lucide-react";

interface DifficultyDistributionProps {
	difficultyBreakdown: {
		Easy: number;
		Medium: number;
		Hard: number;
	};
	totalQuestions: number;
}

export default function DifficultyDistribution({ difficultyBreakdown, totalQuestions }: DifficultyDistributionProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 bg-primary text-white rounded-lg">
					<Settings className="w-5 h-5" />
				</div>
				<h3 className="text-xl font-semibold text-gray-800">Difficulty Distribution</h3>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
					<div className="flex items-center gap-3">
						<div className="w-4 h-4 bg-green-500 rounded-full"></div>
						<span className="font-medium text-green-800">Easy</span>
					</div>
					<span className="text-xl font-bold text-green-700">{difficultyBreakdown.Easy}</span>
				</div>

				<div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
					<div className="flex items-center gap-3">
						<div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
						<span className="font-medium text-yellow-800">Medium</span>
					</div>
					<span className="text-xl font-bold text-yellow-700">{difficultyBreakdown.Medium}</span>
				</div>

				<div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
					<div className="flex items-center gap-3">
						<div className="w-4 h-4 bg-red-500 rounded-full"></div>
						<span className="font-medium text-red-800">Hard</span>
					</div>
					<span className="text-xl font-bold text-red-700">{difficultyBreakdown.Hard}</span>
				</div>

				{/* Progress Bar */}
				<div className="mt-4">
					<div className="flex text-sm text-gray-600 mb-2">
						<span>Distribution Overview</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
						<div className="h-full flex">
							{totalQuestions > 0 && (
								<>
									<div
										className="bg-green-500"
										style={{ width: `${(difficultyBreakdown.Easy / totalQuestions) * 100}%` }}
									></div>
									<div
										className="bg-yellow-500"
										style={{ width: `${(difficultyBreakdown.Medium / totalQuestions) * 100}%` }}
									></div>
									<div
										className="bg-red-500"
										style={{ width: `${(difficultyBreakdown.Hard / totalQuestions) * 100}%` }}
									></div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
