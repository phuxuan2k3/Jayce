import React from 'react';
import { useState } from 'react';
import AttemptCard from './components/AttemptCard';
import Sidebar from './components/Sidebar';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import { GetUserTestsByTestIdAttemptsApiArg, useGetUserTestsByTestIdAttemptsQuery, useGetTestsByTestIdQuery, useGetCandidateCurrentAttemptStateQuery } from '../../../../../features/tests/api/test.api-gen';
import MyPagination from '../../../../../components/ui/common/MyPagination';
import RightLayoutTemplate from '../../../../../components/layouts/RightLayoutTemplate';
import { useGetUsersQuery } from '../../../../../features/auth/api/auth-profile.api';

const perPage = 5;

const CandidateTestAttemtpsPage: React.FC = () => {
	const testId = useGetTestIdParams();
	const [filters, setFilters] = useState<GetUserTestsByTestIdAttemptsApiArg>({
		testId,
		page: 1,
		perPage: perPage,
		sortByStartDate: "desc",
		sortByScore: "desc",
	});
	const testQuery = useGetTestsByTestIdQuery({ testId });
	const attemptsQuery = useGetUserTestsByTestIdAttemptsQuery(filters, {
		refetchOnMountOrArgChange: true,
	});

	const currentAttemptQuery = useGetCandidateCurrentAttemptStateQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	const managerQuery = useGetUsersQuery({
		user_ids: [Number(testQuery.data?.managerId) || 0]
	}, {
		skip: testQuery.data == null,
		refetchOnMountOrArgChange: true,
	})

	const handlePaging = (page: number) => {
		setFilters((prev) => ({ ...prev, page }));
	}

	const handleToggleSortByStartDate = () => {
		setFilters((prev) => ({
			...prev,
			sortByScore: undefined,
			sortByStartDate: prev.sortByStartDate === "asc" ? "desc" : "asc",
		}))
	}

	const handleToggleSortByScore = () => {
		setFilters((prev) => ({
			...prev,
			sortByStartDate: undefined,
			sortByScore: prev.sortByScore === "asc" ? "desc" : "asc",
		}))
	}

	return (
		<RightLayoutTemplate
			header={{
				title: testQuery.data?.title || "",
				description: testQuery.data?.description || "",
			}}
			right={
				<Sidebar
					attemptCardInprogressProps={{
						test: testQuery.data!,
						currentAttempt: currentAttemptQuery.data?.currentAttempt || null,
					}}
					onToggleSortByStartDate={handleToggleSortByStartDate}
					onToggleSortByScore={handleToggleSortByScore}
					filters={filters}
				/>
			}
		>
			<div className='flex flex-col'>
				{attemptsQuery.data?.total === 0 ? (
					<div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
						<p className="text-lg font-semibold">No attempts found</p>
					</div>
				) : null}
				{attemptsQuery.data && (
					<div className='flex flex-col h-full lg:max-h-[600px] overflow-y-auto'>
						{attemptsQuery.data.data.map((attempt) => (
							<AttemptCard
								key={attempt.id}
								{...attempt}
								author={{
									company: managerQuery.data?.users[0]?.metadata.company || "",
									avatar: managerQuery.data?.users[0]?.metadata.avatarPath || "",
								}}
								testDetail={testQuery.data!}
							/>
						))}
					</div>
				)}
				<div className="flex justify-center pt-5">
					<MyPagination totalPage={attemptsQuery.data?.totalPages || 0} onPageChange={handlePaging} />
				</div>
			</div>
		</RightLayoutTemplate>
	);
}

export default CandidateTestAttemtpsPage;