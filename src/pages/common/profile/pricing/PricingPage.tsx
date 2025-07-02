import CheckIcon from '@mui/icons-material/Check';
import { useSetPremiumMutation, useGetBalanceMutation } from '../../../../features/auth/api/logout.api';
import React from 'react';
import { useLanguage } from '../../../../LanguageProvider';

const PricingPage = () => {
    const { t } = useLanguage();
    const [success, setSuccess] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [setPremium] = useSetPremiumMutation();
    const [getBalance] = useGetBalanceMutation();
    const [balance, setBalance] = React.useState<{ balance: number; is_premium: boolean; premium_expires: string } | null>(null);

    const fetchBalance = async () => {
        try {
            const response = await getBalance().unwrap();
            setBalance(response);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        }
    };

    React.useEffect(() => {
        fetchBalance();
    }, []);

    const handleSetPremium = async (plan: 1 | 2) => {
        if (isLoading) return;
        setIsLoading(true);
        setSuccess(null);
        setError(null);
        try {
            const response = await setPremium({ plan }).unwrap();
            fetchBalance();
            console.log("Set premium response:", response);
        } catch (error) {
            console.error("Failed to set premium:", error);
            setError(t("pricing_error_generic"));
        } finally {
            setIsLoading(false);
            if (!error) {
                setSuccess(t("pricing_success_activation"));
                setTimeout(() => {
                    setSuccess(null);
                }, 5000);
            }
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center">{t("pricing_title")}</h1>
            <p className="text-gray-600 text-center mb-6">{t("pricing_description")}</p>

            {balance?.is_premium && (
                <p className="text-center text-sm text-primary font-medium mb-4">
                    {t("pricing_already_premium")}{' '}
                    <span className="font-semibold">{new Date(balance.premium_expires).toLocaleDateString()}</span>.
                </p>
            )}

            {success && (
                <div className="text-center text-green-500 mb-4">
                    {success}
                </div>
            )}
            {error && (
                <div className="text-center text-red-500 mb-4">
                    {error}
                </div>
            )}

            <div className="flex justify-center gap-32 mt-12">
                <div className="bg-[#eaf6f8] p-6 rounded-lg w-2/5 shadow-md">
                    <h2 className="text-lg font-semibold text-center text-primary">{t("pricing_monthly_label")}</h2>
                    <ul className="mt-4 text-gray-700 space-y-2">
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_access_courses")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_video_answers")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_questions_db")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_peer_mock")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_course_hours")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_referrals")}</li>
                    </ul>
                    <div className="w-full flex items-center justify-around mt-2">
                        <p className="text-orange-500 text-xl font-semibold text-center mt-4">{t("pricing_monthly_price")}</p>
                        <button className="w-1/2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => handleSetPremium(1)}>
                            {isLoading ? t("pricing_processing") : balance?.is_premium ? t("pricing_extend") : t("pricing_start_now")}
                        </button>
                    </div>
                </div>

                <div className="bg-[#eaf6f8] p-6 rounded-lg w-2/5 shadow-md">
                    <h2 className="text-lg font-semibold text-center text-primary">{t("pricing_annual_label")}</h2>
                    <ul className="mt-4 text-gray-700 space-y-2">
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_access_courses")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_video_answers")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_questions_db")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_peer_mock")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_course_hours")}</li>
                        <li><CheckIcon className="mr-4" /> {t("pricing_benefit_referrals")}</li>
                    </ul>
                    <div className="w-full flex items-center justify-around mt-2">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-gray-400 text-sm text-center line-through">{t("pricing_annual_price_regular")}</p>
                            <p className="text-orange-500 text-xl font-semibold text-center">{t("pricing_annual_price_discount")}</p>
                        </div>
                        <button className="w-1/2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => handleSetPremium(2)}>
                            {isLoading ? t("pricing_processing") : balance?.is_premium ? t("pricing_extend") : t("pricing_start_now")}
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-center mt-8">{t("pricing_plan_features_title")}</h2>
            <div className="flex justify-center gap-16 mt-4 text-primary">
                <div className="border-2 border-primary p-4 rounded-lg text-center w-1/3">
                    {t("pricing_feature_1")}
                </div>
                <div className="border-2 border-primary p-4 rounded-lg text-center w-1/3">
                    {t("pricing_feature_2")}
                </div>
                <div className="border-2 border-primary p-4 rounded-lg text-center w-1/3">
                    {t("pricing_feature_3")}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;