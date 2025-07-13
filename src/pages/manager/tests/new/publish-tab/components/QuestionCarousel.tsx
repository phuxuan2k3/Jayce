import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuestionPersistCoreSchema } from '../../../../../../features/tests/ui-items/question/types';
import { cn } from '../../../../../../app/cn';
import { QuestionDefault } from '../../../../../../features/tests/ui-items/question/views/QuestionDefault';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function QuestionCarousel({
	questions,
}: {
	questions: QuestionPersistCoreSchema[];
}) {
	const { t } = useLanguage();

	const [index, setIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isMovingForward, setIsMovingForward] = useState(true);

	const handleIndexChange = (newIndex: number) => {
		if (newIndex === index) return;
		setPrevIndex(index);
		setIsMovingForward(newIndex > index);
		setIsAnimating(true);
		setTimeout(() => {
			setIndex(newIndex);
			setIsAnimating(false);
		}, 300); // match the animation duration
	};

	return (
		<div className="flex flex-col gap-4 flex-1 min-h-[400px] py-4">
			{animationStyle}
			<div className="flex gap-2 flex-1 items-center justify-between">
				<button
					className='bg-primary rounded-full p-2 text-white hover:bg-primary-toned-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={index === 0}
					onClick={() => handleIndexChange(Math.max(index - 1, 0))}
					aria-label={t("question_carousel_prev")}
				>
					<ArrowLeft />
				</button>
				<div className={cn("flex-1 relative", {
					"overflow-hidden": isAnimating
				})}>
					{questions.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>{t("question_carousel_no_question")}</p>
						</div>
					) : (
						<>
							{isAnimating && (
								<div
									className="absolute w-full h-full"
									style={{
										animation: isMovingForward
											? 'slideOutToLeft 0.3s ease-in-out forwards'
											: 'slideOutToRight 0.3s ease-in-out forwards'
									}}
								>
									<QuestionDefault
										className="w-full h-full"
										question={questions[prevIndex]}
										index={prevIndex}
										key={`prev-${prevIndex}`}
									/>
								</div>
							)}
							<div
								className={cn("w-full h-full", {
								})}
								style={{
									animation: isAnimating
										? (isMovingForward
											? 'slideInFromRight 0.3s ease-in-out'
											: 'slideInFromLeft 0.3s ease-in-out'
										)
										: 'none'
								}}
							>
								<QuestionDefault
									className="w-full h-full"
									question={questions[index]}
									index={index}
									key={`curr-${index}`}
								/>
							</div>
						</>
					)}
				</div>
				<button
					className='bg-primary rounded-full p-2 text-white hover:bg-primary-toned-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={index === questions.length - 1}
					onClick={() => handleIndexChange(Math.min(index + 1, questions.length - 1))}
					aria-label={t("question_carousel_next")}
				>
					<ArrowRight />
				</button>
			</div>

			{/* Navigation Dots */}
			{questions.length > 0 && (
				<div className="flex justify-center">
					<div className="flex gap-2 max-w-full overflow-x-auto px-4 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
						{questions.map((_, questionIndex) => (
							<button
								key={questionIndex}
								className={cn(
									"w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0",
									"hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
									{
										"bg-primary text-white shadow-md": questionIndex === index,
										"bg-gray-200 text-gray-600 hover:bg-gray-300": questionIndex !== index,
									}
								)}
								onClick={() => handleIndexChange(questionIndex)}
								aria-label={`${t("question_carousel_go_to")} ${questionIndex + 1}`}
								disabled={isAnimating}
							>
								{questionIndex + 1}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const animationStyle = <style>
	{`
					@keyframes slideInFromLeft {
						0% {
							opacity: 0;
							transform: translateX(-100%);
						}
						100% {
							opacity: 1;
							transform: translateX(0);
						}
					}
					@keyframes slideInFromRight {
						0% {
							opacity: 0;
							transform: translateX(100%);
						}
						100% {
							opacity: 1;
							transform: translateX(0);
						}
					}
					@keyframes slideOutToLeft {
						0% {
							opacity: 1;
							transform: translateX(0);
						}
						100% {
							opacity: 0;
							transform: translateX(-100%);
						}
					}
					@keyframes slideOutToRight {
						0% {
							opacity: 1;
							transform: translateX(0);
						}
						100% {
							opacity: 0;
							transform: translateX(100%);
						}
					}
				`}
</style>
