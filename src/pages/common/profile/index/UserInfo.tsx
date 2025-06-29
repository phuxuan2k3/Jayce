import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { UserInfo } from '../../../../features/auth/store/authSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import clsx from 'clsx';
import { Role } from '../../../../features/auth/types/auth';
// import paths from '../../../../router/paths';
import OrderHistoryDialog from './OrderHistoryDialog';
import { useGetBalanceMutation } from '../../../../features/auth/api/logout.api';
import { useCreatePaymentLinkMutation } from '../../../../features/payment/api/payment.api';

interface UserProfileProps {
	userInfo: UserInfo;
}

const sscOptions = [
	{ ssc: 60, vnd: 60000 },
	{ ssc: 120, vnd: 120000 },
	{ ssc: 180, vnd: 170000 },
	{ ssc: 240, vnd: 220000 },
	{ ssc: 1440, vnd: 1200000 },
];

const UserProfile: React.FC<UserProfileProps> = ({ userInfo: authData }) => {
	// const navigate = useNavigate();
	const [openTopup, setOpenTopup] = React.useState(false);
	const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
	const [openOrderDialog, setOpenOrderDialog] = React.useState(false);
	const [isCreating, setCreating] = React.useState(false);
	const [creatingError, setCreatingError] = React.useState<string | null>(null);

	console.log("Auth data", authData);

	const handleOpenTopupDialog = () => setOpenTopup(true);
	const handleCloseTopupDialog = () => {
		setOpenTopup(false);
		setSelectedOption(null);
	};

	const [authBalance, setAuthBalance] = React.useState<{ balance: number; is_premium: boolean; premium_expires: string } | null>(null);
	const [getBalance] = useGetBalanceMutation();
	const fetchBalance = async () => {
		try {
			const response = await getBalance().unwrap();
			console.log("Fetched balance:", response);
			setAuthBalance(response);
		} catch (error) {
			console.error("Failed to fetch balance:", error);
		}
	};

	React.useEffect(() => {
		if (authData) {
			fetchBalance();
		}
	}, []);

	const [createPaymentLink] = useCreatePaymentLinkMutation();
	const handleConfirmTopup = async () => {
		if (isCreating) return;
		if (selectedOption !== null) {
			setCreating(true);
			setCreatingError(null);
			try {
				const chosen = sscOptions[selectedOption];
				console.log("Top-up with:", chosen);
				const item = {
					name: "Top-up SSC",
					quantity: 1,
					price: chosen.vnd,
				}
				console.log("Item to create payment link:", item);
				console.log("Request payload:", {
					description: "Top-up SSC",
					items: [item],
					buyerName: authData.metadata.fullname ? authData.metadata.fullname : authData.username,
					buyerEmail: authData.email,
					buyerAddress: authData.metadata.country ? authData.metadata.country : "Unknown",
					buyerPhone: authData.metadata.phone ? authData.metadata.phone : "Unknown",
				});
				const response = await createPaymentLink({
					description: "Top-up SSC",
					items: [item],
					buyerName: authData.metadata.fullname ? authData.metadata.fullname : authData.username,
					buyerEmail: authData.email,
					buyerAddress: authData.metadata.country ? authData.metadata.country : "Unknown",
					buyerPhone: authData.metadata.phone ? authData.metadata.phone : "Unknown",
				});

				if (response.error) {
					setCreatingError("Failed to create payment link. Please try again later.");
					console.error("Error creating payment link:", response.error);
					return;
				}

				window.open(response.data.checkoutUrl, "_blank");
			} catch (error) {
				setCreatingError("Failed to create payment link. Please try again later.");
			} finally {
				setCreating(false);
			}
		}
	};

	const handleGoToSettings = () => {
		if (authData) {
			if (authData.role === Role.Candidate) {
				// navigate(paths.candidate.profile.SETTINGS);
			}
			else if (authData.role === Role.Manager) {
				// navigate(paths.manager.profile.SETTINGS);
			}
			else {
				alert("???");
			}
		}
	}

	return (
		<>
			<div className="w-full md:w-1/4">
				<div className="bg-primary-toned-50 rounded-lg p-4">
					<div className="flex flex-col">
						<div className="flex items-center justify-start">
							<div className="relative w-20 h-20 mb-2">
								<img
									className="w-full h-full bg-gray-300 rounded-full"
									src={authData.metadata.avatarPath}
									alt={authData.username}
								/>
								{authBalance?.is_premium && (
									<div className="absolute -top-1 -right-8 bg-yellow-400 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow">
										PREMIUM
									</div>
								)}
							</div>
							<div className="flex flex-col ml-4">
								<h2 className="text-lg font-semibold">{authData.metadata.fullname}</h2>
								<p className="text-sm text-gray-500">@{authData.username}</p>
							</div>
						</div>
						<button className="mt-2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => handleGoToSettings()}>
							Edit Profile
						</button>
						<div className="flex flex-col text-gray-500 mt-4 gap-2">
							<div className="flex items-center">
								<MailOutlineIcon className="h-4 w-4 mr-2" />
								<span>{authData.email}</span>
							</div>
							<div className="flex items-center">
								<CakeOutlinedIcon className="h-4 w-4 mr-2" />
								<span>{authData.metadata.birthday ? (new Date(authData.metadata.birthday.replace(/\//g, "-"))).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Unknown"}</span>
							</div>
							<div className="flex items-center">
								<LocationOnOutlinedIcon className="h-4 w-4 mr-2" />
								<span>{authData.metadata.country ? authData.metadata.country : "Unknown"}</span>
							</div>
							<div className="flex items-center">
								<SchoolOutlinedIcon className="h-4 w-4 mr-2" />
								<span>{authData.metadata.education ? authData.metadata.education : "Unknown"}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-primary-toned-50 rounded-lg p-4 mt-4">
					<p className="font-semibold text-lg mb-2">Balance (SSC)</p>
					<div className="flex items-center justify-between text-[28px] font-bold text-[var(--primary-color)] mb-4 bg-white shadow rounded-md px-2 py-2">
						<span>{authBalance?.balance.toLocaleString() || 0}</span>
						<AutorenewIcon
							onClick={() => fetchBalance()}
							className="cursor-pointer text-gray-600 hover:text-[var(--primary-color)] transition-transform duration-300 hover:rotate-180"
						/>
					</div>
					<div className="flex gap-2">
						<button
							onClick={handleOpenTopupDialog}
							className="w-1/2 px-4 py-2 bg-primary font-bold text-white rounded-lg"
						>
							Top Up
						</button>
						<button
							onClick={() => setOpenOrderDialog(true)}
							className="w-1/2 px-4 py-2 border border-primary font-bold text-primary rounded-lg"
						>
							Order History
						</button>
					</div>
				</div>
				{authBalance?.is_premium && (
					<p className="text-xs text-gray-600 text-center mt-2 mb-2">
						Premium valid until{" "}
						<span className="font-medium text-gray-800">
							{new Date(authBalance.premium_expires).toLocaleDateString()}
						</span>
					</p>
				)}
			</div>
			<Dialog open={openTopup} onClose={handleCloseTopupDialog} maxWidth="sm" fullWidth>
				<DialogTitle className="text-center font-bold text-xl">Choose a Top-Up Package</DialogTitle>
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
										Best Value
									</div>
								)}
								<div className="text-xl font-semibold">{opt.ssc.toLocaleString()} SSC</div>
								<div
									className={clsx(
										"text-sm",
										isSelected ? "text-white/80" : "text-gray-700"
									)}
								>
									{opt.vnd.toLocaleString()} VND
								</div>
							</div>
						);
					})}
				</DialogContent>
				{creatingError && (
					<div className="text-center text-red-500 mb-4">
						{creatingError}
					</div>
				)}
				<DialogActions className="flex items-center justify-between px-6 pb-6">
					<button
						onClick={handleCloseTopupDialog}
						className="w-1/2 px-4 py-2 border border-[var(--primary-color)] font-bold text-[var(--primary-color)] rounded-lg"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							if (selectedOption !== null) {
								handleConfirmTopup();
							}
						}}
						disabled={selectedOption === null || isCreating}
						className={clsx(
							"w-1/2 px-4 py-2 font-bold rounded-lg ml-4",
							selectedOption === null
								? "bg-gray-300 text-white cursor-not-allowed"
								: "bg-[var(--primary-color)] text-white"
						)}
					>
						{isCreating ? "Processing..." : "Confirm"}
					</button>
				</DialogActions>
			</Dialog>
			<OrderHistoryDialog open={openOrderDialog} onClose={() => setOpenOrderDialog(false)} />
		</>
	);
}

export default UserProfile