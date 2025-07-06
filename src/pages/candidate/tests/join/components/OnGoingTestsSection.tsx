import { useNavigate } from "react-router-dom";
import { useGetTestsQuery } from "../../../../../features/tests/api/test.api-gen-v2"
import useGetUserId from "../../../../../features/tests/hooks/useGetUserId"
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import paths from "../../../../../router/paths";
import MyPaginationSection from "../../../../../features/tests/ui-sections/MyPaginationSection";
import { PagingFilter } from "../../../../../features/tests/types/query";
import { useState } from "react";
import TestCoreCard from "../../../../../features/tests/ui-items/test/TestCoreCard";

type Filter = PagingFilter;

export default function OnGoingTestsSection() {
	const userId = useGetUserId();
	const navigate = useNavigate();

	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
	});

	const testsQuery = useGetTestsQuery({
		candidateId: userId,
		mode: "EXAM",
		page: filter.page,
		perPage: filter.perPage,
	});

	return (
		<div className="flex-1 justify-between flex flex-col gap-8">
			<h2 className="text-xl font-semibold text-primary">
				Ongoing Exams
			</h2>

			<div className="flex-1 items-center flex flex-col gap-4">
				<FetchStateCover2
					fetchState={testsQuery}
					dataComponent={({ data }) => data.length === 0 ? (
						<div className="text-center text-gray-500">
							<p className="text-lg">No ongoing tests found.</p>
							<p className="text-sm">You can join a test using a room ID or create your own.</p>
						</div>
					) : (
						<div className="flex flex-col gap-4 w-full">
							{data.map((test) => (
								<TestCoreCard
									className="w-full"
									key={test.id}
									test={test}
									onClick={() => navigate(paths.candidate.tests.in(test.id).ROOT)}
								/>
							))}
						</div>
					)}
				/>
			</div>

			<MyPaginationSection
				page={filter.page}
				perPage={filter.perPage}
				total={testsQuery.data?.total}
				totalPages={testsQuery.data?.totalPages}
				onPageChange={(page) => setFilter(prev => ({ ...prev, page }))}
			/>
		</div>
	)
}
