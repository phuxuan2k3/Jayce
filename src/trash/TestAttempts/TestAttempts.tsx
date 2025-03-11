import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '../../router/path';
import { TestAttemptsResponse, useGetTestDisplayQuery, useLazyGetAttemptsQuery } from './attempt.test-api';
import { Attempt, FilterParams, TestAttemptsProps, TestStatus } from './types';
import FetchStateContent from '../../pages/Test/components/FetchStateContent';
import MyPagination from '../../pages/Test/components/MyPagination';
import { useEffect, useState } from 'react';
import { useGetCompaniesQuery } from '../../features/Account/account.api';
import { Paged } from '../../interfaces/paged.type';
import AttemptCard from './AttemptCard';

const perPage = 5;
const bufferTestResponseData: TestAttemptsResponse = {
	ID: '',
	companyId: '',
	createdAt: Date().toString(),
	title: '',
	description: '',
	minutesToAnswer: 0,
	tags: [],
	answerCount: 0,
	highestScore: 0,
};

const bufferCompanyData = {
	id: '',
	name: '',
	imageUrl: '',
};

const bufferAttemptsData: Paged<Attempt> = {
	page: 0,
	perPage: 0,
	totalPage: 0,
	data: [],
};

const TestDetail: React.FC = () => {
	const navigate = useNavigate();
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");
	const [filter, setFilter] = useState<FilterParams>({
		testId,
		page: 1,
		perPage,
	});

	const {
		data: data_TestDisplay,
		isLoading: isLoading_TestDisplay,
		error: error_TestDisplay
	} = useGetTestDisplayQuery(testId);
	const testAttemptsResponse = data_TestDisplay ?? bufferTestResponseData;

	const { data: data_companies, isLoading: isLoading_companies, error: error_companies } = useGetCompaniesQuery([testAttemptsResponse.companyId]);
	const companyProps = data_companies?.[0] ?? bufferCompanyData;

	const testAttemptsProps: TestAttemptsProps = {
		...testAttemptsResponse,
		company: companyProps.name,
	}
	const isLoadingProps = isLoading_TestDisplay || isLoading_companies;
	const errorProps = error_TestDisplay || error_companies;

	const [getAttempts, { data: data_PagedAttemps, isLoading: isLoading_PagedAttempts, error: error_PagedAttempts }] = useLazyGetAttemptsQuery();
	const pagedAttempts = data_PagedAttemps ?? bufferAttemptsData;

	const handleStartNewQuiz = () => {
		navigate(paths.TEST.do(testId));
	};

	const handleBackToQuestions = () => {
		navigate(paths.TEST.LIST);
	};

	const handleOnAttemptClick = (attemptId: string, attemptStatus: TestStatus) => {
		if (attemptStatus !== TestStatus.InProgress) {
			navigate(paths.TEST.viewAnswer(testId, attemptId));
		} else {
			navigate(paths.TEST.do(testId));
		}
	};

	const handleViewEvaluated = () => {
		navigate(paths.TEST.evaluate(testId));
	}

	const handlePaging = (page: number) => {
		setFilter({ ...filter, page });
	}

	useEffect(() => {
		getAttempts(filter);
	}, [filter, getAttempts]);

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<h1 className="text-2xl font-bold mb-6">
					<FetchStateContent isLoading={isLoadingProps} error={errorProps} skeletonHeight={20}>
						{testAttemptsProps.title}
					</FetchStateContent>
				</h1>
				<div className="flex">

					{/* AttempHistory */}
					<div className="flex-1 flex-column bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
						<FetchStateContent isLoading={isLoading_PagedAttempts} error={error_PagedAttempts} skeletonAmount={2}>
							{pagedAttempts.data.map((attempt) => (
								<AttemptCard
									key={attempt.ID}
									attempt={attempt}
									companyProps={companyProps}
									testAttemptsProps={testAttemptsProps}
									handleOnAttemptClick={handleOnAttemptClick}
								/>
							))}
							<div className="w-full text-2xl text-center font-bold text-primary mt-10 mb-6">
								<span>Highest score: {testAttemptsProps.highestScore}</span>
							</div>
						</FetchStateContent>

						<div className="flex justify-center pt-5">
							<MyPagination totalPage={pagedAttempts.totalPage} onPageChange={handlePaging} />
						</div>
					</div>

					{/* Sidebar */}
					<div className="w-64 ml-4">
						<button className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleStartNewQuiz}>
							Start a new quiz
						</button>
						<button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackToQuestions}>
							Back to Questions
						</button>
						<div className="mt-4 bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
							<h3 className="text-lg font-bold">Notes</h3>
							<p className="text-sm text-[#39A0AD] mt-2">
								Please read each question carefully and double-check your
								answers. Manage your time wisely, stay calm, and focus on
								accuracy rather than speed. Good luck!
							</p>
						</div>
						<button className="mt-4 w-full border bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg cursor-pointer" onClick={handleViewEvaluated}>
							View Evaluated
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TestDetail;