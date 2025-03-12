import React, { useEffect, useState } from 'react';

interface TestTimerProps {
	timeLeft: number | null;
	isEnded: boolean;
	className?: string;
}

const TestTimer: React.FC<TestTimerProps> = ({
	className,
	timeLeft,
	isEnded
}) => {
	const [displayTime, setDisplayTime] = useState<string>("--:--");
	const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

	useEffect(() => {
		// Initialize when we first get the timeLeft from context
		if (timeLeft !== null) {
			if (timeLeft <= 0) {
				setIsTimeUp(true);
				setDisplayTime("00:00");
			} else {
				setIsTimeUp(false);
			}
		}
	}, [timeLeft]);

	useEffect(() => {
		if (timeLeft === null || timeLeft <= 0 || isEnded) {
			setIsTimeUp(true);
			setDisplayTime("00:00");
			return;
		}

		// Format the time for display
		const formatTime = (seconds: number): string => {
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
		};

		setDisplayTime(formatTime(timeLeft));

		// Set up the countdown
		const timer = setInterval(() => {
			setDisplayTime((prevDisplay) => {
				const [mins, secs] = prevDisplay.split(':').map(Number);
				let totalSeconds = mins * 60 + secs - 1;

				if (totalSeconds <= 0) {
					clearInterval(timer);
					setIsTimeUp(true);
					return "00:00";
				}

				return formatTime(totalSeconds);
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, isEnded]);

	return (
		<div className={`test-timer ${className || ''} ${isTimeUp ? 'time-up' : ''}`}>
			<div className="timer-display">
				{isTimeUp ? (
					<div className="time-up-message">Time's up!</div>
				) : (
					<div className="countdown">{displayTime}</div>
				)}
			</div>
		</div>
	);
};

export default TestTimer;