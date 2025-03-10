import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GradientBorderGood from "../../../../../components/GradientBorder.good";
import TestCard from "./TestCard";
import { DifficultyLevel, FilterParams, useGetTestListPageDataQuery, useLazyGetFilteredQuery } from "./list.test-api";
import FilterModal from "./FilterModal";
import FetchStateContent from "../../components/FetchStateContent";
import MyPagination from "../../components/MyPagination";
import { useLazyGetCompaniesQuery } from "../../../../Account/account.api";

const perPage = 5;

const TestList: React.FC = () => {
	const [filters, setFilters] = useState<FilterParams>({
		minMinute: 0,
		maxMinute: 150,
		difficulty: "",
		tags: [],
		searchName: "",
		page: 1,
		perPage: perPage,
	});
	const [isFilterModalOpen, setFilterModalOpen] = useState(false);
	const [selectedTagsIndex, setSelectedTagsIndex] = useState<number[]>([]);

	const { data: pageData, isLoading: isLoading_tags, error: error_tags } = useGetTestListPageDataQuery();
	const [getTests, { data: tests, isLoading: isLoading_tests, error: error_tests }] = useLazyGetFilteredQuery();
	const [getCompany, { data: companies, isLoading: isLoading_companies, error: error_companies }] = useLazyGetCompaniesQuery();

	let totalPage = 0;
	let suggestedTags: string[] = [];
	if (pageData) {
		suggestedTags = pageData.suggestedTags;
	}
	if (tests) {
		totalPage = tests.totalPage;
	}

	const handleApplyFilters = (appliedFilters: {
		minMinute: number;
		maxMinute: number;
		difficulty: DifficultyLevel;
	}) => {
		setFilters((prev) => ({ ...prev, ...appliedFilters }));
		setFilterModalOpen(false);
	};

	const handleApplyTags = (tagIndex: number) => {
		if (!suggestedTags) return;
		const tags = [...filters.tags];
		const index = tags.indexOf(suggestedTags[tagIndex]);
		if (index === -1) {
			tags.push(suggestedTags[tagIndex]);
		} else {
			tags.splice(index, 1);
		}
		setSelectedTagsIndex((prev) => {
			const i = prev.indexOf(tagIndex);
			if (i === -1) {
				return [...prev, tagIndex];
			} else {
				return prev.filter((_, index) => index !== i);
			}
		});
		setFilters((prev) => ({ ...prev, tags }));
	}

	const handleApplySearchInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setFilters((prev) => ({
			...prev,
			searchName: e.target.value
		}));
	};

	const handleApplyPageChange = (page: number) => {
		setFilters((prev) => ({
			...prev,
			page
		}));
	};

	useEffect(() => {
		getTests(filters);
	}, [filters, getTests]);

	useEffect(() => {
		const companyIds = tests?.data.map((test) => test.companyId) ?? [];
		getCompany(companyIds);
	}, [tests, getCompany]);

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<header className="flex flex-col mb-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">Interview Questions</h1>
					<div className="w-1/3 pl-4">
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							placeholder="Search..."
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon color="action" />
										</InputAdornment>
									),
								},
							}}
							onChange={handleApplySearchInput}
						/>
					</div>
				</div>
				<span className="text-sm text-blue-chill-500">
					Review this list of {tests?.data.length ?? 0} interview questions and answers verified by hiring managers and candidates.
				</span>
			</header>
			<main className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left column */}
				<div className="col-span-2">
					<div className="flex flex-row justify-start items-stretch gap-5 mb-4">
						<FilterModal
							open={isFilterModalOpen}
							onClose={() => setFilterModalOpen(false)}
							meta={filters}
							onApplyFilters={handleApplyFilters}
						/>
						<div className="h-fit text-white w-fit bg-primary flex items-center justify-center rounded-md cursor-pointer p-2" onClick={() => setFilterModalOpen(true)}>
							<FilterListIcon /> <span className="ml-2 ">Filters</span>
						</div>
					</div>

					{/* List of questions */}
					<FetchStateContent
						isLoading={isLoading_tests || isLoading_companies}
						error={error_tests || error_companies}
						skeletonHeight={240}
						skeletonAmount={2}>
						<div className="shadow-primary px-6 py-8 rounded-xl">
							{tests?.data.map((question) => (
								<TestCard company={companies?.find(x => x.ID)?.name ?? ""} key={question.ID} {...question} />
							))}
						</div>
					</FetchStateContent>
					<div className="flex flex-row justify-center w-full pt-10">
						<MyPagination totalPage={totalPage} onPageChange={handleApplyPageChange} />
					</div>
				</div>

				{/* Right column */}
				<aside>
					<section className="shadow-primary mb-8 px-6 pt-4 pb-8 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">Tags</h2>

						{/* List of tags */}
						<FetchStateContent
							isLoading={isLoading_tags}
							error={error_tags}
							skeletonHeight={60}>
							<div className="flex flex-wrap gap-2">
								{suggestedTags.map((role, index) => (
									<GradientBorderGood
										className={`cursor-pointer select-none ${selectedTagsIndex.includes(index) ? "text-white" : "text-black"}`}
										onClick={() => handleApplyTags(index)}
										bgClass={selectedTagsIndex.includes(index) ? "bg-blue-chill-700" : null}
										key={index}>
										{role}
									</GradientBorderGood>
								))}
							</div>
						</FetchStateContent>
					</section>
					<section className="shadow-secondary mb-8 px-6 pt-4 pb-8 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">Interviewed recently</h2>
						<p className="text-sm text-gray-700">
							Help improve our question database (and earn karma) by telling us
							about your experience
						</p>
					</section>
				</aside>
			</main>
		</div>
	);
};

export default TestList;