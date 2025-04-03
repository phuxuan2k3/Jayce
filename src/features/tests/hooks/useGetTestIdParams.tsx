import { useParams } from 'react-router-dom'

export default function useGetTestIdParams() {
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");
	const numberId = parseInt(testId);
	if (isNaN(numberId)) throw new Error("Test ID is not a number");
	return numberId;
}
