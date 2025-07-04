import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import QuickAction from "./QuickAction";
import paths from "../../../../../router/paths";
import { ArrowRight, BrainCircuit, ClipboardList, Rocket } from "lucide-react";
import { cn } from "../../../../../app/cn";

type SidebarActionsContextType = {};

const SidebarActionsContext = createContext<
	SidebarActionsContextType | undefined
>(undefined);

type SidebarActionsProps = {
	children?: ReactNode;
	title?: string;
	bottomSection?: ReactNode;
	topSection?: ReactNode;
	className?: string;
};

const SidebarActions = ({
	className = '',
	children,
	title,
	bottomSection,
	topSection = undefined,
}: SidebarActionsProps) => {
	return (
		<SidebarActionsContext.Provider value={{}}>
			<div className={cn("sticky top-2 max-h-[96vh] h-full shadow-primary bg-white rounded-lg p-6 flex flex-col gap-6", className)}>
				{title && <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>}

				{topSection}

				{/* Quick Actions */}
				<div className="flex flex-col gap-4">{children}</div>

				{bottomSection}
			</div>
		</SidebarActionsContext.Provider>
	);
};

SidebarActions.BrowseTemplates = () => {
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
				</svg>
			}
			title="Browse Templates"
			description="Explore test templates"
			onClick={() => navigate(paths.candidate.tests.TEMPLATES)}
		/>
	);
};

SidebarActions.GenerateTest = () => {
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clipRule="evenodd"
					/>
				</svg>
			}
			title="Create New Test"
			description="Generate a custom test"
			onClick={() => navigate(paths.candidate.tests.GENERATE)}
		/>
	);
};

SidebarActions.GenerateTestPremium = () => {
	const navigate = useNavigate();
	return (
		<div className="relative group">
			{/* Introduction Section */}
			<div className="p-4 bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border border-primary-toned-200 rounded-lg">
				<h4 className="font-bold text-primary-toned-700 mb-2 flex items-center">
					<BrainCircuit className="w-4 h-4 mr-2" />
					AI-Powered Test Generation
				</h4>
				<p className="text-sm text-primary-toned-600 leading-relaxed mb-4">
					Transform your learning with intelligent test creation. Our advanced AI analyzes your needs and generates personalized practice tests that adapt to your skill level and learning goals.
				</p>

				{/* Compact Button */}
				<button
					onClick={() => navigate(paths.candidate.tests.GENERATE)}
					className="w-full relative overflow-hidden bg-gradient-to-r from-primary-toned-500 to-secondary-toned-500 hover:from-primary-toned-600 hover:to-secondary-toned-600 text-white rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group"
				>
					{/* Animated Background Effect */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

					{/* Content Container */}
					<div className="relative z-10 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Rocket className="w-5 h-5 text-white" />
							<div className="text-left">
								<span className="font-semibold text-white">Generate Practice</span>
							</div>
						</div>

						{/* Arrow Icon */}
						<div className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
							<ArrowRight className="w-5 h-5" />
						</div>
					</div>
				</button>
			</div>
		</div>
	);
};

SidebarActions.YourTests = () => {
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
					<path
						fillRule="evenodd"
						d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
						clipRule="evenodd"
					/>
				</svg>
			}
			title="Your Tests"
			description="View your generated tests"
			onClick={() => navigate(paths.candidate.tests.ROOT)}
		/>
	);
};

SidebarActions.ReturnToTests = () => {
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
						clipRule="evenodd"
					/>
				</svg>
			}
			title="Return to Tests"
			description="Go back to tests dashboard"
			onClick={() => navigate(paths.candidate.tests.ROOT)}
		/>
	);
};

SidebarActions.JoinExam = () => {
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={
				<ClipboardList className="w-5 h-5" />
			}
			title="Join Exam"
			description="Join an ongoing exam by room ID"
			onClick={() => navigate(paths.candidate.tests.JOIN)}
		/>
	);
};

SidebarActions.CreateNewTemplate = ({
	onCreateNewTemplate = () => { },
}: {
	onCreateNewTemplate?: () => void;
}) => {
	return (
		<QuickAction
			icon={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clipRule="evenodd"
					/>
				</svg>
			}
			title="Create New Template"
			description="Generate a new test template"
			onClick={onCreateNewTemplate}
		/>
	);
};

export const HelpBottomSection = () => {
	return (
		<div className="mt-4 border-t border-primary-toned-200 pt-4">
			<div className="bg-primary-toned-100 rounded-lg p-4">
				<h4 className="font-semibold text-primary-toned-700 mb-2">
					Need Help?
				</h4>
				<p className="text-sm text-primary-toned-600 mb-3">
					Learn how to effectively use test templates and get the most out of
					your practice sessions.
				</p>
				<a
					href="#"
					className="text-primary text-sm font-semibold flex items-center"
				>
					View Guide
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 ml-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default SidebarActions;
