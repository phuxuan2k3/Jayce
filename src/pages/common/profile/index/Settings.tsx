import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../../app/hooks';
import { authSelectors } from '../../../../features/auth/store/authSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import PublicProfile from "./Tabs/PublicProfile";
import Account from "./Tabs/Account";
import ThemePreferences from "./Tabs/ThemePreferences";
import Notifications from "./Tabs/Notifications";
import { Role } from "../../../../features/auth/types/auth";
import paths from "../../../../router/paths";

const Settings = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = React.useState<'Public profile' | 'Account' | 'Theme preferences' | 'Notifications'>('Public profile');

    const authData = useAppSelector(authSelectors.selectUserInfo);
    console.log("Auth data", authData);

    const handleGoToProfile = () => {
        if (authData) {
            if (authData.role === Role.Candidate) {
                navigate(paths.candidate.profile._layout);
            }
            else if (authData.role === Role.Manager) {
                navigate(paths.manager.profile._layout);
            }
            else {
                alert("???");
            }
        }
    }

    if (!authData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4 pl-4 pr-4 pt-8 pb-8 lg:pl-12 lg:pr-12">
                <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:h-20">
                    <div className="flex items-center justify-center gap-4 w-full lg:w-[18%] lg:justify-start">
                        <img
                            src={authData.metadata.avatarPath || "/svg/default-avatar.png"}
                            alt="Avatar"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex flex-col justify-center">
                            <h2 className="font-bold text-lg">{authData.metadata.fullname}</h2>
                            <p className="opacity-70">@{authData.username}</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[80%] flex justify-center lg:justify-start items-center">
                        <button
                            className="px-4 py-2 border border-primary font-bold text-primary rounded hover:text-white hover:bg-primary transition duration-300"
                            onClick={() => handleGoToProfile()}
                        >
                            Go to your personal profile
                        </button>
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-[18%]">
                        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto">
                            <div
                                onClick={() => setSelectedTab('Public profile')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Public profile'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <PersonOutlineIcon className="h-6 w-6 mr-1" /> Public profile
                            </div>

                            <div
                                onClick={() => setSelectedTab('Account')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Account'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <SettingsOutlinedIcon className="h-6 w-6 mr-1" /> Account
                            </div>

                            <div
                                onClick={() => setSelectedTab('Theme preferences')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Theme preferences'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <PaletteOutlinedIcon className="h-6 w-6 mr-1" /> Theme preferences
                            </div>

                            <div
                                onClick={() => setSelectedTab('Notifications')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Notifications'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <NotificationsOutlinedIcon className="h-6 w-6 mr-1" /> Notifications
                            </div>

                            <div
                                onClick={() => null}
                                className="flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start"
                            >
                                <SubtitlesOutlinedIcon className="h-6 w-6 mr-1 opacity-50" /> <span className="opacity-50">Billing</span> <OpenInNewOutlinedIcon className="text-primary h-4 w-4 ml-1" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[80%]">
                        {selectedTab === 'Public profile' && <PublicProfile authData={authData} />}
                        {selectedTab === 'Account' && <Account authData={authData} />}
                        {selectedTab === 'Theme preferences' && <ThemePreferences />}
                        {selectedTab === 'Notifications' && <Notifications authData={authData} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;