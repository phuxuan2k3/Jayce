import React from "react";
import UserProfile from "./UserInfo";
import Activities from "./Activities/Activities";
import Settings from "./Settings";
import { useAppSelector } from '../../../../app/hooks';
import { selectUserInfo, UserInfo } from '../../../../features/auth/store/authSlice';

const ProfilePage = () => {
	const [activeTab, setActiveTab] = React.useState<"Activities" | "Settings">("Activities");
	const authData = useAppSelector(selectUserInfo);

	const toggleActiveTab = (tab: "Activities" | "Settings") => {
		setActiveTab(tab);
	};

	const updateEmail = (email: string) => {
		console.log("Update email: ", email);
	};

	const updateProfile = (newUserInfo: UserInfo) => {
		console.log("Update profile", newUserInfo);
	};

	const uploadResume = (resume: File | null) => {
		console.log("Upload resume", resume);
	};

	return (
		<div className="flex p-4 min-h-screen">
			<UserProfile
				authData={authData}
				updateProfile={updateProfile}
				uploadResume={uploadResume}
			/>
			{/* <div className="w-3/4 p-4 pl-10">
                <div className="flex border-b-gradient text-lg">
                    <h2 className={`cursor-pointer ${activeTab === "Activities" ? "border-b-4 border-teal-500 pb-2 text-teal-600" : "text-gray-500"}`} onClick={() => toggleActiveTab("Activities")}>Activities</h2>
                    <h2 className={`ml-4 cursor-pointer ${activeTab === "Settings" ? "border-b-4 border-teal-500 pb-2 text-teal-600" : "text-gray-500"}`} onClick={() => toggleActiveTab("Settings")}>Settings</h2>
                </div>
                {activeTab === "Activities" ?
                    <Activities />
                    :
                    <Settings
                        authData={authData}
                        updateEmail={updateEmail}
                    />
                }
            </div> */}
			<div className="w-3/4 p-4 pl-10">
				<div className="relative flex border-b-gradient text-lg">
					<button
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Activities" ? "text-teal-600" : "text-gray-500"}`}
						onClick={() => toggleActiveTab("Activities")}
					>
						Activities
					</button>

					<button
						className={`relative px-4 pb-2 transition-all duration-300 ${activeTab === "Settings" ? "text-teal-600" : "text-gray-500"}`}
						onClick={() => toggleActiveTab("Settings")}
					>
						Settings
					</button>

					<div
						className={`absolute bottom-0 h-1 bg-teal-500 transition-all duration-300`}
						style={{
							width: "100px",
							left: activeTab === "Activities" ? "0px" : "100px",
						}}
					/>
				</div>

				{activeTab === "Activities" ? <Activities /> : <Settings authData={authData} updateEmail={updateEmail} />}
			</div>
		</div>
	);
};

export default ProfilePage;