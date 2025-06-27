import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import { useCallback, useState } from "react";
import { Filter } from "./type";
import { useGetTestsQuery } from "../../../../infra-test/api/test.api-gen-v2";
import useGetUserId from "../../../../infra-test/hooks/useGetUserId";
import FetchStateCover2 from "../../../../infra-test/ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../../infra-test/ui/MyPaginationSection";
import TestCoreCard from "../../../../infra-test/ui-items/test/TestCoreCard";
import { ClipboardPlus } from "lucide-react";
import QuickAction from "../../../../infra-test/ui/sidebar/primitive/QuickAction";
import SidebarActions from "../../../../infra-test/ui/sidebar/primitive/SidebarActions";

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
			<FetchStateCover2
				fetchState={examsQuery}
				dataComponent={({ totalPages, total, data }) => (
					<div className="flex flex-col gap-8 mt-4 mb-4 items-center">
						<div className="flex-1 flex flex-col gap-4 px-4">
							{data.map((test, index) => (
								<TestCoreCard
									key={index}
									test={test}
									onClick={() => handleExamView(test.id)}
								/>
							))}
						</div>

						<MyPaginationSection
							onPageChange={(page: number) => setFilter(prev => ({ ...prev, page }))}
							totalPages={totalPages}
							page={filter.page}
							perPage={filter.perPage}
							total={total}
						/>
					</div>
				)}
			/>
		</LeftLayoutTemplate>
	);
}

export default ManagerTestsPage;