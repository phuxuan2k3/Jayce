import { useState } from 'react';
import { cn } from '../../../../../app/cn';
import { QuestionContext, ShowAnswerContext } from '../contexts';
import { BaseComponentProps } from '../types';
import MyDialog from '../../../../ui/MyDialog';
import { TriggerSlider } from '../../../../ui/TriggerSlider';

const TextAnswerAsConst = {
	"CORRECT": {
		color: cn("bg-green-100 border-green-500 text-green-800"),
		text: "Correct Answer",
	},
	"PARTIALLY_CORRECT": {
		color: cn("bg-yellow-100 border-yellow-500 text-yellow-800"),
		text: "Partially Correct Answer",
	},
	"INCORRECT": {
		color: cn("bg-red-100 border-red-500 text-red-800"),
		text: "Incorrect Answer",
	},
	"PENDING_REVIEW": {
		color: cn("bg-blue-100 border-blue-500 text-blue-800"),
		text: "Pending Review",
	},
}

export const commonBoxClassNames = cn("py-2 text-gray-800 px-4 border rounded-lg text-sm");

const commonSliderButtonClassNames = (isShow: boolean) => cn(
	commonBoxClassNames,
	'border-gray-300 shadow-sm hover:bg-gray-200 text-sm font-semibold hover:underline',
	isShow && "rounded-b-none",
);

export function LongAnswerDetail({
	className = "",
}: BaseComponentProps) {
	const { show } = ShowAnswerContext.useShowAnswer();
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<ExtraText />
			<ImageLinks />
			<hr className="border-gray-300" />
			<AnswerText />
			{show && <CorrectAnswerText />}
		</div>
	);
}

function AnswerText({
	className = "",
}: BaseComponentProps) {
	const answerDetail = QuestionContext.useLongAnswerAnswerDetail();
	const answer = QuestionContext.useAnswer();
	const { question } = QuestionContext.useQuestion();
	const showResult = ShowAnswerContext.useShowAnswer().show;

	if (answerDetail == null || answer == null) return null;

	const pointReceived = answer.pointReceived;
	const points = question.points;

	let status = TextAnswerAsConst.PENDING_REVIEW;
	if (showResult) {
		if (pointReceived == null) {
			status = TextAnswerAsConst.PENDING_REVIEW;
		} else if (pointReceived >= points) {
			status = TextAnswerAsConst.CORRECT;
		} else if (pointReceived > 0) {
			status = TextAnswerAsConst.PARTIALLY_CORRECT;
		} else {
			status = TextAnswerAsConst.INCORRECT;
		}
	}

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<div className={cn(commonBoxClassNames, "px-6 py-3")}>
				<h1 className='text-base mb-2'>Your answer:</h1>
				{answerDetail.answer ? answerDetail.answer : "No answer provided."}
			</div>
			{showResult && (
				<div className={cn(commonBoxClassNames, "font-semibold", status.color)}>
					Status: {status.text}
				</div>
			)}
		</div>
	);
}

function CorrectAnswerText({
	className = "",
}: BaseComponentProps) {
	const correctAnswer = QuestionContext.useLongAnswerDetail().correctAnswer;
	return (
		<div className={cn(commonBoxClassNames, TextAnswerAsConst.CORRECT.color, className)}>
			{correctAnswer ? correctAnswer : "No correct answer provided."}
		</div>
	);
}

function ExtraText({
	className = "",
}: BaseComponentProps) {
	const extraText = QuestionContext.useLongAnswerDetail().extraText;
	return (
		<TriggerSlider
			trigger={({ onClick, isShow }) => (
				<button
					className={cn(commonSliderButtonClassNames(isShow), className)}
					onClick={onClick}
				>
					{isShow ? "Hide Extra Description" : "Show Extra Description"}
				</button>
			)}
		>
			<div className={cn(commonBoxClassNames, "border-t-0 mt-0 rounded-t-none text-sm", className)}>
				{extraText ? extraText : <span>No extra description provided.</span>}
			</div>
		</TriggerSlider>
	);
}

function ImageLinks({
	className = "",
}: BaseComponentProps) {
	const imageLinks = QuestionContext.useLongAnswerDetail().imageLinks;
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<>
			<TriggerSlider
				trigger={({ onClick, isShow }) => (
					<button
						className={cn(commonSliderButtonClassNames(isShow), className)}
						onClick={onClick}
					>
						{isShow ? "Hide Images" : "Show Images"}
					</button>
				)}
			>
				<div className={cn(
					commonBoxClassNames,
					'w-full border-t-0 rounded-t-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-clip',
				)}>
					{imageLinks == null || imageLinks.length === 0 ? (
						<span>No images provided.</span>
					) : (
						imageLinks.map((link, index) => (
							<div
								key={index}
								className="p-2 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg"
								onClick={() => setSelectedImage(link)}
							>
								<img
									src={link}
									alt={`Detail image ${index + 1}`}
									className="max-h-[24rem] w-full object-cover rounded-lg shadow-md"
								/>
							</div>
						))
					)}
				</div>
			</TriggerSlider>

			{selectedImage && (
				<MyDialog>
					<div className="relative w-full h-full flex items-center justify-center bg-black bg-opacity-75 p-4">
						<button
							className="absolute top-2 right-2 text-white text-2xl"
							onClick={() => setSelectedImage(null)}
						>&times;</button>
						<img
							src={selectedImage}
							alt="Zoomed image"
							className="max-w-screen max-h-[90vh] rounded-lg shadow-lg object-cover"
						/>
					</div>
				</MyDialog>
			)}
		</>
	);
};

