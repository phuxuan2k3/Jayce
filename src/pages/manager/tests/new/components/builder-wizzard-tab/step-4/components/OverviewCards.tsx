import { Target, Users, Lightbulb } from "lucide-react";
import { ExamGenerationState } from "../../../../models/exam-generation.model";

interface OverviewCardsProps {
	state: ExamGenerationState;
	totalQuestions: number;
}

export default function OverviewCards({ state, totalQuestions }: OverviewCardsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="bg-gradient-to-br from-primary-toned-50 to-primary-toned-100 p-6 rounded-lg border border-primary-toned-200">
				<div className="flex items-center gap-3 mb-3">
					<div className="p-2 bg-primary-toned-500 text-white rounded-lg">
						<Target className="w-5 h-5" />
					</div>
					<h3 className="font-semibold text-primary-toned-700">Total Questions</h3>
				</div>
				<div className="text-3xl font-bold text-primary-toned-800">{totalQuestions}</div>
				<p className="text-sm text-primary-toned-600 mt-1">Across {state.step2.topics.length} topics</p>
			</div>

			<div className="bg-gradient-to-br from-secondary-toned-50 to-secondary-toned-100 p-6 rounded-lg border border-secondary-toned-200">
				<div className="flex items-center gap-3 mb-3">
					<div className="p-2 bg-secondary-toned-500 text-white rounded-lg">
						<Users className="w-5 h-5" />
					</div>
					<h3 className="font-semibold text-secondary-toned-700">Target Level</h3>
				</div>
				<div className="text-2xl font-bold text-secondary-toned-800">{state.step1.seniority}</div>
				<p className="text-sm text-secondary-toned-600 mt-1">Experience level</p>
			</div>

			<div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
				<div className="flex items-center gap-3 mb-3">
					<div className="p-2 bg-green-500 text-white rounded-lg">
						<Lightbulb className="w-5 h-5" />
					</div>
					<h3 className="font-semibold text-green-700">Creativity Level</h3>
				</div>				<div className="text-2xl font-bold text-green-800">{state.step3.creativity}/10</div>
				<p className="text-sm text-green-600 mt-1">AI creativity score</p>
			</div>
		</div>
	);
}
