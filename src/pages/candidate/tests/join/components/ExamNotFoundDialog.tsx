import { AlertCircle } from 'lucide-react';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../features/tests/ui/MyDialog';
import { LanguageTranslations, useLanguage } from '../../../../../LanguageProvider';

export default function ExamNotFoundDialog({
	roomId,
	onClose
}: {
	roomId: string;
	onClose: () => void;
}) {
	const { t, tTranslation } = useLanguage();

	return (
		<MyDialog>
			<MyDialog.Content>
				<div className="flex flex-col items-center justify-center">
					<div className="bg-red-100 p-3 rounded-full mb-4">
						<AlertCircle size={40} className="text-red-500" />
					</div>
					<h3 className="text-xl font-semibold text-gray-800 mb-2">{t("exam_info_not_found_title")}</h3>
					<p className="text-gray-600 text-center mb-6">{t("exam_info_not_found_description")} {roomId}</p>

					<div className='bg-amber-50 border border-amber-200 text-amber-800 px-4 py-6 rounded-md shadow-sm mb-8'>
						<p className='text-sm'>
							{tTranslation("reason", Language)}
						</p>

						<ul className="list-disc pl-5 mt-1 text-sm">
							<li>{tTranslation("exam_info_not_found_reason_1", Language)}</li>
							<li>{tTranslation("exam_info_not_found_reason_2", Language)}</li>
							<li>{tTranslation("exam_info_not_found_reason_3", Language)}</li>
						</ul>
					</div>

					<MyButton
						className='w-full'
						variant={"gray"}
						onClick={onClose}
					>
						{t("exam_info_close")}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}


const Language: LanguageTranslations = {
	en: {
		reason: "Possible reasons for this include:",
		exam_info_not_found_reason_1: "Room ID is incorrect or has been mistyped.",
		exam_info_not_found_reason_2: "Exam is currently not available.",
		exam_info_not_found_reason_3: "Number of participants has reached the limit.",
	},
	vi: {
		reason: "Một số lý do bao gồm:",
		exam_info_not_found_reason_1: "Mã phòng không chính xác hoặc đã bị gõ sai.",
		exam_info_not_found_reason_2: "Bài thi hiện tại không khả dụng.",
		exam_info_not_found_reason_3: "Số lượng người tham gia đã đạt đến giới hạn.",
	}
}