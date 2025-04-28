import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";

interface PublicProfileProps {
    authData: UserInfo;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ authData }) => {
    console.log("Auth data", authData);

    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">Basic Info</h2>
                <table className="w-full mb-8">
                    <tbody>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Name</td>
                            <td className="w-[70%] p-2 opacity-70">Bang</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Gender</td>
                            <td className="w-[70%] p-2 opacity-70">Male</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Location</td>
                            <td className="w-[70%] p-2 opacity-70">Vietnam, Quang Nam, Tam Ky</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Birthday</td>
                            <td className="w-[70%] p-2 opacity-70">March 14, 2003</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Summary</td>
                            <td className="w-[70%] p-2 opacity-70">Tell us about yourself</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Website</td>
                            <td className="w-[70%] p-2 opacity-70">Your blog, portfolio, etc.</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">LinkedIn</td>
                            <td className="w-[70%] p-2 opacity-70">Your LinkedIn username or URL</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2 className="text-xl font-bold mb-4">Experience</h2>
                <table className="w-full">
                    <tbody>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Work</td>
                            <td className="w-[70%] p-2 opacity-70">Add a workplace</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Education</td>
                            <td className="w-[70%] p-2 opacity-70">Add a school</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PublicProfile;