import { useParams } from 'react-router-dom'

export default function useGetTestIdParams(): string {
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");
	return testId;
}
