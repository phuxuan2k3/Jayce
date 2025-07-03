import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useGetAttemptsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import { PagingFilter } from "../../../types/query";
import AttemptsTable from "../../../ui-items/attempt/AttemptsTable";
import UserCoreCard from "../../../ui-items/user/UserCoreCard";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui-sections/MyPaginationSection";
import ParticipantStatisticCard from "./ParticipantStatistic";
import { ParticipantUser } from "./type";

export default function ParticipantsResult({
	participantUser: { user, participant },
	onBack,
}: {
	participantUser: ParticipantUser;
	onBack: () => void;
}) {
	const testId = useGetTestIdParams();

	const [filter, setFilter] = useState<PagingFilter>({
		page: 1,
		perPage: 10,
	});
	const attemptsQuery = useGetAttemptsQuery({
		testId,
		candidateId: participant.candidateId,
		...filter,
	});

	return (
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

			<div className='flex flex-col h-fit gap-2 p-4'>
				<UserCoreCard user={user} />
				<ParticipantStatisticCard participant={participant} />
			</div>

			<FetchStateCover2
				fetchState={attemptsQuery}
				dataComponent={(paged) => (
					<div className='flex flex-col gap-4'>
						<AttemptsTable
							attempts={paged.data}
						/>
						<MyPaginationSection
							totalPages={paged.totalPages}
							total={paged.total}
							page={filter.page}
							perPage={filter.perPage}
							onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
						/>
					</div>
				)}
			/>
		</div>
	);
}
