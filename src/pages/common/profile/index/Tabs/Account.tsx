import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";
import { styled } from '@mui/material/styles';
import { useChangePasswordMutation } from "../../../../../features/auth/api/logout.api";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertError from "../../../../../components/ui/alert/AlertError";
import AlertSuccess from "../../../../../components/ui/alert/AlertSuccess";

interface AccountProps {
	authData: UserInfo;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const Account: React.FC<AccountProps> = ({ authData }) => {
	const [openChangePassword, setOpenChangePassword] = React.useState(false);
	const [oldPassword, setOldPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
	// const [showOldPassword, setShowOldPassword] = React.useState(false);
	// const [showNewPassword, setShowNewPassword] = React.useState(false);
	// const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);
	const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
	const [changePassword] = useChangePasswordMutation();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [updateError, setUpdateError] = React.useState<string | null>(null);
	const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

	const handlePasswordChange = async () => {
		if (isLoading) return;

		const newErrors: { [key: string]: string } = {};
		if (!oldPassword) newErrors.oldPassword = "Old password is required";

		if (!newPassword) {
			newErrors.newPassword = "New password is required";
		} else if (newPassword.length < 6) {
			newErrors.newPassword = "New password must be at least 6 characters long.";
		} else if (!/[A-Z]/.test(newPassword)) {
			newErrors.newPassword = "New password must contain at least one uppercase letter.";
		} else if (!/[a-z]/.test(newPassword)) {
			newErrors.newPassword = "New password must contain at least one lowercase letter.";
		} else if (!/[0-9]/.test(newPassword)) {
			newErrors.newPassword = "New password must contain at least one number.";
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
			newErrors.newPassword = "New password must contain at least one special character.";
		}

		if (confirmNewPassword !== newPassword) newErrors.confirmNewPassword = "Passwords do not match";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setUpdateError(null);
		setErrors({});
		setIsLoading(true);
		setSuccessMessage(null);
		try {
			await changePassword({ oldPassword, newPassword, confirmNewPassword }).unwrap();
			setSuccessMessage("Password changed successfully!");
			setOpenChangePassword(false);
			setOldPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
			setErrors({});
			setUpdateError(null);
		} catch (error: any) {
			setUpdateError(error?.data?.message || "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const [open, setOpen] = React.useState(false);

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

	console.log("Auth data", authData);

	return (
		<>
			<div>
				{successMessage && <AlertSuccess successMessage={successMessage} />}
				<h2 className="text-xl font-bold mb-4">Account Info</h2>
				<table className="w-full mb-8">
					<tbody>
						<tr className="border-b border-black w-full">
							<td className="w-[20%]">SkillSharp ID</td>
							<td className="w-[70%] p-2 opacity-70">{authData.username || "No info"}</td>
							<td className="w-[10%] text-end"></td>
						</tr>
						<tr className="border-b border-black w-full">
							<td className="w-[20%]">Email</td>
							<td className="w-[70%] p-2 opacity-70">{authData.email || "No info"}</td>
							<td className="w-[10%] text-end"></td>
						</tr>
						<tr className="border-b border-black w-full">
							<td className="w-[20%]">Password</td>
							<td className="w-[70%] p-2 text-primary cursor-pointer hover:underline" onClick={() => setOpenChangePassword(true)}>Change password</td>
							<td className="w-[10%] text-end"></td>
						</tr>
					</tbody>
				</table>

				<h2 className="text-xl font-bold mb-4">Social Account</h2>
				<table className="w-full mb-8">
					<tbody>
						<tr className="border-b border-black w-full">
							<td className="w-[20%] flex gap-2"><img className="w-5 h-5" src="/defaults/linkedin.png" alt="linkedin" />LinkedIn</td>
							<td className="w-[70%] p-2 opacity-70">Not connected</td>
							<td className="w-[10%] text-end">
								<span className="text-primary cursor-pointer hover:underline">Connect</span>
							</td>
						</tr>
					</tbody>
				</table>

				<h2 className="text-xl font-bold mb-4 text-secondary-toned-500">Danger Zone</h2>
				<button className="px-3 font-semibold rounded-lg py-2 cursor-pointer border border-red-500 bg-white text-red-600 hover:text-white hover:bg-red-600 transition duration-300" onClick={handleOpenDialog}>
					Delete account
				</button>
			</div>
			<BootstrapDialog open={openChangePassword} onClose={() => setOpenChangePassword(false)} maxWidth="sm" fullWidth>
				<div className="bg-primary-toned-50 rounded-sm shadow-primary p-4 border border-solid border-primary">
					<DialogTitle className="text-center font-semibold text-lg">
						Change Password
					</DialogTitle>
					<DialogContent className="flex flex-col gap-4 pt-4">
						<TextField
							label="Old Password"
							type="password"
							fullWidth
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							error={!!errors.oldPassword}
							helperText={errors.oldPassword}
						// InputProps={{
						//     endAdornment: (
						//         <InputAdornment position="end">
						//             <IconButton
						//                 onClick={() => setShowOldPassword(prev => !prev)}
						//                 edge="end"
						//             >
						//                 {showOldPassword ? <VisibilityOff /> : <Visibility />}
						//             </IconButton>
						//         </InputAdornment>
						//     ),
						// }}
						/>
						<TextField
							label="New Password"
							type={"password"}
							fullWidth
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							error={!!errors.newPassword}
							helperText={errors.newPassword}
						// InputProps={{
						//     endAdornment: (
						//         <InputAdornment position="end">
						//             <IconButton
						//                 onClick={() => setShowNewPassword(prev => !prev)} // Toggle visibility correctly
						//                 edge="end"
						//             >
						//                 {showNewPassword ? <VisibilityOff /> : <Visibility />}
						//             </IconButton>
						//         </InputAdornment>
						//     ),
						// }}
						/>
						<TextField
							label="Confirm New Password"
							type={"password"}
							fullWidth
							value={confirmNewPassword}
							onChange={(e) => setConfirmNewPassword(e.target.value)}
							error={!!errors.confirmNewPassword}
							helperText={errors.confirmNewPassword}
						// InputProps={{
						//     endAdornment: (
						//         <InputAdornment position="end">
						//             <IconButton
						//                 onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
						//                 edge="end"
						//             >
						//                 {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
						//             </IconButton>
						//         </InputAdornment>
						//     ),
						// }}
						/>

						{updateError && <AlertError errorMessage={updateError} />}
					</DialogContent>
					<DialogActions className="flex items-center justify-evenly mb-4">
						<button
							className="w-1/3 px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
							onClick={() => setOpenChangePassword(false)}
						>
							Cancel
						</button>
						<button
							className="w-1/3 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer"
							onClick={handlePasswordChange}
							disabled={isLoading}
						>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</DialogActions>
				</div>
			</BootstrapDialog>
			<BootstrapDialog className="" onClose={handleCloseDialog} open={open}>
				<div className="bg-primary-toned-50 rounded-sm shadow-primary p-4 border border-solid border-primary">
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
};

export default Account;