import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import { useGetTestsByTestIdQuery, useGetTestsByTestIdQuestionsQuery } from "../../../../../features/tests/api/test.api-gen-v2";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import { TestConverter } from "../../../../../features/tests/ui-items/test/test-converter";
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import SidebarActions from "../../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import TitleSkeleton from "../../../../../features/tests/ui/skeletons/TitleSkeleton";
import ManagerTestEditMain from "./main";

export type EditTabs = "info" | "questions";

export default function ManagerTestEditPage() {
	const testId = useGetTestIdParams();

	const testQuery = useGetTestsByTestIdQuery({ testId });
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({ testId, viewCorrectAnswer: "1" });

	const isLoading = testQuery.isLoading || questionsQuery.isLoading;
	const error = testQuery.error || questionsQuery.error;
	const isSuccess = testQuery.isSuccess && questionsQuery.isSuccess;
	const data = isSuccess
		? TestConverter.testFullWithQuestions_2_examPersistCore(testQuery.data, questionsQuery.data)
		: undefined;

	return (
		<FetchStateCover2
			fetchState={{
				isLoading,
				error,
				data,
			}}
			loadingComponent={
				<RightLayoutTemplate
					header={<TitleSkeleton />}
					right={
						<SidebarActions>
							<div className="bg-gray-200 animate-pulse w-full h-64" />
						</SidebarActions>
					}
				>
					<div className="w-full h-full">
						<div className="bg-gray-200 animate-pulse w-full h-64" />
					</div>
				</RightLayoutTemplate>
			}
			dataComponent={(data) => {
				if (!data) throw new Error("Test is not in EXAM mode!");
				return (
					<ManagerTestEditMain data={data} />
				);
			}}
		/>
	);
}
