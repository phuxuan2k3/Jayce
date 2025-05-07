import React from 'react';
import { PromptTemplate } from '../../../../../features/tests/model/test/test-practice';

interface TemplatesListProps {
	templates: PromptTemplate[];
	selectedTemplate: PromptTemplate | null;
	searchTerm: string;
	onSearchChange: (term: string) => void;
	onSelectTemplate: (template: PromptTemplate) => void;
	onCreateNew: () => void;
	onDeleteTemplate: (id: number) => void;
}

const TemplatesList: React.FC<TemplatesListProps> = ({
	templates,
	selectedTemplate,
	searchTerm,
	onSearchChange,
	onSelectTemplate,
	onCreateNew,
	onDeleteTemplate
}) => {
	// Filter templates based on search term
	const filteredTemplates = templates.filter(template =>
		template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
		template.id.toString().includes(searchTerm)
	);

	return (
		<div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-gray-700">Templates</h2>
				<button
					onClick={onCreateNew}
					className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
				>
					New Template
				</button>
			</div>

			<div className="mb-4">
				<input
					type="text"
					placeholder="Search by tag or ID..."
					className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
				/>
			</div>

			<div className="space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto">
				{filteredTemplates.map(template => (
					<div
						key={template.id}
						className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition ${selectedTemplate?.id === template.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
							}`}
						onClick={() => onSelectTemplate(template)}
					>
						<div className="flex justify-between items-start">
							<div>
								<h3 className="font-medium">Template #{template.id}</h3>
								<p className="text-sm text-gray-600">Questions: {template.numberOfQuestions}</p>
								<p className="text-sm text-gray-600">Difficulty: {template.difficulty}/5</p>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onDeleteTemplate(template.id);
								}}
								className="text-red-500 hover:text-red-700"
							>
								Delete
							</button>
						</div>
						<div className="mt-2 flex flex-wrap gap-1">
							{template.tags.map((tag, idx) => (
								<span
									key={idx}
									className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				))}

				{filteredTemplates.length === 0 && (
					<div className="text-center py-6 text-gray-500">
						No templates found. Create a new one!
					</div>
				)}
			</div>
		</div>
	);
};

export default TemplatesList;