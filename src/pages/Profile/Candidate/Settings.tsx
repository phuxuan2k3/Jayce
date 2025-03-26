import * as React from 'react';
import { UserInfo } from '../../../features/Auth/store/authSlice';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {
	authData: UserInfo | null;
	updateEmail: (email: string) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const Settings: React.FC<SettingsProps> = ({ authData, updateEmail }) => {
	const [open, setOpen] = React.useState(false);
	const [email, setEmail] = React.useState<string>(authData?.email || "");
	const navigate = useNavigate();

	const handleOpenDialog = () => {
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleConfirmDelete = () => {
		console.log("Delete account");
		handleCloseDialog();
	};

	const handleNavigateToPricingPage = () => {
		navigate("/pricing");
	};

	return (
		<>
			<div className="flex">
				<div className="w-2/3 mt-2 pr-8 border-r-gradient">
					<div className="mt-4">
						<div className="flex items-center justify-start">
							<label className="block font-semibold mr-2">Email</label>
							<input
								type="text"
								className="mt-1 p-2 w-1/2 bg-[#eaf6f8] rounded border-none outline-none"
								defaultValue={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<button className="mt-4 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => updateEmail(email)}>
							Update email
						</button>
					</div>
					<div className="mt-4">
						<p className="font-semibold mb-2">Membership plan</p>
						<p className="text-gray-600 text-sm">You aren't an SkillSharp Member yet. Your career depends on your next interview. Want unlimited access to our courses and questions? Get SkillSharp's membership today.</p>
						<button className="mt-4 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={() => handleNavigateToPricingPage()}>
							Upgrade plan
						</button>
					</div>
				</div>
				<div className="w-1/3 mt-2 pl-8">
					<div className="pt-4">
						<p className="font-semibold">Danger zone</p>
						<button className="mt-4 px-3 font-semibold rounded-lg py-2 text-white bg-red-600 cursor-pointer" onClick={handleOpenDialog}>
							Delete account
						</button>
					</div>
				</div>
			</div>
			<BootstrapDialog className="" onClose={handleCloseDialog} open={open}>
				<div className="bg-[#eaf6f8] rounded-sm shadow-primary p-4 border border-solid border-primary">
					<DialogContent className="mb-4">
						<span>Do you really want to delete your account?</span>
					</DialogContent>
					<DialogActions className="flex items-center justify-evenly mb-4">
						<button className="w-1/4 px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleCloseDialog}>
							No
						</button>
						<button className="w-1/4 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleConfirmDelete}>
							Yes
						</button>
					</DialogActions>
				</div>
			</BootstrapDialog>
		</>
	);
}

export default Settings