import { memo, useEffect, useRef } from 'react'

export default memo(function InterviewStatus({
	currentQuestion,
	totalQuestion,
}: {
	currentQuestion: number;
	totalQuestion: number;
}) {
	const progressBarRef = useRef<HTMLDivElement | null>(null);
	const totalBarRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (progressBarRef.current && totalBarRef.current) {
			const totalWidth = totalBarRef.current.clientWidth;
			const progressWidth = (currentQuestion / totalQuestion) * totalWidth;
			progressBarRef.current.style.width = `${progressWidth}px`;
		}
	}, [currentQuestion, totalQuestion, progressBarRef.current, totalBarRef.current]);

	return (
		<div className='bg-gray-200 rounded-lg shadow-md flex items-center justify-center flex-col w-full h-full px-8 py-4 opacity-30 hover:opacity-100 transition-opacity duration-300 ease-in-out gap-y-4'>
			<span className='text-gray-700 font-semibold text-lg'>
				Question {currentQuestion} of {totalQuestion}
			</span>
			<div ref={totalBarRef}
				className='w-full h-3 relative bg-gray-300 rounded-full overflow-hidden'>
				<div
					className='bg-primary rounded-full overflow-hidden h-full z-10 p-1'
					ref={progressBarRef}
				>
				</div>
			</div>
		</div>
	)
});
