import { CircleX, File, FolderOpen } from "lucide-react";
import { useLanguage } from "../../../../../../../LanguageProvider";

interface FilesContextTabProps {
	files: File[];
	onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFileRemove: (index: number) => void;
}

export default function FilesContextTab({
	files,
	onFileUpload,
	onFileRemove
}: FilesContextTabProps) {
	const { t } = useLanguage();

	return (
		<div className="space-y-4">
			<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
				<input
					type="file"
					multiple
					onChange={onFileUpload}
					className="hidden"
					id="file-upload"
					accept=".txt,.pdf,.doc,.docx"
				/>
				<label
					htmlFor="file-upload"
					className="cursor-pointer text-primary hover:text-primary/80"
				>
					<div className="space-y-2">
						<div className="flex items-center justify-center">
							<div className="text-2xl p-2 rounded-md bg-primary text-white w-fit h-fit">
								<FolderOpen className="w-5 h-5" />
							</div>
						</div>
						<div className="font-medium">{t("file_upload_click_to_upload")}</div>
						<div className="text-sm text-gray-500">
							{t("file_upload_supported_formats")}
						</div>
					</div>
				</label>
			</div>

			{files.length > 0 && (
				<div className="space-y-2">
					<h4 className="font-medium text-gray-700">{t("file_upload_uploaded_files")}:</h4>
					{files.map((file, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
						>
							<div className="flex items-center space-x-3">
								<File className="w-5 h-5 text-gray-600" />
								<div>
									<div className="font-medium">{file.name}</div>
									<div className="text-sm text-gray-500">
										{(file.size / 1024).toFixed(1)} KB
									</div>
								</div>
							</div>
							<button
								type="button"
								onClick={() => onFileRemove(index)}
								className="text-red-500 hover:text-red-700 font-medium"
							>
								<CircleX className="w-5 h-5" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
