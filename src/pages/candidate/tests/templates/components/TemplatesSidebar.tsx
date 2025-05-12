import SidebarActions from '../../../../../features/tests/ui2/sidebar/SidebarActions';

interface TemplatesSidebarProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	onCreateNew: () => void;
}

const TemplatesSidebar = ({ searchTerm, onSearchChange, onCreateNew }: TemplatesSidebarProps) => {
	return (
		<SidebarActions
			title='Template Actions'
			topSection={
				<div className="mb-4">
					<label htmlFor="search" className="block text-sm font-medium text-primary-toned-700 mb-1">
						Search Templates
					</label>
					<div className="relative">
						<input
							type="text"
							id="search"
							value={searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
							className="w-full rounded-md border border-primary-toned-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-2 pl-3 pr-10"
							placeholder="Search templates..."
						/>
						<div className="absolute inset-y-0 right-0 flex items-center pr-3">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-toned-400" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
							</svg>
						</div>
					</div>
				</div>
			}
			bottomSection={
				<div className="mt-4 border-t border-primary-toned-200 pt-4">
					<div className="bg-primary-toned-100 rounded-lg p-4">
						<h4 className="font-semibold text-primary-toned-700 mb-2">Template Tips</h4>
						<p className="text-sm text-primary-toned-600 mb-3">Create effective templates by including clear context, difficulty levels, and varied question types.</p>
						<a href="#" className="text-primary text-sm font-semibold flex items-center">
							Learn More
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
							</svg>
						</a>
					</div>
				</div>
			}
		>
			<SidebarActions.CreateNewTemplate
				onCreateNewTemplate={onCreateNew}
			/>
			<SidebarActions.GenerateTest />
			<SidebarActions.ReturnToTests />
		</SidebarActions>
	);
};

export default TemplatesSidebar;