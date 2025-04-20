import React from 'react';
import { useState } from 'react';
import AttemptCardFinished from './components/AttemptCardFinished';
import AttemptCardInProgress from './components/AttemptCardInProgress';
import Sidebar from './components/Sidebar';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import { GetUserTestsByTestIdAttemptsApiArg, useGetUserTestsByTestIdAttemptsQuery, useGetTestsByTestIdQuery } from '../../../../../features/tests/api/test.api-gen';
import FetchState from '../../../../../components/wrapper/FetchState';
import MyPagination from '../../../../../components/ui/common/MyPagination';

const mockCompany = {
	name: "Company",
	imageUrl: "https://cdn.iconscout.com/icon/free/png-256/free-hashtag-icon-download-in-svg-png-gif-file-formats--number-symbol-ui-user-interface-vol-1-pack-icons-2202562.png",
};
const perPage = 5;

const CandidateTestAttemtpsPage: React.FC = () => {
	const testId = useGetTestIdParams();
	const [filters, setFilters] = useState<GetUserTestsByTestIdAttemptsApiArg>({
		testId,
		page: 1,
		perPage: perPage,
	});
	const testQuery = useGetTestsByTestIdQuery({ testId });
	const attemptsQuery = useGetUserTestsByTestIdAttemptsQuery(filters);
	const highestScore = attemptsQuery.data?.data.reduce((acc, curr) => {
		if (acc < curr.score) {
			return curr.score;
		}
		return acc;
	}, 0) || 0;

	const handlePaging = (page: number) => {
		setFilters((prev) => ({ ...prev, page }));
	}

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<h1 className="text-2xl font-bold mb-6">
					<FetchState
						isLoading={testQuery.isLoading}
						error={testQuery.error}
					>
						{testQuery.data?.title}
					</FetchState>
				</h1>
				<div className="flex">
					<div className='flex flex-col flex-1'>
						<FetchState
							isLoading={testQuery.isLoading}
							error={testQuery.error}
						>
							{testQuery.data != null && <AttemptCardInProgress
								company={mockCompany}
								test={testQuery.data}
							/>}
						</FetchState>

						<div className="flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
							<FetchState isLoading={attemptsQuery.isLoading} error={attemptsQuery.error}>
								{attemptsQuery.data?.data.map((attempt) => (
									<AttemptCardFinished
										key={attempt.id}
										attempt={attempt}
										test={testQuery.data!}
										company={mockCompany}
									/>
								))}
								<div className="w-full text-2xl text-center font-bold text-primary mt-10 mb-6">
									<span>Highest score: {highestScore}</span>
								</div>
								<div className="flex justify-center pt-5">
									<MyPagination totalPage={attemptsQuery.data?.totalPages || 0} onPageChange={handlePaging} />
								</div>
							</FetchState>
						</div>
					</div>

					<Sidebar />

				</div>
			</div>
		</div>
	);
}

export default CandidateTestAttemtpsPage;