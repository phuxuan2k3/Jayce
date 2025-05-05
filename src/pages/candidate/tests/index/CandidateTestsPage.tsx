import React, { useEffect, useState } from "react";
import FilterModal from "./components/FilterModal";
import TestList from "./components/TestList";
import TagsList from "./components/TagsList";
import { GetTestsApiArg } from "../../../../features/tests/api/test.api-gen";
import { useLocation } from "react-router-dom";
import RightLayoutTemplate from "../../../../components/layouts/RightLayoutTemplate";
import { ListFilter } from "lucide-react";
import SearchBar from "../../../../components/ui/common/SearchBar";
import { useDebounce } from "../../../../components/hooks/useDebounce";

const CandidateTestsPage: React.FC = () => {
	const location = useLocation();
	const initFilters = location.state?.filters as GetTestsApiArg || {
		perPage: 5,
		page: 1,
		searchTitle: "",
		difficulty: [],
		minMinutesToAnswer: 0,
		maxMinutesToAnswer: 150,
		tags: [],
	}
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [filters, setFilters] = useState<GetTestsApiArg>(initFilters);
	const [searchText, setSearchText] = useState<string>(filters.searchTitle || "");
	const deboucedSearchText = useDebounce(searchText, 500);
	useEffect(() => {
		setFilters((prev) => ({ ...prev, searchTitle: deboucedSearchText }));
	}, [deboucedSearchText]);

	return (
		<RightLayoutTemplate
			header={{
				title: "Interview Questions",
				description: "Review this list of interview questions and answers verified by hiring managers and candidates.",
			}}
			right={
				<div className="max-h-[90vh] sticky top-2 flex flex-col gap-8">
					<div className="flex flex-row justify-between items-stretch gap-4 font-sans">
						<SearchBar
							text={searchText}
							onTextChange={(text) => setSearchText(text)}
							placeholder="Search by title"
						/>
						<div className="font-medium text-white bg-primary flex items-center justify-center rounded-md cursor-pointer px-4 py-2" onClick={() => setIsFilterModalOpen(true)}>
							<ListFilter strokeWidth={2.5} size={20} />
							<span className="ml-2">
								Filters
							</span>
						</div>
					</div>

					<div className="shadow-primary h-fit lg:max-h-[400px] px-6 pt-4 pb-8 rounded-lg overflow-hidden">
						<TagsList
							filterTags={filters.tags}
							onTagsChange={(tags) => setFilters((prev) => ({ ...prev, tags }))}
						/>
					</div>

					<div className="shadow-secondary px-6 pt-4 pb-8 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">Interviewed recently</h2>
						<p className="text-sm text-gray-700">
							Help improve our question database (and earn karma) by telling us
							about your experience
						</p>
					</div>
				</div>
			}>

			<TestList
				filter={filters}
				setFilters={setFilters} />

			<FilterModal
				open={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
				filters={filters}
				setFilters={setFilters}
			/>
		</RightLayoutTemplate>
	);
};

export default CandidateTestsPage;