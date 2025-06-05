import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import SidebarActions from "../../../../features/tests/ui/sidebar/SidebarActions";
import UserGeneratedTestsSection from "./components/UserGeneratedTestsSection";
import useQueryPracticeTestsServer from "./hooks/useQueryPracticeTestsServer";
import { parseQueryError } from "../../../../helpers/fetchBaseQuery.error";

export default function CandidateTestsPage() {
	const navigate = useNavigate();
	const {
		state,
		totalPages,
		total,
		data,
		filters,
		setFilters,
	} = useQueryPracticeTestsServer();

	const handleManageTest = (testId: string) => {
		navigate(paths.candidate.tests.in(testId).PRACTICE);
	};

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
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
			<div className="flex flex-col gap-8">
				{state.isLoading && (
					<div className="flex justify-center items-center h-32">
						<span className="loader"></span>
					</div>
				)}
				{state.isError && (
					<div className="flex justify-center items-center h-32">
						<p className="text-red-500">Error loading tests: {parseQueryError(state.error)}</p>
					</div>
				)}

				{/* Manage your generated tests */}
				<UserGeneratedTestsSection
					total={total}
					totalPages={totalPages}
					tests={data}
					onManageTest={handleManageTest}
					onPageChange={page => setFilters({ ...filters, page })}
				/>
			</div>
		</NewLeftLayoutTemplate>
	);
};