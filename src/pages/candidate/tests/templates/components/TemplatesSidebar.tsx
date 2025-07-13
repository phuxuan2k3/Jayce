import SidebarActions from "../../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import { TemplateHelpSection } from "../../../../../features/tests/ui-sections/help-sections/TemplateHelpSection";
import MyInput from "../../../../../features/tests/ui/forms/MyInput";
import MyInputWithSearch from "../../../../../features/tests/ui/forms/MyInputWithSearch";
// import { DifficultiesAsConst } from "../../../../manager/tests/new/common/base-schema";
// import MyCheckbox from "../../../../../features/tests/ui/forms/MyCheckbox";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../../../../LanguageProvider";

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
	const { t } = useLanguage();
	
	return (
		<SidebarActions
			title={undefined}
		>
			{isCreateNew ? (<SidebarActions.CreateNewTemplate
				onCreateNewTemplate={onCreateNew}
			/>) : (
				<QuickAction
					title={t("templates_sidebar_back_to_list")}
					onClick={onBackToList}
					icon={<ArrowLeft className="h-5 w-5" />}
					description={t("templates_sidebar_back_to_list_description")}
				/>
			)}

			<hr className="border-primary-toned-300 my-4" />

			<MyInputWithSearch inputComponent={
				<MyInput
					type="text"
					id="search"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder={t("templates_sidebar_search_placeholder")}
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


