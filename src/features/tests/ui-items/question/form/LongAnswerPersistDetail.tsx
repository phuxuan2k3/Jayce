import { LongAnswerDetail } from '../types';
import MyTextArea from '../../../ui/forms/MyTextArea';
import MyFieldLayout from '../../../ui/forms/MyFieldLayout';
import { useLanguage } from '../../../../../LanguageProvider';

export default function LongAnswerPersistDetail({
	detail,
	onQuestionChange,
}: {
	detail: LongAnswerDetail;
	onQuestionChange: (edit: Partial<LongAnswerDetail>) => void;
}) {
	const { t } = useLanguage();

	const correctAnswer = detail.correctAnswer ?? '';
	const imageLinks = detail.imageLinks ?? [];
	const extraText = detail.extraText ?? '';

	const handleCorrectAnswerChange = (value: string) => {
		onQuestionChange({ ...detail, correctAnswer: value, type: 'LONG_ANSWER', imageLinks, extraText });
	};
	const handleExtraTextChange = (value: string) => {
		onQuestionChange({ ...detail, extraText: value, type: 'LONG_ANSWER', imageLinks, correctAnswer });
	};

	// const handleImageLinkChange = (index: number, value: string) => {
	// 	const newImageLinks = imageLinks.map((link: string, i: number) => (i === index ? value : link));
	// 	onQuestionChange({ ...detail, imageLinks: newImageLinks, type: 'LONG_ANSWER', correctAnswer, extraText });
	// };
	// const handleAddImageLink = () => {
	// 	onQuestionChange({ ...detail, imageLinks: [...imageLinks, ''], type: 'LONG_ANSWER', correctAnswer, extraText });
	// };
	// const handleDeleteImageLink = (index: number) => {
	// 	const newImageLinks = imageLinks.filter((_: string, i: number) => i !== index);
	// 	onQuestionChange({ ...detail, imageLinks: newImageLinks, type: 'LONG_ANSWER', correctAnswer, extraText });
	// };

	return (
		<div className="flex flex-col gap-4 w-full text-gray-600">
			{/* Correct Answer */}
			<MyFieldLayout>
				<span className='font-semibold text-sm'>{t("long_answer_correct_answer")}</span>
				<MyTextArea
					value={correctAnswer || ''}
					onChange={(e) => handleCorrectAnswerChange(e.target.value)}
					placeholder={t("long_answer_correct_answer_placeholder")}
					minRows={2}
				/>
			</MyFieldLayout>

			{/* Extra Information */}
			<div className='flex flex-col gap-4 w-full'>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">{t("long_answer_extra_text")}</span>
					<MyTextArea
						value={extraText || ''}
						onChange={(e) => handleExtraTextChange(e.target.value)}
						placeholder={t("long_answer_extra_text_placeholder")}
						minRows={1}
					/>
				</div>

				{/* Image Links */}
				{/* <div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Image Links (optional)</span>
					{imageLinks.length === 0 && (
						<span className="text-xs text-gray-400">No image links added.</span>
					)}
					{imageLinks.map((link: string, index: number) => (
						<div key={index} className="flex items-center gap-2">
							<input
								type="text"
								value={link}
								onChange={(e) => handleImageLinkChange(index, e.target.value)}
								className="flex-1 bg-gray-50 border border-primary rounded-lg px-2 py-1 text-sm"
								placeholder="Image URL"
							/>
							<FontAwesomeIcon
								icon={faXmark}
								className="w-4 h-4 text-gray-500 cursor-pointer"
								onClick={() => handleDeleteImageLink(index)}
							/>
						</div>
					))}
					<div
						className="text-xs cursor-pointer font-semibold text-primary underline mt-2 w-fit"
						onClick={handleAddImageLink}
					>
						+ Add image link
					</div>
				</div> */}
			</div>
		</div>
	);
}
