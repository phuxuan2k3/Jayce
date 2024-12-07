import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GradientBorderGood from "../../../../components/GradientBorder.good";
import TestCard from "./TestCard";
import { useGetSuggestedTagsQuery, useLazyGetFilteredQuery } from "./info.test-api";
import FilterModal from "./FilterModal";
import { DifficultyLevel, FilterProps } from "./types";
import FetchStateContent from "../../components/FetchStateContent";

const TestList: React.FC = () => {
	const [filters, setFilters] = useState<FilterProps>({
		minMinute: 30,
		maxMinute: 90,
		difficulty: "EASY",
		tags: [],
		searchName: "",
	});
	const [isFilterModalOpen, setFilterModalOpen] = useState(false);
	const [selectedTagsIndex, setSelectedTagsIndex] = useState<number[]>([]);

	const { data: suggestedTags, isLoading: isLoading_tags, error: error_tags } = useGetSuggestedTagsQuery();
	const [getTests, { data: tests, isLoading: isLoading_tests, error: error_tests }] = useLazyGetFilteredQuery();

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
	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setFilters((prev) => ({ ...prev, searchName: e.target.value }));
	};

	useEffect(() => {
		getTests(filters);
	}, [filters, getTests]);

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
							onChange={handleSearchInputChange}
						/>
					</div>
				</div>
				<span className="text-sm text-blue-chill-500">
					Review this list of {tests?.length ?? 0} interview questions and answers verified by hiring managers and candidates.
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
						<Button
							variant="contained"
							onClick={() => setFilterModalOpen(true)}
							startIcon={<FilterListIcon />}
						>
							Filters
						</Button>
					</div>

					{/* List of questions */}
					<FetchStateContent
						isLoading={isLoading_tests}
						error={error_tests}>
						<div className="shadow-primary px-6 py-8 rounded-xl">
							{tests?.map((question) => (
								<TestCard key={question.id} {...question} />
							))}
						</div>
					</FetchStateContent>
				</div>

				{/* Right column */}
				<aside>
					<section className="shadow-primary mb-8 px-6 pt-4 pb-8 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">Tags</h2>

						{/* List of tags */}
						<FetchStateContent
							isLoading={isLoading_tags}
							error={error_tags}>
							<div className="flex flex-wrap gap-2">
								{suggestedTags?.map((role, index) => (
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