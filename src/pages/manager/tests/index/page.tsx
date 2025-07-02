import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import { useCallback, useState } from "react";
import { ClipboardPlus } from "lucide-react";
import { useGetTestsQuery } from "../../../../features/tests/api/test.api-gen-v2";
import useGetUserId from "../../../../features/tests/hooks/useGetUserId";
import TestCoreCard from "../../../../features/tests/ui-items/test/TestCoreCard";
import FetchStateCover2 from "../../../../features/tests/ui/fetch-states/FetchStateCover2";
import QuickAction from "../../../../features/tests/ui/sidebar/primitive/QuickAction";
import SidebarActions from "../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import { QuerySortValues } from "../../../../features/tests/types/query";
import MyItemsListTemplate from "../../../../features/tests/templates/MyItemsListTemplate";
import MyHeaderTitleSection from "../../../../features/tests/ui/sections/MyHeaderSection";

type Filter = {
	page: number;
	perPage: number;
	searchTitle?: string;
	sortCreatedAt?: QuerySortValues;
	sortTitle?: QuerySortValues;
}

const ManagerTestsPage = () => {
	const navigate = useNavigate();
	const userId = useGetUserId();

	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		searchTitle: "",
		sortCreatedAt: undefined,
		sortTitle: undefined,
	});

	const examsQuery = useGetTestsQuery({
		mode: "EXAM",
		authorId: userId,
		page: filter.page,
		perPage: filter.perPage,
		searchTitle: filter.searchTitle,
		sortCreatedAt: filter.sortCreatedAt,
		sortTitle: filter.sortTitle,
	});

	const handleExamView = useCallback((testId: string) => {
		navigate(paths.manager.tests.in(testId).ROOT);
	}, []);

	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={
				<SidebarActions title='Quick Actions'>
					<QuickAction
						title='Create exam'
						icon={<ClipboardPlus size={20} />}
						description='Create a new exam'
						onClick={() => navigate(paths.manager.tests.NEW)}
					/>
					<QuickAction
						title='Manage your exams'
						icon={<ClipboardPlus size={20} />}
						description='View and Edit or Delete your exams'
						onClick={() => { }}
					/>
				</SidebarActions>
			}
		>
			<MyItemsListTemplate
				pagedFetchState={examsQuery}
				paging={filter}
				onPageChange={(page: number) => setFilter(prev => ({ ...prev, page }))}
				heading={
					<MyHeaderTitleSection
						title="Your Exams"
						description="View and manage the exams you have created."
					/>
				}
				body={<FetchStateCover2
					fetchState={examsQuery}
					dataComponent={({ data }) => (
						<div className="flex-1 flex flex-col gap-4 w-full">
							{data.map((test, index) => (
								<TestCoreCard
									className="w-full"
									key={index}
									test={test}
									onClick={() => handleExamView(test.id)}
								/>
							))}
						</div>
					)}
				/>}
			/>
		</LeftLayoutTemplate>
	);
}

export default ManagerTestsPage;