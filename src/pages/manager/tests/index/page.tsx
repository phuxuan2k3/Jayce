import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useCallback, useState } from "react";
import { FilePlus2 } from "lucide-react";
import ButtonControls from "./components/TestViewControls";
import { useGetTestsQuery } from "../../../../features/tests/api/test.api-gen-v2";
import useGetUserId from "../../../../features/tests/hooks/useGetUserId";
import FetchStateCover2 from "../../../../features/tests/ui/fetch-states/FetchStateCover2";
import { QuerySortValues } from "../../../../features/tests/types/query";
import MyHeaderTitleSection from "../../../../features/tests/ui-sections/MyHeaderSection";
import MyButton from "../../../../features/tests/ui/buttons/MyButton";
import MyInputWithSearch from "../../../../features/tests/ui/forms/MyInputWithSearch";
import MyInput from "../../../../features/tests/ui/forms/MyInput";
import MyPaginationSection from "../../../../features/tests/ui-sections/MyPaginationSection";
import ExamListViewLayout from "./components/ExamListViewLayout";
import { Status } from "./types";
import StatusDropdown from "./components/StatusDropdown";
import MyButtonWithSort from "../../../../features/tests/ui/buttons/MyButtonWithSort";
import { Skeleton } from "@mui/material";
import { useLanguage } from "../../../../LanguageProvider";
import { useDebounce } from "../../../../components/hooks/useDebounce";

type Filter = {
	page: number;
	perPage: number;
	sortCreatedAt?: QuerySortValues;
	sortTitle?: QuerySortValues;
}

const ManagerTestsPage = () => {
	const { t } = useLanguage();

	const navigate = useNavigate();
	const userId = useGetUserId();
	const [view, setView] = useState<"grid" | "table">("grid");

	const [statuses, setStatuses] = useState<Status[]>([]);
	const [search, setSearch] = useState<string>("");
	const searchDebounced = useDebounce(search, 300);

	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 12,
		sortCreatedAt: "desc",
		sortTitle: undefined,
	});

	const examsQuery = useGetTestsQuery({
		mode: "EXAM",
		authorId: userId,
		page: filter.page,
		perPage: filter.perPage,
		searchTitle: searchDebounced,
		sortCreatedAt: filter.sortCreatedAt,
		sortTitle: filter.sortTitle,
		filterStatuses: statuses.length > 0 ? statuses : undefined,
	});

	const handleExamView = useCallback((testId: string) => {
		navigate(paths.manager.tests.in(testId).ROOT);
	}, []);

	return (
		<div className="container flex flex-col w-full mx-auto p-4 gap-4">
			<div className="min-h-32 h-fit w-full flex flex-col gap-4 py-4 px-8 bg-white border rounded-lg shadow-md shadow-primary">

				<div className="flex items-center w-full mb-2">
					<MyHeaderTitleSection
						title={t("manager_tests_title")}
						description={t("manager_tests_description")}
					/>

					<MyButton
						className="self-end ml-auto px-6"
						onClick={() => navigate(paths.manager.tests.NEW)}
					>
						<FilePlus2 strokeWidth={2.5} className="h-5 w-5" />
						<span className="hidden md:inline">{t("manager_tests_new_exam")}</span>
					</MyButton>
				</div>

				<div className="flex items-center w-full gap-4">
					<div className="flex flex-1 items-center gap-2">
						<MyInputWithSearch
							className="w-full"
							inputComponent={
								<MyInput
									variant={{
										size: "small"
									}}
									placeholder={t("manager_tests_search_placeholder")}
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							}
						/>
					</div>

					<div className="flex flex-1 gap-2 items-center justify-start">
						<MyButtonWithSort
							sort={filter.sortTitle}
							setSort={
								(prev) => setFilter((prevFilter) => ({
									...prevFilter,
									sortTitle: prev
								}))
							}
						>
							{t("manager_tests_sort_name")}
						</MyButtonWithSort>
						<MyButtonWithSort
							sort={filter.sortCreatedAt}
							setSort={
								(prev) => setFilter((prevFilter) => ({
									...prevFilter,
									sortCreatedAt: prev
								}))
							}
						>
							{t("manager_tests_sort_date")}
						</MyButtonWithSort>

						<StatusDropdown
							statuses={statuses}
							setStatuses={setStatuses}
						/>
					</div>
				</div>
			</div>

			<div className="p-8 flex-1 flex flex-col gap-4">
				<div>
					<ButtonControls view={view} setView={setView} />
				</div>

				<FetchStateCover2
					fetchState={examsQuery}
					loadingComponent={(
						<Skeleton
							variant="rectangular"
							className="w-full h-96 rounded-lg"
						/>
					)}
					dataComponent={({ data }) => (
						<ExamListViewLayout
							examList={data}
							onExamClick={(exam) => handleExamView(exam.id)}
							view={view}
						/>
					)}
				/>
			</div>

			<div className="mt-2 border-t border-gray-200 pt-2">
				<MyPaginationSection
					onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
					page={filter.page}
					perPage={filter.perPage}
					total={examsQuery.data?.total}
					totalPages={examsQuery.data?.totalPages}
				/>
			</div>


		</div>
	);
}

export default ManagerTestsPage;