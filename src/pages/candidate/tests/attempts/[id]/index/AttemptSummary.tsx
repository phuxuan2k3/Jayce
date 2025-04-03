import FetchState from "../../../../../../components/wrapper/FetchState";
import { useGetAttemptsByAttemptIdQuery } from "../../../../../../features/tests/api/test.api-gen";

type Props = {
	attemptId: number;
}

export default function TestInfo({ attemptId }: Props) {
	const { data, isLoading, error } = useGetAttemptsByAttemptIdQuery({ attemptId });

	return (
		<FetchState
			isLoading={isLoading}
			error={error}
		>
			<h1 className="text-2xl font-bold mb-6">{data?.test.title}</h1>
			<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
				<span>Number of Questions: {data?.totalQuestions}</span>
				<span>Total Score: {data?.score}/{data?.totalScore}</span>
			</div>
		</FetchState>
	)
}
