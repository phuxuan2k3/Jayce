import AttemptList from '../../common/components/test-details/AttemptsList'
import ParticipantStatisticCard from './ParticipantStatistic'
import UserCoreCard from '../../../../../../infra-test/ui-items/user/UserCoreCard'
import { getUserCore } from '../../../../../../infra-test/core/user.model'
import { ArrowLeft } from 'lucide-react'
import { useGetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateQuery, useGetExamsByTestIdCandidateAndCandidateIdAttemptsQuery } from '../../../../../../infra-test/api/test.api-gen'
import { useState } from 'react'
import MyPagination from '../../../../../../components/ui/common/MyPagination'
import { useGetUsersQuery } from '../../../../../../features/auth/api/auth-profile.api'
import SpinnerLoading from '../../../../../../components/ui/loading/SpinnerLoading'
import { FetchError } from '../../../../../../app/server-error'

type Filter = {
	page: number;
	perPage: number;
	sort: string;
}

export default function ParticipantsResult({
	testId,
	candidateId,
	onBack,
}: {
	testId: string;
	candidateId: string | null;
	onBack: () => void;
}) {
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		sort: 'createdAt',
	});

	const candidateAggregateQuery = useGetExamsByTestIdCandidateAndCandidateIdAttemptsAggregateQuery({
		testId,
		candidateId: candidateId || '',
	}, {
		skip: !candidateId,
	});

	const usersQuery = useGetUsersQuery({
		user_ids: candidateId ? [candidateId] : []
	}, {
		skip: !candidateId,
	});

	const attemptsQuery = useGetExamsByTestIdCandidateAndCandidateIdAttemptsQuery({
		testId,
		candidateId: candidateId || '',
		...filter,
	}, {
		skip: !candidateId,
	});

	const isLoading = candidateAggregateQuery.isLoading || attemptsQuery.isLoading || usersQuery.isLoading;
	const error = candidateAggregateQuery.error || attemptsQuery.error || usersQuery.error;

	if (isLoading) return <SpinnerLoading />;
	if (error) throw new FetchError(error);

	const aggregate = candidateAggregateQuery.data;
	const attempts = attemptsQuery.data?.data;
	const participant = usersQuery.data?.users[0] ? getUserCore(usersQuery.data?.users[0]) : undefined;

	return (
		<>
			<div className='grid grid-cols-[3fr_4fr] gap-4'>
				<div className='col-span-2 flex items-center'>
					<div className='flex items-center cursor-pointer rounded-md bg-gray-100 text-gray-700' onClick={onBack}>
						<ArrowLeft />
						<span className='text-sm ml-2'>Back</span>
					</div>
					<div className='flex-1 text-center font-bold text-lg'>
						<h3>Candidate's Exam Profile</h3>
					</div>
				</div>
				{candidateId ? (
					<div className='flex items-center justify-center col-span-2'>
						<p className='text-gray-500'>Select a candidate to view their results</p>
					</div>
				) : (!participant || !aggregate || !attempts ? (
					<div className='flex items-center justify-center col-span-2'>
						<p className='text-gray-500'>No data available</p>
					</div>
				) : (
					<>
						<div className='flex flex-col h-fit gap-2 p-4'>
							<UserCoreCard
								user={participant}
							/>
							<ParticipantStatisticCard
								attemptAggregate={aggregate}
							/>
						</div>
						<div className='flex flex-col gap-4 p-2'>
							<AttemptList
								attempts={attempts}
								page={filter.page}
								perPage={filter.perPage}
							/>
							<MyPagination
								initialPage={filter.page}
								totalPage={attemptsQuery.data?.totalPages || 1}
								onPageChange={(page) => setFilter({ ...filter, page })}
							/>
						</div>
					</>
				))}
			</div>
		</>
	);
}
