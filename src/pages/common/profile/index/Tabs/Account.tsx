import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

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
                <h2 className="text-xl font-bold mb-4">Account Info</h2>
                <table className="w-full mb-8">
                    <tbody>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">SkillSharp ID</td>
                            <td className="w-[70%] p-2 opacity-70">Bang</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Email</td>
                            <td className="w-[70%] p-2 opacity-70">phamcongbang03@gmail.com</td>
                            <td className="w-[10%] text-end">
                                <span className="text-primary cursor-pointer hover:underline">Edit</span>
                            </td>
                        </tr>
                        <tr className="border-b border-black w-full">
                            <td className="w-[20%]">Password</td>
                            <td className="w-[70%] p-2 text-primary cursor-pointer hover:underline">Change password</td>
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
};

export default Account;