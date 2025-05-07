import { useNavigate } from 'react-router-dom';
import QuickAction from './QuickAction';
import paths from '../../../../../router/paths';

const SidebarActions = () => {
	const navigate = useNavigate();

	return (
		<div className="shadow-primary bg-white rounded-lg p-6 flex flex-col gap-6">
			<h3 className="text-xl font-bold mb-2 text-center">Quick Actions</h3>

			<div className="flex flex-col gap-4">
				<QuickAction
					icon={
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
						</svg>
					}
					title="Browse Templates"
					description="Explore test templates"
					onClick={() => navigate(paths.candidate.tests.TEMPLATES)}
				/>

				<QuickAction
					icon={
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
						</svg>
					}
					title="Create New Test"
					description="Generate a custom test"
					onClick={() => navigate(paths.candidate.tests.GENERATE)}
				/>

				<QuickAction
					icon={
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
							<path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
						</svg>
					}
					title="Test History"
					description="View past attempts"
					onClick={() => navigate(paths.candidate.tests._layout)}
				/>
			</div>

			<div className="mt-4 border-t border-primary-toned-200 pt-4">
				<div className="bg-primary-toned-100 rounded-lg p-4">
					<h4 className="font-semibold text-primary-toned-700 mb-2">Need Help?</h4>
					<p className="text-sm text-primary-toned-600 mb-3">Learn how to effectively use test templates and get the most out of your practice sessions.</p>
					<a href="#" className="text-primary text-sm font-semibold flex items-center">
						View Guide
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
};

export default SidebarActions;