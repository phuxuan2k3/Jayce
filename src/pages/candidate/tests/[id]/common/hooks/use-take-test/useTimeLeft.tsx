import React from 'react'

export default function useSecondsLeft({
	minutes,
	startedAt,
}: {
	minutes: number;
	startedAt: Date;
}) {
	const [secondsLeft, setSecondsLeft] = React.useState<number>(0);
	React.useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const timeElapsed = Math.floor(
				(now.getTime() - startedAt.getTime()) / 1000 // Seconds
			);
			const totalTime = minutes * 60;
			const remainingTime = totalTime - timeElapsed;

			if (remainingTime <= 0) {
				clearInterval(interval);
				setSecondsLeft(0);
			} else {
				setSecondsLeft(remainingTime);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [minutes, startedAt]);

	return secondsLeft;
}
