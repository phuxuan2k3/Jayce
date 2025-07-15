import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { useState } from "react";
import { useGetTestsQuery } from "../../../../features/tests/api/test.api-gen-v2";
import useGetUserId from "../../../../features/tests/hooks/useGetUserId";
import { PagingFilter, QuerySortValues } from "../../../../features/tests/types/query";
import PracticeCoreCard from "./components/PracticeCoreCard";
import MyButton from "../../../../features/tests/ui/buttons/MyButton";
import FetchStateCover2 from "../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyItemsListTemplate from "../../../../features/tests/ui-templates/MyItemsListTemplate";
import MyHeaderTitleSection from "../../../../features/tests/ui-sections/MyHeaderSection";
import Sidebar from "./components/Sidebar";
import { LanguageTranslations, useLanguage } from "../../../../LanguageProvider";
import MyInputWithSearch from "../../../../features/tests/ui/forms/MyInputWithSearch";
import MyInput from "../../../../features/tests/ui/forms/MyInput";
import MyButtonWithSort from "../../../../features/tests/ui/buttons/MyButtonWithSort";
import { useDebounce } from "../../../../components/hooks/useDebounce";

type Filter = PagingFilter & {
	sortCreatedAt?: QuerySortValues;
	sortTitle?: QuerySortValues;
}

export default function CandidateTestsPage() {
	const { t, tTranslation } = useLanguage();
	const tLocal = (key: string) => tTranslation(key, lang);

	const navigate = useNavigate();
	const userId = useGetUserId();

	const [search, setSearch] = useState<string>("");
	const searchDebounced = useDebounce(search, 300);
	const [filter, setFilters] = useState<Filter>({
		page: 1,
		perPage: 10,
		sortCreatedAt: "desc",
		sortTitle: "asc",
	});

	const testsQuery = useGetTestsQuery({
		page: filter.page,
		perPage: filter.perPage,
		searchTitle: searchDebounced,
		sortCreatedAt: filter.sortCreatedAt,
		sortTitle: filter.sortTitle,
		authorId: userId,
		mode: "PRACTICE",
	});

	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
					title={t("candidate_tests_header_title")}
					description={t("candidate_tests_header_desc")}
				/>
			}
			left={
				<Sidebar />
			}
		>
			<MyItemsListTemplate
				pagedFetchState={testsQuery}
				paging={filter}
				onPageChange={(page) => setFilters(prev => ({ ...prev, page }))}
				heading={
					<MyHeaderTitleSection
						title={t("candidate_tests_heading_title")}
						description={t("candidate_tests_heading_desc")}
					/>
				}
				body={
					<div className="flex flex-col gap-4 p-4 min-w-full min-h-full">
						<div className="flex items-center gap-16 mb-4">
							<div className="flex-1">
								<MyInputWithSearch
									inputComponent={
										<MyInput
											placeholder={tLocal("search_by_title")}
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											className="w-full"
										/>
									}
								/>
							</div>
							<div className="flex items-center justify-end gap-2 flex-1">
								<MyButtonWithSort
									sort={filter.sortCreatedAt}
									setSort={(sort) => setFilters(prev => ({ ...prev, sortCreatedAt: sort }))}
								>
									Sort Date
								</MyButtonWithSort>
							</div>
						</div>
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
										<PracticeCoreCard
											className="w-full"
											key={test.id}
											test={test}
											onClick={(test) => navigate(paths.candidate.tests.in(test.id).PRACTICE)}
										/>
									))
								) : searchDebounced.trim() === "" ? (
									<div className="w-full h-full flex flex-col gap-4 min-h-full items-center justify-center">
										<p className="text-gray-500">{t("candidate_tests_empty_msg")}</p>
										<MyButton onClick={() => navigate(paths.candidate.tests.GENERATE)}>
											{t("candidate_tests_create_button")}
										</MyButton>
									</div>
								) : (
									<div className="w-full h-full flex flex-col gap-4 min-h-full items-center justify-center">
										<p className="text-gray-500">
											{tLocal("practice_not_found_msg")}
										</p>
									</div>
								)
							)}
						/>
					</div>
				}
			/>
		</LeftLayoutTemplate >
	);
};

const lang: LanguageTranslations = {
	en: {
		search_by_title: "Search by title",
		practice_not_found_msg: "No practice tests found.",
	},
	vi: {
		search_by_title: "Tìm kiếm theo tiêu đề",
		practice_not_found_msg: "Không tìm thấy bài kiểm tra nào.",
	},
};