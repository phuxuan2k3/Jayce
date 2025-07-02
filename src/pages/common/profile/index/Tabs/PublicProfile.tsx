import React from "react";
import { UserInfo } from "../../../../../features/auth/store/authSlice";
import { useUpdateMetadataMutation, useMeMutation } from "../../../../../features/auth/api/logout.api";
import AlertError from "../../../../../components/ui/alert/AlertError";
import AlertSuccess from "../../../../../components/ui/alert/AlertSuccess";
import { useLanguage } from "../../../../../LanguageProvider";

interface PublicProfileProps {
	authData: UserInfo;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ authData }) => {
	const { t, language } = useLanguage();
	const [editingField, setEditingField] = React.useState<string | null>(null);
	const [inputValue, setInputValue] = React.useState<string>("");
	const [updateMetadata] = useUpdateMetadataMutation();
	const [me] = useMeMutation();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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

	console.log("Auth data", authData);

	const handleEdit = (key: string, currentValue: string) => {
		let value = currentValue || "";

		if (key === "birthday" && currentValue) {
			const date = new Date(currentValue);

			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");

			value = `${year}-${month}-${day}`;
		}

		setEditingField(key);
		setInputValue(value);
		setErrorMessage(null);
	};

	const handleCancel = () => {
		setEditingField(null);
		setInputValue("");
		setErrorMessage(null);
	};

	const handleSave = async () => {
		setErrorMessage(null);
		setSuccessMessage(null);
		if (!editingField) return;
		if (isLoading) return;
		setIsLoading(true);
		try {
			await updateMetadata({ metadata: { [editingField]: inputValue } }).unwrap();
			await me().unwrap();
			setSuccessMessage(`${t("profile_update_success")} (${editingField})`);
		} catch (error) {
			setErrorMessage(t("profile_update_failed"));
			console.error("Failed to update your infomation", error);
		} finally {
			setEditingField(null);
			setInputValue("");
			setIsLoading(false);
		}
	};

	const renderRow = (field: { key: string; label: string }) => {
		let value = authData.metadata[field.key] || t("profile_no_info");
		const isEditing = editingField === field.key;

		if (field.key === "birthday" && value !== t("profile_no_info")) {
			try {
				const date = new Date(value.replace(/\//g, "-"));
				value = date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
			} catch (e) {
				console.error("Invalid birthday format:", value);
			}
		}

		return (
			<tr key={field.key} className="border-b border-black w-full">
				<td className="w-[20%]">{field.label}</td>
				<td className="w-[70%] p-2 leading-[1.5rem] align-middle">
					{isEditing ? (
						field.key === "birthday" ? (
							<input
								type="date"
								className="border px-2 py-0 w-full leading-[1.5rem] align-middle h-6"
								value={inputValue.replace(/\//g, "-")}
								onChange={(e) => {
									const formatted = e.target.value.replace(/-/g, "/");
									setInputValue(formatted);
								}}
							/>
						) : field.key === "gender" ? (
							<select
								className="border px-2 py-0 w-full leading-[1.5rem] align-middle h-6"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							>
								<option value="">{t("profile_gender_select")}</option>
								<option selected={authData.metadata.gender === "Male"} value="Male">{t("profile_gender_male")}</option>
								<option selected={authData.metadata.gender === "Female"} value="Female">{t("profile_gender_female")}</option>
								<option selected={authData.metadata.gender === "Prefer not to say"} value="Prefer not to say">{t("profile_gender_other")}</option>
							</select>
						) : (
							<input
								type="text"
								className="border px-2 py-0 w-full leading-[1.5rem] align-middle h-6"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						)
					) : (
						<span className="opacity-70 leading-[1.5rem] align-middle h-6">{value}</span>
					)}
				</td>
				<td className="w-[10%] text-end space-x-2">
					{isEditing ? (
						isLoading ? (
							<span className="text-primary">{t("profile_action_updating")}</span>
						) : (
							<>
								<button
									className="text-secondary-toned-500 hover:underline"
									onClick={handleCancel}
									disabled={isLoading}
								>
									{t("profile_action_cancel")}
								</button>
								<button
									className="text-primary-toned-500 hover:underline"
									onClick={handleSave}
									disabled={isLoading}
								>
									{t("profile_action_save")}
								</button>
							</>
						)
					) : (
						<span
							className="text-primary cursor-pointer hover:underline"
							onClick={() => handleEdit(field.key, authData.metadata[field.key])}
						>
							{t("profile_action_edit")}
						</span>
					)}
				</td>
			</tr>
		);
	};

	return (
		<div>
			{successMessage && <AlertSuccess successMessage={successMessage} />}
			{errorMessage && <AlertError errorMessage={errorMessage} />}
			<h2 className="text-xl font-bold mb-4">{t("profile_title_basic")}</h2>
			<table className="w-full mb-8">
				<tbody>
					{fields
						.slice(0, 7)
						.map((field) => renderRow(field))}
				</tbody>
			</table>

			<h2 className="text-xl font-bold mb-4">{t("profile_title_experience")}</h2>
			<table className="w-full">
				<tbody>
					{fields
						.slice(7)
						.map((field) => renderRow(field))}
				</tbody>
			</table>
		</div>
	);
};

export default PublicProfile;