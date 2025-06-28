import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useState } from "react";
import { useGetTestsQuery } from "../../../../features/tests/api/test.api-gen-v2";
import useGetUserId from "../../../../features/tests/hooks/useGetUserId";
import { PagingFilter, QuerySortValues } from "../../../../features/tests/types/query";
import TestCoreCard from "../../../../features/tests/ui-items/test/TestCoreCard";
import MyButton from "../../../../features/tests/ui/buttons/MyButton";
import FetchStateCover2 from "../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../../features/tests/ui/MyPaginationSection";
import SidebarActions from "../../../../features/tests/ui/sidebar/primitive/SidebarActions";

type Filter = PagingFilter & {
	searchTitle?: string;
	sortCreatedAt?: QuerySortValues;
	sortTitle?: QuerySortValues;
}

export default function CandidateTestsPage() {
	const navigate = useNavigate();
	const userId = useGetUserId();

	const [filter, setFilters] = useState<Filter>({
		searchTitle: "",
		page: 1,
		perPage: 10,
		sortCreatedAt: "desc",
		sortTitle: "asc",
	});

	const testsQuery = useGetTestsQuery({
		page: filter.page,
		perPage: filter.perPage,
		searchTitle: filter.searchTitle,
		sortCreatedAt: filter.sortCreatedAt,
		sortTitle: filter.sortTitle,
		authorId: userId,
		mode: "PRACTICE",
	});

	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
					title="Skillsharp Tests"
					description="Join hosted tests or generate your own practice tests from templates"
				/>
			}
			left={
				<SidebarActions>
					<SidebarActions.BrowseTemplates />
					<SidebarActions.GenerateTest />
					<SidebarActions.JoinTest />
				</SidebarActions>
			}
		>
			<FetchStateCover2
				fetchState={testsQuery}
				dataComponent={({ data: tests, totalPages, total }) => (
					<div className="flex flex-col gap-8 border-b pb-6 border-primary-toned-200">
						<h2 className="text-2xl font-bold mb-4">Your Generated Tests</h2>
						<p className="text-primary-toned-700 mb-4">View and manage the practice tests you've generated.</p>

						{tests.length > 0 ? (
							<div className="flex flex-col gap-4">
								{tests.map(test => (
									<TestCoreCard
										key={test.id}
										test={test}
										onClick={(test) => navigate(paths.candidate.tests.in(test.id).PRACTICE)}
									/>
								))}

								<MyPaginationSection
									totalPages={totalPages}
									total={total}
									onPageChange={(page) => setFilters(prev => ({ ...prev, page }))}
									page={filter.page}
									perPage={filter.perPage}
								/>
							</div>
						) : (
							<div className="text-center p-8 bg-gray-50 rounded-lg">
								<p className="text-gray-500">You haven't generated any tests yet.</p>
								<MyButton onClick={() => navigate(paths.candidate.tests.GENERATE)}>
									Create Your First Test
								</MyButton>
							</div>
						)}
					</div>
				)}
			/>
		</LeftLayoutTemplate>
	);
};