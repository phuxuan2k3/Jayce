import { useState } from 'react'
import FetchStateCover2 from '../../../ui/fetch-states/FetchStateCover2'
import useGetTestIdParams from '../../../hooks/useGetTestIdParams';
import { PagingFilter } from '../../../types/query';
import { AttemptCoreSchema, useGetAttemptsQuery } from '../../../api/test.api-gen-v2';
import MyPaginationSection from '../../../ui-sections/MyPaginationSection';
import AttemptsTable from '../../../ui-items/attempt/AttemptsTable';
import { useLanguage } from '../../../../../LanguageProvider';

export default function ParticipantAttempts({
	candidateId,
	onAttemptClick,
}: {
	candidateId: string;
	onAttemptClick: (attempt: AttemptCoreSchema) => void;
}) {
	const { t } = useLanguage();

	const testId = useGetTestIdParams();

	const [filter, setFilter] = useState<PagingFilter>({
		page: 1,
		perPage: 10,
	});
	const attemptsQuery = useGetAttemptsQuery({
		testId,
		candidateId: candidateId,
		...filter,
	});
	return (
		<div className='flex flex-col gap-4 h-full'>
			<FetchStateCover2
				fetchState={attemptsQuery}
				dataComponent={({ data }) => data.length > 0 ? (
					<div className='flex flex-col gap-4'>
						<AttemptsTable
							attempts={data}
							onItemClick={(attempt) => onAttemptClick(attempt)}
						/>
					</div>
				) : (
					<div className='w-full h-full flex items-center justify-center flex-col'>
						<p className='text-gray-600 mb-4'>{t("participant_attempts_empty")}</p>
					</div>
				)}
			/>

			<hr className='border-gray-200 mt-4' />

			<MyPaginationSection
				page={filter.page}
				perPage={filter.perPage}
				onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
				totalPages={attemptsQuery.data?.totalPages}
				total={attemptsQuery.data?.total}
			/>
		</div>
	)
}
