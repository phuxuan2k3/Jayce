import React from 'react';
import MyPagination from '../../../../../trash/components/MyPagination';
import { useState } from 'react';
import AttemptCardFinished from './AttemptCardFinished';
import AttemptCardInProgress from './AttemptCardInProgress';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../../features/Test/hooks/useGetTestIdParams';
import { GetTestsByTestIdAttemptsApiArg, useGetTestsByTestIdAttemptsQuery, useGetTestsByTestIdQuery } from '../../../../../features/Test/api/test.api-gen';
import FetchState from '../../../../../components/wrapper/FetchState';

const mockCompany = {
	name: "Company",
	imageUrl: "https://cdn.iconscout.com/icon/free/png-256/free-hashtag-icon-download-in-svg-png-gif-file-formats--number-symbol-ui-user-interface-vol-1-pack-icons-2202562.png",
};
const perPage = 5;

const TestAttemtpsPage: React.FC = () => {
	const testId = useGetTestIdParams();
	const [filters, setFilters] = useState<GetTestsByTestIdAttemptsApiArg>({
		testId,
		page: 1,
		perPage: perPage,
	});
	const testQuery = useGetTestsByTestIdQuery({ testId });
	const attemptsQuery = useGetTestsByTestIdAttemptsQuery(filters);
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

export default TestAttemtpsPage;