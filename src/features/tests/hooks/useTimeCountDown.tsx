import { useEffect, useState } from "react";

export default function useTimeCountDown({
	endDate,
}: {
	endDate: Date;
}) {
	const [secondsLeft, setSecondsLeft] = useState(() => {
		const now = new Date();
		return Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 1000));
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const diff = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 1000));
			setSecondsLeft(diff);
			if (diff <= 0) {
				clearInterval(interval);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [endDate]);

	return secondsLeft;
}
