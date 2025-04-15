import React from "react";
import UserProfile from "./UserInfo";
import { useAppSelector } from '../../../../app/hooks';
import { authSelectors } from '../../../../features/auth/store/authSlice';
import { EditAbleUserInfo } from "../../../../features/auth/types/profile";
import Interviews from "./Activities/Interviews";
import Scenarios from "./Activities/Scenarios";
import Tests from "./Activities/Tests";

const ProfilePage = () => {
	const [activeTab, setActiveTab] = React.useState<"Interviews" | "Scenarios" | "Tests">("Interviews");
	const authData = useAppSelector(authSelectors.selectUserInfo);
	console.log("Auth data", authData);
	const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 });

	const interviewsRef = React.useRef(null);
	const scenariosRef = React.useRef(null);
	const testsRef = React.useRef(null);

	const toggleActiveTab = (tab: "Interviews" | "Scenarios" | "Tests") => {
		setActiveTab(tab);
	};

	const updateProfile = (newUserInfo: EditAbleUserInfo) => {
		console.log("Update profile", newUserInfo);
	};

	const uploadResume = (resume: File | null) => {
		console.log("Upload resume", resume);
	};

	React.useEffect(() => {
		const tabMap = {
			Interviews: interviewsRef,
			Scenarios: scenariosRef,
			Tests: testsRef,
		};

		const ref = tabMap[activeTab];
		if (ref.current) {
			const { offsetLeft, offsetWidth } = ref.current;
			setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
		}
	}, [activeTab]);

	return (
		<div className="flex p-4 min-h-screen">
			<UserProfile
				userInfo={authData}
				updateProfile={updateProfile}
				uploadResume={uploadResume}
			/>
			
			<div className="w-3/4 p-4 pl-10">
				<div className="relative flex border-b-gradient text-lg mb-4">
					<button
						ref={interviewsRef}
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Interviews" ? "text-teal-600" : "text-gray-500"
							}`}
						onClick={() => toggleActiveTab("Interviews")}
					>
						Interviews
					</button>

					<button
						ref={scenariosRef}
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Scenarios" ? "text-teal-600" : "text-gray-500"
							}`}
						onClick={() => toggleActiveTab("Scenarios")}
					>
						Scenarios
					</button>

					<button
						ref={testsRef}
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Tests" ? "text-teal-600" : "text-gray-500"
							}`}
						onClick={() => toggleActiveTab("Tests")}
					>
						Tests
					</button>

					<div
						className="absolute bottom-0 h-1 bg-teal-500 transition-all duration-300"
						style={{
							left: indicatorStyle.left,
							width: indicatorStyle.width,
						}}
					/>
				</div>

				{activeTab === "Interviews" && <Interviews />}

				{activeTab === "Scenarios" && <Scenarios />}

				{activeTab === "Tests" && <Tests />}
			</div>
		</div>
	);
};

export default ProfilePage;