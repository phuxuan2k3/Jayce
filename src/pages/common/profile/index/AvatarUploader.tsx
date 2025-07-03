import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { UserInfo } from "../../../../features/auth/store/authSlice";
import { useLanguage } from "../../../../LanguageProvider";

const AvatarUploader = ({ authData, authBalance, onConfirm }: {
    authData: UserInfo;
    authBalance: any;
    onConfirm: (base64Image: string) => void;
}) => {
    const { t } = useLanguage();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const [_file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        if (previewImage) {
            console.log("Preview image updated:", previewImage);
        }
    }, [previewImage]);

    const handleAvatarClick = () => setIsDialogOpen(true);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setPreviewImage(result);
            setFile(selectedFile);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleConfirm = () => {
        if (!previewImage) return;
        onConfirm(previewImage);
        setIsDialogOpen(false);
        setPreviewImage(null);
        setFile(null);
    };

    return (
        <>
            <div className="relative w-20 h-20 group cursor-pointer" onClick={handleAvatarClick}>
                <img
                    src={authData.metadata.avatarPath || "/svg/default-avatar.png"}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <EditIcon className="text-white" />
                </div>
                {authBalance?.is_premium && (
                    <div className="absolute -top-1 -right-5 bg-yellow-400 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow">
                        {t("settings_balance_premium_label")}
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle className="text-center font-semibold text-lg text-gray-800">
                    {t("settings_profile_avatar_upload_title")}
                </DialogTitle>
                <DialogContent className="flex flex-col items-center">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <p className="text-gray-500 text-sm text-center">{t("settings_profile_avatar_upload_no_avatar")}</p>
                        </div>
                    )}
                    <label
                        htmlFor="avatar-upload"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded shadow transition duration-200"
                    >
                        {t("settings_profile_avatar_upload_choose")}
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </DialogContent>
                <DialogActions className="justify-center">
                    <Button
                        onClick={() => setIsDialogOpen(false)}
                        sx={{
                            width: '33%',
                            padding: '8px 16px',
                            border: '1px solid var(--primary-color)',
                            fontWeight: 'bold',
                            color: 'var(--primary-color)',
                            borderRadius: '8px',
                        }}
                    >
                        {t("settings_profile_avatar_upload_cancel")}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color="primary"
                        disabled={!previewImage}
                        className={`w-1/3 px-4 py-2 ${!previewImage ? "bg-gray-300 text-gray-500" : "bg-[var(--primary-color)] text-white"} font-bold rounded-lg transition duration-200`}
                    >
                        {t("settings_profile_avatar_upload_confirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AvatarUploader;