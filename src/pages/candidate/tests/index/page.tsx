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
import SidebarActions from "../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import MyItemsListTemplate from "../../../../features/tests/ui-templates/MyItemsListTemplate";
import MyHeaderTitleSection from "../../../../features/tests/ui-sections/MyHeaderSection";

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
					<SidebarActions.GenerateTestPremium />
					<SidebarActions.BrowseTemplates />
					<SidebarActions.JoinExam />
				</SidebarActions>
			}
		>
			<MyItemsListTemplate
				pagedFetchState={testsQuery}
				paging={filter}
				onPageChange={(page) => setFilters(prev => ({ ...prev, page }))}
				heading={
					<MyHeaderTitleSection
						title="Your Generated Tests"
						description="View and manage the practice tests you've generated."
					/>
				}
				body={
					<FetchStateCover2
						fetchState={{ ...testsQuery }}
						loadingComponent={
							<div className="flex flex-col w-full gap-4">
								<div className="h-48 rounded-lg bg-gray-200 animate-pulse" />
								<div className="h-48 rounded-lg bg-gray-200 animate-pulse" />
							</div>
						}
						dataComponent={({ data: tests }) => (
							tests.length > 0 ? (
								tests.map(test => (
									<TestCoreCard
										className="w-full"
										key={test.id}
										test={test}
										onClick={(test) => navigate(paths.candidate.tests.in(test.id).PRACTICE)}
									/>
								))
							) : (
								<div className="w-full h-full flex flex-col gap-4 min-h-full items-center justify-center">
									<p className="text-gray-500">You haven't generated any tests yet.</p>
									<MyButton onClick={() => navigate(paths.candidate.tests.GENERATE)}>
										Create Your First Test
									</MyButton>
								</div>
							)
						)}
					/>
				}
			/>


		</LeftLayoutTemplate >
	);
};