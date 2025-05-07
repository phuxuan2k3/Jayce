type TemplateManagementSectionProps = {
	onManageTemplates: () => void;
};

const TemplateManagementSection = ({ onManageTemplates }: TemplateManagementSectionProps) => {
	return (
		<section>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Template Management</h2>
				<button
					onClick={onManageTemplates}
					className="px-4 py-2 bg-primary text-white rounded-lg"
				>
					Manage Templates
				</button>
			</div>

			<p className="text-primary-toned-700 mb-4">Create, edit, or save templates for future test generation.</p>

			<div className="grid grid-cols-1 gap-4 p-4 bg-primary-toned-50 rounded-lg">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-bold">Create Custom Templates</h3>
						<p className="text-sm text-primary-toned-600">Design your own test templates tailored to your specific needs.</p>
					</div>
					<button className="text-primary underline">Create New</button>
				</div>

				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-bold">Browse Template Library</h3>
						<p className="text-sm text-primary-toned-600">Explore our collection of professional-grade test templates.</p>
					</div>
					<button className="text-primary underline">Browse</button>
				</div>

				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-bold">Import Template</h3>
						<p className="text-sm text-primary-toned-600">Import templates from files or external sources.</p>
					</div>
					<button className="text-primary underline">Import</button>
				</div>
			</div>
		</section>
	);
};

export default TemplateManagementSection;