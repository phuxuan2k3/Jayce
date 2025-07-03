import { FetchState } from "../types/fetch-state";
import { PagedResponse } from "../types/response";
import MyPaginationSection from "../ui-sections/MyPaginationSection";

export default function MyItemsListTemplate({
	heading,
	body,
	paging,
	pagedFetchState,
	onPageChange,
}: {
	heading: React.ReactNode;
	body: React.ReactNode;
	paging: {
		page: number;
		perPage: number;
	};
	pagedFetchState: FetchState<PagedResponse<any>>;
	onPageChange: (page: number) => void;
}) {
	return (
		<div className="flex flex-col min-h-full">
			{heading}

			<hr className="border-primary-toned-300 my-4" />

			<div className="flex-1 flex flex-col items-center gap-4">
				{body}
			</div>

			<hr className="border-primary-toned-300 my-4" />

			<MyPaginationSection
				totalPages={pagedFetchState.data?.totalPages}
				total={pagedFetchState.data?.total}
				onPageChange={onPageChange}
				page={paging.page}
				perPage={paging.perPage}
			/>
		</div>
	)
}
