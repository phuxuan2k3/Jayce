import SidebarActions from "../../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import { TemplateHelpSection } from "../../../../../features/tests/ui-sections/help-sections/TemplateHelpSection";
import MyInput from "../../../../../features/tests/ui/forms/MyInput";
import WithSearch from "../../../../../features/tests/ui/forms/WithSearch";
// import { DifficultiesAsConst } from "../../../../manager/tests/new/common/base-schema";
// import MyCheckbox from "../../../../../features/tests/ui/forms/MyCheckbox";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import { ArrowLeft } from "lucide-react";

interface TemplatesSidebarProps {
	// filters: string[];
	// onFiltersChange: (difficulty: string[]) => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
	isCreateNew: boolean;
	onCreateNew: () => void;
	onBackToList: () => void;
}

const TemplatesSidebar = ({
	// filters,
	// onFiltersChange,
	searchTerm,
	onSearchChange,
	isCreateNew,
	onCreateNew,
	onBackToList,
}: TemplatesSidebarProps) => {
	return (
		<SidebarActions
			title={undefined}
		>
			{isCreateNew ? (<SidebarActions.CreateNewTemplate
				onCreateNewTemplate={onCreateNew}
			/>) : (
				<QuickAction
					title="Back to List"
					onClick={onBackToList}
					icon={<ArrowLeft className="h-5 w-5" />}
					description="Return to the list of templates"
				/>
			)}

			<hr className="border-primary-toned-300 my-4" />

			<WithSearch inputComponent={
				<MyInput
					type="text"
					id="search"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search templates..."
				/>
			} />

			{/* <h3 className="col-span-3 text-lg font-semibold text-primary-toned-700">Filter by Difficulty</h3>

			<div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4 px-4">
				{DifficultiesAsConst.map((difficulty) => (
					<MyCheckbox
						key={difficulty}
						label={difficulty}
						checked={filters.includes(difficulty)}
						className="text-sm"
						onChange={(checked) => {
							if (checked) {
								onFiltersChange([...filters, difficulty]);
							}
							else {
								onFiltersChange(filters.filter((d) => d !== difficulty));
							}
						}}
					/>
				))}
			</div> */}

			<TemplateHelpSection />

		</SidebarActions>
	);
};

export default TemplatesSidebar;


