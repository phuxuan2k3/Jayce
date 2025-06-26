import React from "react";
import UserProfile from "./UserInfo";
import { useAppSelector } from '../../../../app/hooks';
import { authSelectors } from '../../../../features/auth/store/authSlice';

const ProfilePage = () => {
	const [activeTab, setActiveTab] = React.useState<"Interviews" | "Tests">("Tests");
	const authData = useAppSelector(authSelectors.selectUserInfo);
	console.log("Auth data", authData);
	const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 });

	const interviewsRef = React.useRef(null);
	// const scenariosRef = React.useRef(null);
	const testsRef = React.useRef(null);

	const toggleActiveTab = (tab: "Interviews" | "Tests") => {
		setActiveTab(tab);
	};

	if (!authData) {
		return <div>Loading...</div>;
	}

	React.useEffect(() => {
		const tabMap = {
			Interviews: interviewsRef,
			// Scenarios: scenariosRef,
			Tests: testsRef,
		};

		const ref = tabMap[activeTab];
		if (ref.current) {
			const { offsetLeft, offsetWidth } = ref.current;
			setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
		}
	}, [activeTab]);

	return (
		<div className="flex flex-col md:flex-row p-4 min-h-screen gap-4">
			<UserProfile userInfo={authData} />

			<div className="w-full md:w-3/4 p-4 md:pl-10">
				<div className="relative flex border-b-gradient text-lg mb-4 z-0">
					<button
						ref={testsRef}
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Tests" ? "text-teal-600" : "text-gray-500"
							}`}
						onClick={() => toggleActiveTab("Tests")}
					>
						Tests
					</button>

					<button
						ref={interviewsRef}
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Interviews" ? "text-teal-600" : "text-gray-500"
							}`}
						onClick={() => toggleActiveTab("Interviews")}
					>
						Interviews
					</button>

					{/* <button
						ref={scenariosRef}
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Scenarios" ? "text-teal-600" : "text-gray-500"
							}`}
						onClick={() => toggleActiveTab("Scenarios")}
					>
						Scenarios
					</button> */}

					<div
						className="absolute bottom-0 h-1 bg-teal-500 transition-all duration-300"
						style={{
							left: indicatorStyle.left,
							width: indicatorStyle.width,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;