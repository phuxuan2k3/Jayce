import { ReactNode, useEffect, useState } from "react";
import { CSSProperties } from "react";
import { cn } from "../../../app/cn";

type Tab = {
	id: string;
	label: string;
	content: ReactNode;
};

type TabsComponentProps = {
	tabs: Tab[];
	activeTabIdInject?: string;
	defaultTabId?: string;
	tabClassName?: string;
	className?: string;
};

// Local styles for animations
const tabStyles = {
	slideLeftAnimation: {
		animation: "slideLeft 0.3s ease-out forwards",
	},
	slideRightAnimation: {
		animation: "slideRight 0.3s ease-out forwards",
	},
	// Keyframes cannot be defined directly in inline styles,
	// so we'll inject a style element for the animations
};

const MyTabs = ({ tabs, activeTabIdInject, defaultTabId, className = '', tabClassName = '' }: TabsComponentProps) => {
	const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
	const [prevTabId, setPrevTabId] = useState(defaultTabId || tabs[0]?.id);

	useEffect(() => {
		if (
			activeTabIdInject != null &&
			tabs.some((tab) => tab.id === activeTabIdInject)
		) {
			setActiveTabId(activeTabIdInject);
		}
	}, [activeTabIdInject]);

	const handleTabClick = (tabId: string) => {
		if (tabId !== activeTabId) {
			setPrevTabId(activeTabId);
			setActiveTabId(tabId);
		}
	};

	// Find the active tab
	const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

	// Determine slide direction based on tab index
	const getSlideAnimation = (): CSSProperties => {
		const prevIndex = tabs.findIndex((tab) => tab.id === prevTabId);
		const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
		return prevIndex > currentIndex
			? tabStyles.slideRightAnimation
			: tabStyles.slideLeftAnimation;
	};

	return (
		<>
			{/* Inject CSS animation keyframes */}
			<style>
				{`
          @keyframes slideLeft {
            0% { transform: translateX(15px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideRight {
            0% { transform: translateX(-15px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}
			</style>

			<div className={cn("flex flex-col gap-4", className)}>
				{/* Tab Navigation */}
				<div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
					<nav className="flex -mb-px">
						{tabs.map((tab, index) => (
							<button
								key={tab.id}
								className={`
                  py-3 px-8 text-center font-medium text-sm relative
                  transition-all duration-300 ease-in-out
                  ${index === 0 ? "rounded-tl-lg" : ""}
                  ${index === tabs.length - 1 ? "rounded-tr-lg" : ""}
                  ${activeTabId === tab.id
										? "text-primary bg-white shadow-sm"
										: "border-transparent text-gray-500 hover:text-primary-toned-700 hover:bg-gray-50"
									}`}
								onClick={() => handleTabClick(tab.id)}
							>
								<span
									className={`relative z-10 transition-all duration-300 ${activeTabId === tab.id
										? "font-semibold"
										: ""
										}`}
								>
									{tab.label}
								</span>

								{/* Active Tab Indicator */}
								{activeTabId === tab.id && (
									<>
										{/* Gradient background for active tab */}
										<span className="absolute inset-0 bg-gradient-to-br from-white to-primary-toned-50 opacity-50 rounded-t-lg"></span>

										{/* Gradient underline for active tab */}
										<span
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-1"
											style={{
												"--primary-color": "#2e808a",
												"--secondary-color": "#c1654d",
											} as React.CSSProperties}
										></span>

										{/* Animated dot indicator */}
										<span
											className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
										></span>
									</>
								)}
							</button>
						))}
					</nav>
				</div>

				{/* Tab Content with Animation */}
				<div key={activeTabId} style={getSlideAnimation()} className={cn("py-2 overflow-hidden", tabClassName)}>
					{activeTab?.content}
				</div>
			</div>
		</>
	);
};

export default MyTabs;