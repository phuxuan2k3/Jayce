import CheckIcon from '@mui/icons-material/Check';
import { useSetPremiumMutation, useGetBalanceMutation } from '../../../../features/auth/api/logout.api';
import React from 'react';

const PricingPage = () => {
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
            setError("Failed to process your request. Please try again later.");
        } finally {
            setIsLoading(false);
            if (!error) {
                setSuccess("Your premium membership has been successfully activated!");
                setTimeout(() => {
                    setSuccess(null);
                }, 5000);
            }
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center">Unlock the full member experience</h1>
            <p className="text-gray-600 text-center mb-6">Get access to all courses, video answers, peer mock interviews, and more.</p>

            {balance?.is_premium && (
                <p className="text-center text-sm text-primary font-medium mb-4">
                    You are currently a premium member. Your access expires on{' '}
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
                    <h2 className="text-lg font-semibold text-center text-primary">Monthly</h2>
                    <ul className="mt-4 text-gray-700 space-y-2">
                        <li><CheckIcon className="mr-4" /> Access to all courses</li>
                        <li><CheckIcon className="mr-4" /> Expert video answers</li>
                        <li><CheckIcon className="mr-4" /> Questions database</li>
                        <li><CheckIcon className="mr-4" /> Peer mock interviews</li>
                        <li><CheckIcon className="mr-4" /> 250+ hrs course content</li>
                        <li><CheckIcon className="mr-4" /> Priority job referrals</li>
                    </ul>
                    <div className="w-full flex items-center justify-around mt-2">
                        <p className="text-orange-500 text-xl font-semibold text-center mt-4">120 SSC/month</p>
                        <button className="w-1/2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => handleSetPremium(1)}>
                            {isLoading ? "Processing..." : balance?.is_premium ? "Extend" : "Start now"}
                        </button>
                    </div>
                </div>

                <div className="bg-[#eaf6f8] p-6 rounded-lg w-2/5 shadow-md">
                    <h2 className="text-lg font-semibold text-center text-primary">Annual</h2>
                    <ul className="mt-4 text-gray-700 space-y-2">
                        <li><CheckIcon className="mr-4" /> Access to all courses</li>
                        <li><CheckIcon className="mr-4" /> Expert video answers</li>
                        <li><CheckIcon className="mr-4" /> Questions database</li>
                        <li><CheckIcon className="mr-4" /> Peer mock interviews</li>
                        <li><CheckIcon className="mr-4" /> 250+ hrs course content</li>
                        <li><CheckIcon className="mr-4" /> Priority job referrals</li>
                    </ul>
                    <div className="w-full flex items-center justify-around mt-2">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-gray-400 text-sm text-center line-through">120 SSC/month</p>
                            <p className="text-orange-500 text-xl font-semibold text-center">110 SSC/month</p>
                        </div>
                        <button className="w-1/2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => handleSetPremium(2)}>
                            {isLoading ? "Processing..." : balance?.is_premium ? "Extend" : "Start now"}
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-center mt-8">What comes with my plan?</h2>
            <div className="flex justify-center gap-16 mt-4 text-primary">
                <div className="border-2 border-primary p-4 rounded-lg text-center w-1/3">
                    Look for a total of 400+ interview lessons, questions, and complete answers with video walkthroughs.
                </div>
                <div className="border-2 border-primary p-4 rounded-lg text-center w-1/3">
                    All plans include all of our courses: PM, Engineering Management, TPM, Data Science, SWE, and more.
                </div>
                <div className="border-2 border-primary p-4 rounded-lg text-center w-1/3">
                    Get access to 200+ hours of real interview videos, where we analyze what went right or wrong.
                </div>
            </div>
        </div>
    );
};

export default PricingPage;