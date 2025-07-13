import { TestFullSchema, useGetTestsQuery } from "../../../../../features/tests/api/test.api-gen-v2"
import FetchStateCover2 from "../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../../../features/tests/ui-sections/MyPaginationSection";
import { PagingFilter } from "../../../../../features/tests/types/query";
import { useState } from "react";
import ExamCard from "./ExamCard";
import TestListSkeleton from "../../../../../features/tests/ui/skeletons/TestListSkeleton";
import { useLanguage } from "../../../../../LanguageProvider";

type Filter = PagingFilter;

export default function PublicExamsSection({
	onExamClick,
}: {
	onExamClick: (exam: TestFullSchema) => void;
}) {
	const { t } = useLanguage();

	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 5,
	});

	const testsQuery = useGetTestsQuery({
		mode: "EXAM",
		page: filter.page,
		perPage: filter.perPage,
		actions: "view",
	});

	return (
		<div className="flex-1 justify-between flex flex-col gap-8">
			<h2 className="text-2xl font-semibold text-primary">
				{t("public_exams_section_title")}
			</h2>

			<div className="flex-1 items-center flex flex-col gap-4">
				<FetchStateCover2
					fetchState={testsQuery}
					loadingComponent={<TestListSkeleton />}
					dataComponent={({ data }) => (data.length === 0) ? (
						<div className="flex flex-col items-center justify-center min-h-fit h-32 text-gray-500">
							<p className="text-lg">{t("public_exams_no_test")}</p>
							<p className="text-sm">{t("public_exams_suggestion")}</p>
						</div>
					) : (
						<div className="flex flex-col gap-4 w-full">
							{data.map((test) => (
								<ExamCard
									className="w-full"
									key={test.id}
									test={test}
									onClick={() => onExamClick(test)}
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
