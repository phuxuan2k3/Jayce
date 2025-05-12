import React from 'react';
import { TemplateCore } from '../../../../../features/tests/model/test.model';
import { XCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TemplateSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	templates: TemplateCore[];
	onSelectTemplate: (template: TemplateCore) => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
	isOpen,
	onClose,
	templates,
	onSelectTemplate,
}) => {
	const navigate = useNavigate();

	if (!isOpen) return null;

	const handleManageTemplates = () => {
		onClose();
		navigate('/candidate/tests/templates/');
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-bold text-primary">Choose a Template</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<XCircle size={24} />
					</button>
				</div>

				<div className="p-4 overflow-y-auto flex-1">
					{templates.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-gray-500 mb-4">No templates available</p>
							<button
								onClick={handleManageTemplates}
								className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-toned-700 inline-flex items-center gap-2"
							>
								<Settings size={16} />
								Manage Templates
							</button>
						</div>
					) : (
						<>
							<div className="flex justify-between items-center mb-4">
								<span className="text-sm text-gray-600">Select a template to use as a starting point</span>
								<button
									onClick={handleManageTemplates}
									className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-toned-700 inline-flex items-center gap-1 text-sm"
								>
									<Settings size={14} />
									Manage Templates
								</button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{templates.map((template) => (
									<div
										key={template.id}
										className="border border-primary-toned-200 rounded-lg p-4 hover:bg-primary-toned-50 cursor-pointer transition-colors"
										onClick={() => {
											onSelectTemplate(template);
											onClose();
										}}
									>
										<div className="flex justify-between items-start mb-2">
											<h3 className="font-bold text-primary">{template.name || template.title}</h3>
											<span className="text-xs bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">
												{template.difficulty === 1 ? 'Easy' : template.difficulty === 2 ? 'Medium' : 'Hard'}
											</span>
										</div>
										<p className="text-sm text-gray-600 mb-2">{template.description}</p>
										<div className="flex flex-wrap gap-1 mt-2">
											{template.tags.map((tag, index) => (
												<span
													key={index}
													className="text-xs bg-primary-toned-100 text-primary px-2 py-1 rounded-full"
												>
													{tag}
												</span>
											))}
										</div>
										<div className="mt-2 text-sm text-gray-500">
											{template.numberOfQuestions} questions • {template.numberOfOptions} options per question
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>

				<div className="p-4 border-t flex justify-between">
					<button
						onClick={handleManageTemplates}
						className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary-toned-50 inline-flex items-center gap-2"
					>
						<Settings size={16} />
						Manage All Templates
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default TemplateSelectionModal;