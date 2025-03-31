import FetchState from "../../../../../components/wrapper/FetchState";
import Pagination from "../../../../../components/ui/common/Pagination";
import SkeletonLoading from "../../../../../components/ui/loading/SkeletonLoading";
import { GetTestsApiArg, useGetTestsQuery } from "../../../../../features/tests/api/test.api-gen";
import TestCard from "./TestCard";

type Props = {
	filter: GetTestsApiArg;
	setFilters: React.Dispatch<React.SetStateAction<GetTestsApiArg>>;
}

export default function TestList({ filter, setFilters }: Props) {
	const { data: tests, isLoading, error } = useGetTestsQuery(filter);

	const handleApplyPageChange = (page: number) => {
		setFilters((prev) => ({
			...prev,
			page
		}));
	};

	return (
		<div className="w-full">
			<div className="shadow-primary px-6 py-8 rounded-xl">
				<FetchState
					isLoading={isLoading}
					error={error}
					loadingNode={
						<div className="grid grid-cols-1 gap-4">
							<SkeletonLoading className="w-full h-48" />
							<SkeletonLoading className="w-full h-48" />
						</div>
					}>
					{tests?.data.map((test) => (
						<TestCard company="#company" key={test.id} {...test} />
					))}
				</FetchState>
			</div>
			<div className="flex flex-row justify-center w-full pt-10">
				<Pagination totalPage={tests?.totalPages || 0} onPageChange={handleApplyPageChange} />
			</div>
		</div>
	);
}
