import { useParams } from "react-router-dom";

export default function useGetAttemptIdParams() {
	const { attemptId } = useParams<{ attemptId: string }>();
	if (!attemptId) throw new Error("Attempt ID is undefined");
	return attemptId as string;
}
