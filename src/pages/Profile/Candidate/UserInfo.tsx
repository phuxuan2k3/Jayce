import * as React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { UserInfo } from '../../../app/redux/authSlice';
import { styled } from '@mui/material/styles';;
// import { DialogTitle, DialogActions, DialogContent, Dialog } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface UserProfileProps {
	authData: UserInfo | null;
	updateProfile: (newUserInfo: UserInfo) => void;
	uploadResume: (resume: File | null) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const initUserStat = [
	{ name: "Programming", total: 22 },
	{ name: "Algorithms", total: 13 },
	{ name: "Databases", total: 4 },
	{ name: "Networking", total: 2 },
	{ name: "Programming", total: 22 },
	{ name: "Algorithms", total: 13 },
	{ name: "Databases", total: 4 },
	{ name: "Networking", total: 2 },
];

const UserProfile: React.FC<UserProfileProps> = ({ authData, updateProfile, uploadResume }) => {
	const [skillStat, _setSkillStat] = React.useState<{ name: string, total: number }[]>(initUserStat);
	const [seeMoreSkills, setSeeMoreSkills] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [resume, setResume] = React.useState<File | null>(null);
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);
	const [errorResume, setErrorResume] = React.useState("");
	const [isEditing, setIsEditing] = React.useState(false);
	const [formData, setFormData] = React.useState<UserInfo>(authData || { email: '', username: '', avatarPath: '' });

	const handleOpenDialog = () => {
		console.log("Open dialog");
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			if (file.type !== "application/pdf") {
				setErrorResume("Only PDF files are allowed.");
				return;
			}

			setResume(file);
			setErrorResume("");
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			const file = event.dataTransfer.files[0];

			if (file.type !== "application/pdf") {
				setErrorResume("Only PDF files are allowed.");
				return;
			}

			setResume(file);
			setErrorResume("");
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setErrorResume("");
	};

	const handleFileClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleSaveResume = () => {
		setErrorResume("");
		if (!resume) {
			setErrorResume("Please select a file to upload.");
			return;
		}

		if (resume.type !== "application/pdf") {
			setErrorResume("Only PDF files are allowed.");
			return;
		}

		uploadResume(resume);
		handleCloseDialog();
	};

	const handleUpdateProfile = () => {
		updateProfile(formData);
		setIsEditing(false);
	};

	const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value } as UserInfo);
	};

	const toggleSeeMoreSkills = () => {
		setSeeMoreSkills((prev) => !prev);
	};

	return (
		<>
			<div className="w-1/4">
				<div className="bg-[#eaf6f8] rounded-lg p-4">
					{/* <div className="flex flex-col">
                        <div className="flex items-center justify-start">
                            <img className="w-20 h-20 bg-gray-300 rounded-full mb-2" src={authData?.avatarPath} alt={authData?.username} />
                            <div className="flex flex-col ml-4">
                                <h2 className="text-lg font-semibold">{authData?.username}</h2>
                                <p className="text-sm text-gray-500">@{authData?.username}</p>
                            </div>
                        </div>
                        <button className="mt-2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer">
                            Edit Profile
                        </button>
                        <div className="flex flex-col text-gray-500 mt-4 gap-2">
                            <div>
                                <MailOutlineIcon className="h-4 w-4 mr-2" />
                                <span>{authData?.email}</span>
                            </div>
                            <div>
                                <PhoneOutlinedIcon className="h-4 w-4 mr-2" />
                                <span>0123456789</span>
                            </div>
                            <div>
                                <LocationOnOutlinedIcon className="h-4 w-4 mr-2" />
                                <span>Ho Chi Minh City, Vietnam</span>
                            </div>
                        </div>
                    </div> */}
					<div className="flex flex-col">
						<div className="flex items-center justify-start">
							<img className="w-20 h-20 bg-gray-300 rounded-full mb-2" src={formData.avatarPath} alt={formData.username} />
							<div className="flex flex-col ml-4">
								<input
									type="text"
									name="name"
									value={formData.username}
									onChange={handleProfileChange}
									readOnly={!isEditing}
									className={`w-full border rounded px-2 py-1 font-semibold transition-all ${!isEditing ? 'bg-transparent border-none cursor-default outline-none' : 'border-gray-300'}`}
								/>
								<div className="flex items-center justify-center text-gray-500">
									<span className="pl-2">@</span>
									<input
										type="text"
										name="username"
										value={formData.username}
										onChange={handleProfileChange}
										readOnly={!isEditing}
										disabled
										className={`w-full border rounded px-2 py-1 transition-all ${!isEditing ? 'bg-transparent border-none cursor-default outline-none pl-0' : 'border-gray-300 pl-2'}`}
									/>
								</div>
							</div>
						</div>

						{isEditing && (
							<div className="relative mt-2">
								<div className="absolute top-[-10px] left-7 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-400"></div>
								<input
									type="text"
									name="avatarPath"
									value={formData.avatarPath}
									onChange={handleProfileChange}
									className="w-11/12 border rounded px-2 py-1 border-gray-300"
									placeholder="Enter new avatar URL"
									title="Avatar URL"
								/>
							</div>
						)}

						{isEditing ? (
							<div className="flex items-center justify-center mt-2">
								<button
									className="w-1/3 px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</button>
								<button
									className="w-1/3 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] border-2 cursor-pointer"
									onClick={() => handleUpdateProfile()}
								>
									Update
								</button>
							</div>
						) : (
							<button
								className="mt-2 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] border-2 cursor-pointer"
								onClick={() => setIsEditing(true)}
							>
								Edit Profile
							</button>
						)}

						<div className="flex flex-col text-gray-500 mt-4 gap-4">
							<div className="flex items-center">
								<MailOutlineIcon className="h-4 w-4 mr-2" />
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleProfileChange}
									readOnly={!isEditing}
									disabled
									className={`w-5/6 border rounded px-2 py-1 transition-all ${!isEditing ? 'bg-transparent border-none cursor-default outline-none' : 'border-gray-300'}`}
								/>
							</div>
							<div className="flex items-center">
								<PhoneOutlinedIcon className="h-4 w-4 mr-2" />
								<input
									type="text"
									name="phone"
									defaultValue="0123456789"
									// onChange={handleProfileChange}
									readOnly={!isEditing}
									className={`w-5/6 border rounded px-2 py-1 transition-all ${!isEditing ? 'bg-transparent border-none cursor-default outline-none' : 'border-gray-300'}`}
								/>
							</div>
							<div className="flex items-center">
								<LocationOnOutlinedIcon className="h-4 w-4 mr-2" />
								<input
									type="text"
									name="location"
									defaultValue="Ho Chi Minh City, Vietnam"
									// onChange={handleProfileChange}
									readOnly={!isEditing}
									className={`w-5/6 border rounded px-2 py-1 transition-all ${!isEditing ? 'bg-transparent border-none cursor-default outline-none' : 'border-gray-300'}`}
								/>
							</div>
						</div>
					</div>
					<div className="mt-4 pt-2 border-t-gradient">
						<div className="flex items-center justify-between">
							<span className="font-semibold mb-1">Skills</span>
							<span className="text-gray-600 cursor-pointer" onClick={toggleSeeMoreSkills}>{seeMoreSkills ? "See less" : "See more"}</span>
						</div>
						<ul>
							{(seeMoreSkills ? skillStat : skillStat.slice(0, 4)).map((skill, index) => (
								<li key={index} className="flex items-center justify-between mb-1 text-sm">
									<span className="bg-[#d5eef1] p-1 rounded-sm text-gray-600">
										{skill.name}
									</span>
									<span>
										{skill.total} tests/scenarios
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="bg-[#eaf6f8] rounded-lg p-4 mt-4">
					<p className="font-semibold">My Resume</p>
					<div className="flex items-center">
						<UploadFileIcon className="h-4 w-4 mr-2" />
						<span className="text-teal-500 cursor-pointer hover:underline" onClick={() => handleOpenDialog()}>Add your resume here</span>
					</div>
				</div>
			</div>
			<BootstrapDialog className="" onClose={handleCloseDialog} open={open}>
				<div className="bg-[#eaf6f8] rounded-sm shadow-primary p-4 border border-solid border-primary">
					<DialogTitle className="text-base font-semibold">Add your Resume</DialogTitle>
					<DialogContent>
						<div
							className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer"
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onClick={handleFileClick}
						>
							<p className="text-gray-600">Choose or drag and drop your resume here</p>
							<p className="text-sm text-gray-500">Supported format: PDF &nbsp; Max size: 5MB</p>
							<input
								type="file"
								accept="application/pdf"
								className="hidden"
								onChange={handleFileChange}
								ref={fileInputRef}
							/>
							{resume && <p className="mt-2 text-sm text-green-600">Selected file: {resume.name}</p>}
							{errorResume && <p className="mt-2 text-sm text-red-600">{errorResume}</p>}
						</div>
					</DialogContent>
					<DialogActions className="flex items-center justify-evenly mb-4">
						<button className="w-1/4 px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleCloseDialog}>
							Cancel
						</button>
						<button className="w-1/4 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleSaveResume}>
							Save
						</button>
					</DialogActions>
				</div>
			</BootstrapDialog>
		</>
	);
}

export default UserProfile