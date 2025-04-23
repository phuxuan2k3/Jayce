import FetchState from "../../../../../components/wrapper/FetchState";
import MyPagination from "../../../../../components/ui/common/MyPagination";
import SkeletonLoading from "../../../../../components/ui/loading/SkeletonLoading";
import { GetTestsApiArg, useGetTestsQuery } from "../../../../../features/tests/api/test.api-gen";
import TestCard from "./TestCard";
import { useGetUsersQuery } from "../../../../../features/auth/api/auth-profile.api";
import { useMemo } from "react";

type Props = {
	filter: GetTestsApiArg;
	setFilters: React.Dispatch<React.SetStateAction<GetTestsApiArg>>;
}

export default function TestList({ filter, setFilters }: Props) {
	const { data: tests, isLoading, isFetching, error } = useGetTestsQuery({
		...filter,
		tags: filter.tags?.length ? filter.tags : undefined,
	}, {
		refetchOnMountOrArgChange: true,
	});

	const { data: managers } = useGetUsersQuery({
		user_ids: tests?.data.map((test) => Number(test.managerId)) || [],
	}, {
		skip: tests == null,
		refetchOnMountOrArgChange: true,
	});

	const normalizedManagers = useMemo(() => {
		if (!managers?.users) {
			return {};
		}
		return managers.users.reduce<Record<string, { company: string; avatarPath: string }>>(
			(acc, user) => {
				acc[user.id] = {
					company: user.metadata.company || "",
					avatarPath: user.metadata.avatarPath || ""
				};
				return acc;
			},
			{}
		);
	}, [managers]);

	const handleApplyPageChange = (page: number) => {
		setFilters((prev) => ({
			...prev,
			page
		}));
	};

	return (
		<div className="flex flex-col h-full gap-4">
			<FetchState
				isLoading={isLoading || isFetching}
				error={error}
				loadingNode={
					<div className="grid grid-cols-1 gap-4">
						<SkeletonLoading className="w-full h-48" />
						<SkeletonLoading className="w-full h-48" />
					</div>
				}>
				<div className="flex-1 flex flex-col gap-4 h-fit lg:max-h-[900px] overflow-y-auto">
					{tests?.data.length === 0 ? (
						<div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
							<p className="text-lg font-semibold">No tests found</p>
							<p className="text-sm">Try changing your filters</p>
						</div>
					) : (
						tests?.data.map((test) => {
							const manager = normalizedManagers[test.managerId];
							return (
								<TestCard
									company={manager?.company || ""}
									avatar={manager?.avatarPath || ""}
									key={test.id} {...test}
								/>
							)
						})
					)}
				</div>
			</FetchState>
			<div className="flex flex-row justify-center w-full pt-10">
				<MyPagination totalPage={tests?.totalPages || 0} onPageChange={handleApplyPageChange} />
			</div>
		</div>
	);
}
