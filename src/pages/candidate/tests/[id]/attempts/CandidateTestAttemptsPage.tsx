import React from 'react';
import { useState } from 'react';
import AttemptCard from './components/AttemptCard';
import Sidebar from './components/Sidebar';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import { GetUserTestsByTestIdAttemptsApiArg, useGetUserTestsByTestIdAttemptsQuery, useGetTestsByTestIdQuery, useGetCandidateCurrentAttemptStateQuery } from '../../../../../features/tests/api/test.api-gen';
import MyPagination from '../../../../../components/ui/common/MyPagination';
import CandidateTestsTemplate from '../../../../../features/tests/ui/layouts/CandidateTestsTemplate';
import { useGetUsersQuery } from '../../../../../features/auth/api/auth-profile.api';
import { SortAsc, SortDesc } from 'lucide-react';

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
		<CandidateTestsTemplate
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
				/>
			}
			aboveMain={
				<div className='w-full flex flex-row items-center justify-start mb-2 gap-2'>
					<button
						onClick={handleToggleSortByStartDate}
						className={`flex items-center gap-1  font-semibold px-4 py-2 rounded-lg border-2 border-primary ${filters.sortByStartDate !== undefined
							? "bg-primary text-white"
							: "bg-white text-primary"
							}`}>
						<span>Started Date</span>
						{filters.sortByStartDate === "asc" ? (
							<SortAsc />
						) : (
							<SortDesc />
						)}
					</button>
					<button
						onClick={handleToggleSortByScore}
						className={`flex items-center gap-1  font-semibold px-4 py-2 rounded-lg border-2 border-primary ${filters.sortByScore !== undefined
							? "bg-primary text-white"
							: "bg-white text-primary"}
							`}>
						<span>Score</span>
						{filters.sortByScore === "asc" ? (
							<SortAsc />
						) : (
							<SortDesc />
						)}
					</button>
				</div>
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
		</CandidateTestsTemplate>
	);
}

export default CandidateTestAttemtpsPage;