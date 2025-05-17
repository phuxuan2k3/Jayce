import { useEffect, useMemo, useState } from 'react'
import usePracticePage from './usePracticePage';

export default function useShowQuestions() {
	const [showQuestions, setShowQuestions] = useState(false);
	const [isAgreedToShowQuestions, setIsAgreedToShowQuestions] = useState(false);

	const { data: {
		attemptAggregate,
	} } = usePracticePage();

	const hasAttempts = useMemo(() => {
		return attemptAggregate.totalAttempts ? attemptAggregate.totalAttempts > 0 : false
	}, []);

	const showWarning = useMemo(() => {
		if (isAgreedToShowQuestions) {
			return false;
		}
		return !hasAttempts && !isAgreedToShowQuestions;
	}, [isAgreedToShowQuestions, hasAttempts]);

	useEffect(() => {
		if (hasAttempts) {
			setShowQuestions(true);
			setIsAgreedToShowQuestions(true);
		}
	}, [hasAttempts]);

	const handleShowQuestions = () => {
		setShowQuestions(true);
		setIsAgreedToShowQuestions(true);
	};

	return {
		showWarning,
		showQuestions,
		handleShowQuestions,
	}
}
