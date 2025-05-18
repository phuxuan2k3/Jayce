import { useCallback, useMemo } from "react";
import { PracticeGenerationState } from "./reducer-types";

export default function usePracticeGenerationSelectors({
	state,
}: {
	state: PracticeGenerationState;
}) {
	const finalData = useMemo(() => {
		return {
			...state.data,
		}
	}, [state.data]);

	const verifyDataByStep = useCallback((step?: number) => {
		if (!state.data.title) {
			return {
				isValid: false,
				message: "Test title is required",
			}
		}
		if (!state.data.description) {
			return {
				isValid: false,
				message: "Test description is required",
			}
		}
		if (!state.data.minutesToAnswer) {
			return {
				isValid: false,
				message: "Test duration is required",
			}
		}
		if (!state.data.language) {
			return {
				isValid: false,
				message: "Test language is required",
			}
		}

		if (step === 0) return {
			isValid: true,
			message: "",
		};

		if (!state.data.difficulty) {
			return {
				isValid: false,
				message: "Test difficulty is required",
			}
		}
		if (!state.data.tags.length) {
			return {
				isValid: false,
				message: "Test tags are required",
			}
		}
		if (!state.data.numberOfQuestions) {
			return {
				isValid: false,
				message: "Number of questions is required",
			}
		}
		if (!state.data.numberOfOptions) {
			return {
				isValid: false,
				message: "Number of options is required",
			}
		}

		if (step === 1) return {
			isValid: true,
			message: "",
		};

		if (!state.data.outlines.length) {
			return {
				isValid: false,
				message: "Test outlines are required",
			}
		}

		return {
			isValid: true,
			message: "",
		}
	}, [state.data]);

	return {
		finalData,
		verifyData: verifyDataByStep,
	}
};