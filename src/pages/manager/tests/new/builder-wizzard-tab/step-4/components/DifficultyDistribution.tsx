import { Settings } from "lucide-react";
import { DifficultyType, DifficultiesAsConst } from "../../../common/base-schema";
import { difficultyClassNames, difficultyColorMap } from '../../../common/class-names';

interface DifficultyDistributionProps {
	difficultyBreakdown: {
		difficulty: DifficultyType;
		number: number;
	}[];
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
				{DifficultiesAsConst.map((key) => {
					const found = difficultyBreakdown.find((d) => d.difficulty === key);
					const count = found ? found.number : 0;
					return (
						<div
							key={key}
							className={difficultyClassNames(key).border().background().build() + " flex items-center justify-between p-3 rounded-lg"}
						>
							<div className="flex items-center gap-3">
								<div className={`w-4 h-4 bg-${difficultyColorMap[key]}-500 rounded-full`}></div>
								<span className={"font-medium " + `text-${difficultyColorMap[key]}-800`}>{key}</span>
							</div>
							<span className={"text-xl font-bold " + `text-${difficultyColorMap[key]}-700`}>{count}</span>
						</div>
					);
				})}

				{/* Progress Bar */}
				<div className="mt-4">
					<div className="flex text-sm text-gray-600 mb-2">
						<span>Distribution Overview</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
						<div className="h-full flex">
							{totalQuestions > 0 && (
								<>
									{DifficultiesAsConst.map((key) => {
										const found = difficultyBreakdown.find((d) => d.difficulty === key);
										const count = found ? found.number : 0;
										return (
											<div
												key={key}
												className={`bg-${difficultyColorMap[key]}-500`}
												style={{ width: `${(count / totalQuestions) * 100}%` }}
											></div>
										);
									})}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
