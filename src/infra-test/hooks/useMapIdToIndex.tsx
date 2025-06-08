import { useMemo } from "react";

export default function useMapIdToIndex<U extends string | number, T extends { id: U }>(questionsToDoArray: Array<T>) {
	const mapIdToIndex: Record<U, number> = useMemo(() => {
		return questionsToDoArray?.reduce((acc, item, index) => {
			acc[item.id] = index;
			return acc;
		}, {} as Record<U, number>) || {};
	}, [questionsToDoArray]);

	return {
		mapIdToIndex,
	}
}
