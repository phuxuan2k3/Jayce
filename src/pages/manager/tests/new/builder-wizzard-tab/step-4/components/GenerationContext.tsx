import { Globe, FileText } from "lucide-react";
import { AllStepData } from "../../utils/types";

interface GenerationContextProps {
	state: AllStepData;
}

export default function GenerationContext({ state }: GenerationContextProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-primary text-white rounded-lg">
					<Globe className="w-5 h-5" />
				</div>
				<h3 className="text-xl font-semibold text-gray-800">Generation Context</h3>
			</div>

			<div className="space-y-4">				<div>
				<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Creativity Level</label>
				<div className="flex items-center gap-4">
					<div className="flex-1 bg-gray-200 rounded-full h-3">
						<div
							className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
							style={{ width: `${(state.step3.creativity / 10) * 100}%` }}
						></div>
					</div>
					<span className="text-lg font-bold text-primary">{state.step3.creativity}/10</span>
				</div>
				<p className="text-sm text-gray-600 mt-1">
					{state.step3.creativity <= 3 ? 'Conservative' :
						state.step3.creativity <= 7 ? 'Balanced' : 'Creative'} approach to question generation
				</p>
			</div>

				{state.step3.context.text && (
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Additional Context</label>
						<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
							<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{state.step3.context.text}</p>
						</div>
					</div>
				)}

				{state.step3.context.files.length > 0 && (
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Uploaded Files</label>
						<div className="space-y-2">
							{state.step3.context.files.map((file, index) => (
								<div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
									<FileText className="w-4 h-4 text-gray-500" />
									<span className="text-sm text-gray-700">{file.name}</span>
									<span className="text-xs text-gray-500 ml-auto">
										{(file.size / 1024).toFixed(1)} KB
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{state.step3.context.links.length > 0 && (
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Reference Links</label>
						<div className="space-y-2">
							{state.step3.context.links.map((link, index) => (
								<div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
									<Globe className="w-4 h-4 text-gray-500" />
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-primary hover:text-primary-toned-600 underline flex-1 truncate"
									>
										{link}
									</a>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
