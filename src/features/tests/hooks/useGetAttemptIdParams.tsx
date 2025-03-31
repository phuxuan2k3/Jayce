import { useParams } from "react-router-dom";

export default function useGetAttemptIdParams() {
	const { attemptId } = useParams<{ attemptId: string }>();
	if (!attemptId) throw new Error("Attempt ID is undefined");
	const numberId = parseInt(attemptId);
	if (isNaN(numberId)) throw new Error("Attempt ID is not a number");
	return numberId;
}
