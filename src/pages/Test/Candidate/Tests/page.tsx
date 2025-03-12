import React, { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterModal from "./FilterModal";
import TestList from "./TestList/comp";
import TagsList from "./TagsList";
import Header from "./Header";
import { GetTestsApiArg } from "../../../../features/Test/api/test.api-gen";

const TestsPage: React.FC = () => {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [filters, setFilters] = useState<GetTestsApiArg>({
		perPage: 5
	});

	return (
		<div className="p-6 max-w-7xl mx-auto">

			<Header setFilters={setFilters} />

			<main className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left column */}
				<div className="col-span-2">
					<div className="flex flex-row justify-start items-stretch gap-5 mb-4">
						<FilterModal
							open={isFilterModalOpen}
							onClose={() => setIsFilterModalOpen(false)}
							filters={filters}
							setFilters={setFilters}
						/>
						<div className="h-fit text-white w-fit bg-primary flex items-center justify-center rounded-md cursor-pointer p-2" onClick={() => setIsFilterModalOpen(true)}>
							<FilterListIcon /> <span className="ml-2 ">Filters</span>
						</div>
					</div>

					<TestList
						filter={filters}
						setFilters={setFilters} />
				</div>

				{/* Right column */}
				<aside>
					<TagsList filter={filters} setFilters={setFilters} />
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

export default TestsPage;