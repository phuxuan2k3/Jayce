import * as React from 'react';
import Interviews from './Interviews';
import Scenarios from './Scenarios';
import Tests from './Tests';


const availableTabs = ["Interviews", "Scenarios", "Tests"];

const Activities = () => {
	const [selectedTab, setSelectedTab] = React.useState<"Interviews" | "Scenarios" | "Tests">("Interviews");

	return (
		<div className="flex h-screen">
			<div className="w-1/6 mt-4 border-r-gradient">
				<ul className="space-y-4">
					{availableTabs.map((tab) => (
						<li
							key={tab}
							className={`cursor-pointer text-lg p-2 rounded-md ${selectedTab === tab ? "font-bold" : "text-gray-500"}`}
							onClick={() => setSelectedTab(tab as "Interviews" | "Scenarios" | "Tests")}
						>
							{tab}
						</li>
					))}
				</ul>
			</div>

			<div className="w-5/6 p-6">
				{selectedTab === "Interviews" && <Interviews />}

				{selectedTab === "Scenarios" && <Scenarios />}

				{selectedTab === "Tests" && <Tests />}
			</div>
		</div>
	);
}

export default Activities