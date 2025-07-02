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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import clsx from 'clsx';
import OrderHistoryDialog from './OrderHistoryDialog';
import { useGetBalanceMutation } from '../../../../features/auth/api/logout.api';
import { useCreatePaymentLinkMutation } from '../../../../features/payment/api/payment.api';
import PublicProfile from "./Tabs/PublicProfile";
import Account from "./Tabs/Account";
import ThemePreferences from "./Tabs/ThemePreferences";
import Notifications from "./Tabs/Notifications";
import { Role } from "../../../../features/auth/types/auth";
import paths from "../../../../router/paths";
import TransactionHistoryDialog from "./TransactionHistoryDialog";
import { useLanguage } from "../../../../LanguageProvider";

const sscOptions = [
    { ssc: 60, vnd: 60000 },
    { ssc: 120, vnd: 120000 },
    { ssc: 180, vnd: 170000 },
    { ssc: 240, vnd: 220000 },
    { ssc: 1440, vnd: 1200000 },
];

const Settings = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = React.useState<'Public profile' | 'Account' | 'Theme preferences' | 'Notifications'>('Public profile');

    const authData = useAppSelector(authSelectors.selectUserInfo);
    console.log("Auth data", authData);

    if (!authData) {
        return <div>{t("settings_user_loading")}</div>;
    }

    const handleGoToPricing = () => {
        if (authData) {
            if (authData.role === Role.Candidate) {
                navigate(paths.candidate.profile.PRICING);
            }
            else if (authData.role === Role.Manager) {
                navigate(paths.manager.profile.PRICING);
            }
            else {
                alert("???");
            }
        }
    }

    const [openTopup, setOpenTopup] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
    const [openOrderDialog, setOpenOrderDialog] = React.useState(false);
    const [openTransactionDialog, setOpenTransactionDialog] = React.useState(false);
    const [isCreating, setCreating] = React.useState(false);
    const [creatingError, setCreatingError] = React.useState<string | null>(null);
    const [authBalance, setAuthBalance] = React.useState<{ balance: number; is_premium: boolean; premium_expires: string } | null>(null);
    const [getBalance] = useGetBalanceMutation();
    const [createPaymentLink] = useCreatePaymentLinkMutation();

    const fetchBalance = async () => {
        try {
            const response = await getBalance().unwrap();
            setAuthBalance(response);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        }
    };

    React.useEffect(() => {
        if (authData) fetchBalance();
    }, []);

    const handleConfirmTopup = async () => {
        if (isCreating || selectedOption === null) return;
        setCreating(true);
        setCreatingError(null);
        try {
            const chosen = sscOptions[selectedOption];
            const item = {
                name: "Top-up SSC",
                quantity: 1,
                price: chosen.vnd,
            };

            const response = await createPaymentLink({
                description: "Top-up SSC",
                items: [item],
                buyerName: authData.metadata.fullname || authData.username,
                buyerEmail: authData.email,
                buyerAddress: authData.metadata.country || "Unknown",
                buyerPhone: authData.metadata.phone || "Unknown",
            });

            if (response.error) {
                setCreatingError(t("settings_topup_failed"));
                return;
            }

            window.open(response.data.checkoutUrl, "_blank");
        } catch (error) {
            setCreatingError(t("settings_topup_failed"));
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col gap-4 pl-4 pr-4 pt-8 pb-8 lg:pl-12 lg:pr-12">
                <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:h-20">
                    <div className="flex items-center justify-center gap-4 w-full lg:w-[18%] lg:justify-start">
                        <div className="relative flex-shrink-0 w-20 h-20">
                            <img
                                src={authData.metadata.avatarPath || "/svg/default-avatar.png"}
                                alt="Avatar"
                                className="w-full h-full rounded-full object-cover"
                            />
                            {authBalance?.is_premium && (
                                <div className="absolute -top-1 -right-5 bg-yellow-400 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow">
                                    {t("settings_balance_premium_label")}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-center">
                            <h2 className="font-bold text-lg">{authData.metadata.fullname}</h2>
                            <p className="opacity-70">@{authData.username}</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[80%] flex flex-col gap-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-end gap-4">
                            <div className="flex flex-col w-full lg:max-w-[300px]">
                                <p className="text-sm text-gray-600">{t("settings_balance_title")}</p>
                                <div className="mt-2 flex items-center justify-between px-5 py-3 bg-white border rounded-xl shadow-md text-[26px] font-bold text-[var(--primary-color)]">
                                    <div className="flex items-center justify-center gap-2">
                                        <AddCircleOutlineIcon
                                            onClick={() => setOpenTopup(true)}
                                            className="mr-1 cursor-pointer text-gray-500 hover:text-primary transition-transform duration-200"
                                        />
                                        <span>{authBalance?.balance.toLocaleString() || 0}</span>
                                    </div>

                                    <AutorenewIcon
                                        onClick={fetchBalance}
                                        className="cursor-pointer text-gray-500 hover:text-[var(--primary-color)] transition-transform duration-300 hover:rotate-180"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
                                <button
                                    onClick={() => setOpenOrderDialog(true)}
                                    className="w-full lg:w-auto px-4 py-2 border border-primary font-bold text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                                >
                                    {t("settings_balance_topup_history")}
                                </button>
                                <button
                                    onClick={() => setOpenTransactionDialog(true)}
                                    className="w-full lg:w-auto px-4 py-2 border border-primary font-bold text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                                >
                                    {t("settings_balance_transaction_history")}
                                </button>
                            </div>
                        </div>
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
                                <PersonOutlineIcon className="h-6 w-6 mr-1" /> {t("settings_tab_public_profile")}
                            </div>

                            <div
                                onClick={() => setSelectedTab('Account')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Account'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <SettingsOutlinedIcon className="h-6 w-6 mr-1" /> {t("settings_tab_account")}
                            </div>

                            <div
                                onClick={() => setSelectedTab('Theme preferences')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Theme preferences'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <PaletteOutlinedIcon className="h-6 w-6 mr-1" /> {t("settings_tab_theme_preferences")}
                            </div>

                            <div
                                onClick={() => setSelectedTab('Notifications')}
                                className={`flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start ${selectedTab === 'Notifications'
                                    ? 'bg-primary-toned-50 font-semibold text-primary opacity-100'
                                    : 'hover:bg-primary-toned-50 opacity-50'
                                    }`}
                            >
                                <NotificationsOutlinedIcon className="h-6 w-6 mr-1" /> {t("settings_tab_notifications")}
                            </div>

                            <div
                                onClick={() => handleGoToPricing()}
                                className="flex-shrink-0 p-2 rounded cursor-pointer text-center lg:text-start"
                            >
                                <SubtitlesOutlinedIcon className="h-6 w-6 mr-1 opacity-50" /> <span className="opacity-50">{t("settings_tab_billing")}</span> <OpenInNewOutlinedIcon className="text-primary h-4 w-4 ml-1" />
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
            <Dialog open={openTopup} onClose={() => setOpenTopup(false)} maxWidth="sm" fullWidth>
                <DialogTitle className="text-center font-bold text-xl">{t("settings_topup_title")}</DialogTitle>
                <DialogContent className="flex flex-wrap gap-4 justify-center py-6">
                    {sscOptions.map((opt, index) => {
                        const isSelected = selectedOption === index;
                        const isLast = index === sscOptions.length - 1;

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                className={clsx(
                                    "relative cursor-pointer border rounded-2xl px-6 py-3 text-center w-[240px] transition",
                                    isSelected
                                        ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-[var(--primary-color)]"
                                )}
                            >
                                {isLast && (
                                    <div className="absolute top-[-10px] right-[-10px] bg-yellow-400 text-[var(--primary-color)] text-xs font-bold px-2 py-1 rounded-full shadow">
                                        {t("settings_topup_best_value")}
                                    </div>
                                )}
                                <div className="text-xl font-semibold">{opt.ssc.toLocaleString()} SSC</div>
                                <div className={clsx("text-sm", isSelected ? "text-white/80" : "text-gray-700")}>
                                    {opt.vnd.toLocaleString()} VND
                                </div>
                            </div>
                        );
                    })}
                </DialogContent>
                {creatingError && <div className="text-center text-red-500 mb-4">{creatingError}</div>}
                <DialogActions className="flex items-center justify-between px-6 pb-6">
                    <button
                        onClick={() => setOpenTopup(false)}
                        className="w-1/2 px-4 py-2 border border-[var(--primary-color)] font-bold text-[var(--primary-color)] rounded-lg"
                    >
                        {t("settings_topup_cancel")}
                    </button>
                    <button
                        onClick={handleConfirmTopup}
                        disabled={selectedOption === null || isCreating}
                        className={clsx(
                            "w-1/2 px-4 py-2 font-bold rounded-lg ml-4",
                            selectedOption === null ? "bg-gray-300 text-white cursor-not-allowed" : "bg-[var(--primary-color)] text-white"
                        )}
                    >
                        {isCreating ? t("settings_topup_processing") : t("settings_topup_confirm")}
                    </button>
                </DialogActions>
            </Dialog>

            <OrderHistoryDialog open={openOrderDialog} onClose={() => setOpenOrderDialog(false)} />
            <TransactionHistoryDialog open={openTransactionDialog} onClose={() => setOpenTransactionDialog(false)} />
        </>
    );
};

export default Settings;