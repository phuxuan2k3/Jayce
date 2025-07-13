import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import QuickAction from "./QuickAction";
import paths from "../../../../../router/paths";
import { cn } from "../../../../../app/cn";
import { useLanguage } from "../../../../../LanguageProvider";

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

SidebarActions.GenerateTest = () => {
	const { t } = useLanguage();

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
			title={t("sidebar_actions_create_test_title")}
			description={t("sidebar_actions_create_test_description")}
			onClick={() => navigate(paths.candidate.tests.GENERATE)}
		/>
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

SidebarActions.CreateNewTemplate = ({
	onCreateNewTemplate = () => { },
}: {
	onCreateNewTemplate?: () => void;
}) => {
	const { t } = useLanguage();

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
			title={t("sidebar_actions_create_template_title")}
			description={t("sidebar_actions_create_template_description")}
			onClick={onCreateNewTemplate}
		/>
	);
};

export const HelpBottomSection = () => {
	const { t } = useLanguage();

	return (
		<div className="mt-4 border-t border-primary-toned-200 pt-4">
			<div className="bg-primary-toned-100 rounded-lg p-4">
				<h4 className="font-semibold text-primary-toned-700 mb-2">
					{t("sidebar_help_title")}
				</h4>
				<p className="text-sm text-primary-toned-600 mb-3">
					{t("sidebar_help_description")}
				</p>
				<a
					href="#"
					className="text-primary text-sm font-semibold flex items-center"
				>
					{t("sidebar_help_link")}
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
