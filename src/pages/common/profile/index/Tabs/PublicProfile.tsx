import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";
import { useUpdateMetadataMutation, useMeMutation } from "../../../../../features/auth/api/logout.api";
import { useLanguage } from "../../../../../LanguageProvider";
import { toast } from 'react-toastify';

interface PublicProfileProps {
	authData: UserInfo;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ authData }) => {
	const { t, language } = useLanguage();
	const [isEditing, setIsEditing] = React.useState(false);
	const [formState, setFormState] = React.useState(authData.metadata || {});
	const [initialState, setInitialState] = React.useState(authData.metadata || {});
	const [updateMetadata] = useUpdateMetadataMutation();
	const [me] = useMeMutation();
	const [isLoading, setIsLoading] = React.useState(false);

	const fields = [
		{ key: "fullname", label: t("profile_label_name") },
		{ key: "gender", label: t("profile_label_gender") },
		{ key: "country", label: t("profile_label_location") },
		{ key: "birthday", label: t("profile_label_birthday") },
		{ key: "summary", label: t("profile_label_summary") },
		{ key: "website", label: t("profile_label_website") },
		{ key: "linkedIn", label: t("profile_label_linkedin") },
		{ key: "company", label: t("profile_label_work") },
		{ key: "education", label: t("profile_label_education") },
	];

	const handleChange = (key: string, value: string) => {
		setFormState((prev: Record<string, string>) => ({ ...prev, [key]: value }));
	};

	const handleSave = async () => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			await updateMetadata({ metadata: formState }).unwrap();
			await me().unwrap();
			toast.success(t("profile_update_success"));
			setInitialState(formState);
			setIsEditing(false);
		} catch (error) {
			toast.error(t("profile_update_failed"));
			console.error("Failed to update metadata", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = () => {
		setInitialState({ ...formState });
		setIsEditing(true);
	};

	const handleCancel = () => {
		setFormState({ ...initialState });
		setIsEditing(false);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold flex items-center space-x-2">
					<span>{t("profile_title_basic")}</span>
				</h2>
				{!isEditing ? (
					<button
						onClick={handleEdit}
						className="bg-primary text-white px-4 py-1.5 rounded-md font-semibold"
					>
						{t("profile_action_edit")}
					</button>
				) : (
					<div className="space-x-4">
						<button
							onClick={handleCancel}
							className="bg-secondary-toned-500 text-white px-4 py-1.5 rounded-md font-semibold"
						>
							{t("profile_action_cancel")}
						</button>
						<button
							onClick={handleSave}
							className="bg-primary text-white px-4 py-1.5 rounded-md font-semibold"
							disabled={isLoading}
						>
							{isLoading ? t("profile_action_updating") : t("profile_action_save")}
						</button>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{fields.map(({ key, label }) => {
					let value = formState[key] || "";

					if (key === "birthday" && value) {
						try {
							const date = new Date(value.replace(/\//g, "-"));
							value = date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							});
						} catch (e) {
							console.warn("Invalid birthday format:", value);
						}
					}

					const formattedDateInput = formState["birthday"]
						? formState["birthday"].replace(/\//g, "-")
						: "";

					const inputElement = (() => {
						if (key === "birthday") {
							return (
								<input
									type="date"
									className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									value={formattedDateInput}
									onChange={(e) => handleChange(key, e.target.value.replace(/-/g, "/"))}
								/>
							);
						}

						if (key === "gender") {
							return (
								<select
									className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									value={value}
									onChange={(e) => handleChange(key, e.target.value)}
								>
									<option value="">{t("profile_gender_select")}</option>
									<option value="Male">{t("profile_gender_male")}</option>
									<option value="Female">{t("profile_gender_female")}</option>
									<option value="Prefer not to say">{t("profile_gender_other")}</option>
								</select>
							);
						}

						return (
							<input
								type="text"
								className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
								value={value}
								onChange={(e) => handleChange(key, e.target.value)}
							/>
						);
					})();

					return (
						<div key={key}>
							<label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
							<div className="min-h-[44px] flex items-center">
								{isEditing ? (
									inputElement
								) : (
									<p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-md w-full">
										{value || t("profile_no_info")}
									</p>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PublicProfile;
