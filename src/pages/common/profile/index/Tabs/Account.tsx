import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";
import { useChangePasswordMutation } from "../../../../../features/auth/api/logout.api";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useLanguage } from "../../../../../LanguageProvider";
import { toast } from "react-toastify";

interface AccountProps {
	authData: UserInfo;
}

const Account: React.FC<AccountProps> = ({ authData }) => {
	const { t } = useLanguage();
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
	const [openChangePassword, setOpenChangePassword] = React.useState(false);

	// Password form
	const [oldPassword, setOldPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
	const [errors, setErrors] = React.useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = React.useState(false);

	const [changePassword] = useChangePasswordMutation();

	const handlePasswordChange = async () => {
		const newErrors: Record<string, string> = {};

		if (!oldPassword) newErrors.oldPassword = t("change_password_error_old_required");
		if (!newPassword) {
			newErrors.newPassword = t("change_password_error_old_required");
		} else if (newPassword.length < 6) {
			newErrors.newPassword = t("change_password_error_min_length");
		} else if (!/[A-Z]/.test(newPassword)) {
			newErrors.newPassword = t("change_password_error_uppercase");
		} else if (!/[a-z]/.test(newPassword)) {
			newErrors.newPassword = t("change_password_error_lowercase");
		} else if (!/[0-9]/.test(newPassword)) {
			newErrors.newPassword = t("change_password_error_number");
		} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
			newErrors.newPassword = t("change_password_error_special");
		}

		if (confirmNewPassword !== newPassword) {
			newErrors.confirmNewPassword = t("change_password_error_confirm_mismatch");
		}

		if (confirmNewPassword === "") {
			newErrors.confirmNewPassword = t("change_password_error_confirm_required");
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsLoading(true);
		try {
			await changePassword({ oldPassword, newPassword, confirmNewPassword }).unwrap();
			toast.success(t("change_password_success"));
			setOpenChangePassword(false);
			setOldPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
			setErrors({});
		} catch (error: any) {
			toast.error(t("change_password_error_default"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4 mt-1">
			<h2 className="text-xl font-bold">{t("account_title_info")}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{t("account_label_id")}</label>
					<p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-md">{authData.username}</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{t("account_label_email")}</label>
					<p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-md">{authData.email}</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{t("account_label_password")}</label>
					<p
						className="text-primary cursor-pointer hover:underline px-3 py-2 rounded-md"
						onClick={() => setOpenChangePassword(true)}
					>
						{t("account_action_change_password")}
					</p>
				</div>
			</div>

			<h2 className="text-xl font-bold mt-8">{t("account_title_social")}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
						<img src="/defaults/linkedin.png" alt="LinkedIn" className="w-4 h-4" />
						{t("account_label_linkedin")}
					</label>
					<p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-md flex justify-between items-center">
						<span>{t("account_not_connected")}</span>
						<span className="text-primary cursor-pointer hover:underline">{t("account_action_connect")}</span>
					</p>
				</div>
			</div>

			<h2 className="text-xl font-bold mt-8 text-secondary-toned-500">{t("account_title_danger")}</h2>
			<button
				onClick={() => setOpenDeleteDialog(true)}
				className="px-3 py-2 rounded-lg border border-red-500 text-red-600 hover:text-white hover:bg-red-600 transition"
			>
				{t("account_action_delete_account")}
			</button>

			{/* Change Password Dialog */}
			<Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)} maxWidth="sm" fullWidth>
				<div className="bg-white rounded-md shadow-lg p-6">
					<DialogTitle className="text-center font-bold text-xl text-primary">{t("change_password_title")}</DialogTitle>
					<DialogContent className="flex flex-col gap-6 mt-4">
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 mb-1">{t("change_password_old")}</label>
							<input
								type="password"
								className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
									errors.oldPassword ? "border-red-500" : "border-gray-300"
								}`}
								value={oldPassword}
								onChange={(e) => {
									setOldPassword(e.target.value);
									setErrors((prev) => ({ ...prev, oldPassword: "" }));
								}}
							/>
							{errors.oldPassword && <span className="text-sm text-red-500 mt-1">{errors.oldPassword}</span>}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 mb-1">{t("change_password_new")}</label>
							<input
								type="password"
								className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
									errors.newPassword ? "border-red-500" : "border-gray-300"
								}`}
								value={newPassword}
								onChange={(e) => {
									setNewPassword(e.target.value);
									setErrors((prev) => ({ ...prev, newPassword: "" }));
								}}
							/>
							{errors.newPassword && <span className="text-sm text-red-500 mt-1">{errors.newPassword}</span>}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 mb-1">{t("change_password_confirm")}</label>
							<input
								type="password"
								className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
									errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
								}`}
								value={confirmNewPassword}
								onChange={(e) => {
									setConfirmNewPassword(e.target.value);
									setErrors((prev) => ({ ...prev, confirmNewPassword: "" }));
								}}
							/>
							{errors.confirmNewPassword && <span className="text-sm text-red-500 mt-1">{errors.confirmNewPassword}</span>}
						</div>
					</DialogContent>
					<DialogActions className="flex items-center justify-between mt-6">
						<button
							className="w-1/3 px-4 py-2 font-semibold rounded-lg border border-primary text-primary"
							onClick={() => setOpenChangePassword(false)}
						>
							{t("change_password_cancel")}
						</button>
						<button
							className="w-1/3 px-4 py-2 font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition"
							onClick={handlePasswordChange}
							disabled={isLoading}
						>
							{isLoading ? t("change_password_saving") : t("change_password_save")}
						</button>
					</DialogActions>
				</div>
			</Dialog>

			{/* Delete Account Confirmation Dialog */}
			<Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
				<DialogContent>{t("delete_account_confirm_message")}</DialogContent>
				<DialogActions className="flex items-center justify-evenly mb-4">
					<button
						className="w-1/3 px-3 font-semibold rounded-lg py-2 border border-[var(--primary-color)] text-[var(--primary-color)]"
						onClick={() => setOpenDeleteDialog(false)}
					>
						{t("delete_account_confirm_no")}
					</button>
					<button
						className="w-1/3 px-3 font-semibold rounded-lg py-2 bg-[var(--primary-color)] text-white"
						onClick={() => {
							console.log("Delete account confirmed");
							setOpenDeleteDialog(false);
						}}
					>
						{t("delete_account_confirm_yes")}
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Account;
