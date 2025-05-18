import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";

interface PublicProfileProps {
    authData: UserInfo;
}

const Notifications: React.FC<PublicProfileProps> = ({ authData }) => {
    const [importantAnnouncements, setImportantAnnouncements] = React.useState<boolean>(true);
    const [featureAnnouncements, setFeatureAnnouncements] = React.useState<boolean>(true);
    const [assessmentAnnouncements, setAssessmentAnnouncements] = React.useState<boolean>(true);

    console.log("Auth data", authData);

    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">Basic Info</h2>
                <table className="w-full mb-8">
                    <tbody>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Default Email</td>
                            <td className="w-[70%] p-2 opacity-70">{authData.email || "No info"}</td>
                            <td className="w-[10%] text-end"></td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Important Announcements</td>
                            <td className="w-[70%] p-2">
                                <input
                                    type="checkbox"
                                    checked={importantAnnouncements}
                                    onChange={() => setImportantAnnouncements(!importantAnnouncements)}
                                    className="h-4 w-4 border-primary mt-1 focus:ring-primary accent-primary cursor-pointer"
                                />
                            </td>
                            <td className="w-[10%] text-end"></td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Feature Announcements</td>
                            <td className="w-[70%] p-2">
                                <input
                                    type="checkbox"
                                    checked={featureAnnouncements}
                                    onChange={() => setFeatureAnnouncements(!featureAnnouncements)}
                                    className="h-4 w-4 border-primary mt-1 focus:ring-primary accent-primary cursor-pointer"
                                />
                            </td>
                            <td className="w-[10%] text-end"></td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Assessment Announcements</td>
                            <td className="w-[70%] p-2">
                                <input
                                    type="checkbox"
                                    checked={assessmentAnnouncements}
                                    onChange={() => setAssessmentAnnouncements(!assessmentAnnouncements)}
                                    className="h-4 w-4 border-primary mt-1 focus:ring-primary accent-primary cursor-pointer"
                                />
                            </td>
                            <td className="w-[10%] text-end"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Notifications;