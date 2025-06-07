import { FileText } from "lucide-react";
import { ExamGenerationState } from "../../../../models/exam-generation.model";

interface BasicInformationProps {
	state: ExamGenerationState;
}

export default function BasicInformation({ state }: BasicInformationProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 bg-primary text-white rounded-lg">
					<FileText className="w-5 h-5" />
				</div>
				<h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
			</div>

			<div className="space-y-4">
				<div>
					<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Title</label>
					<p className="text-lg font-medium text-gray-800 mt-1">{state.step1.title}</p>
				</div>

				<div>
					<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Description</label>
					<p className="text-gray-700 mt-1 leading-relaxed">{state.step1.description}</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Language</label>
						<p className="text-gray-800 mt-1 font-medium">{state.step1.language}</p>
					</div>
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Seniority</label>
						<p className="text-gray-800 mt-1 font-medium">{state.step1.seniority}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
