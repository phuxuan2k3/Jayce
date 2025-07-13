import { Grid, Table } from "lucide-react";
import MyButton from "../../../../../features/tests/ui/buttons/MyButton";
import React from "react";
import { useLanguage } from "../../../../../LanguageProvider";

interface TestViewControlsProps {
	view: "grid" | "table";
	setView: React.Dispatch<React.SetStateAction<"grid" | "table">>;
}

const ButtonControls: React.FC<TestViewControlsProps> = ({
	view,
	setView,
}) => {
	const { t } = useLanguage();

	return (
		<div className="flex-1 flex justify-end items-center gap-2">
			<span className="font-semibold text-sm text-gray-500">
				{t("manager_tests_view_as")}
			</span>
			<MyButton
				size="medium"
				variant="outline"
				className="w-24 flex justify-start items-center gap-2"
				onClick={() => setView((prev) => (prev === "grid" ? "table" : "grid"))}
			>
				{view === "grid" ? (
					<>
						<Grid className="h-4 w-4" />
						{t("manager_tests_grid")}
					</>
				) : (
					<>
						<Table className="h-4 w-4" />
						{t("manager_tests_table")}
					</>
				)}
			</MyButton>
		</div>
	);
};

export default ButtonControls;
