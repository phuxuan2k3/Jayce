import { useState } from "react";
import EditTestQuestions from "./components/EditTestQuestions";
import { Snackbar, Alert } from "@mui/material";
import { useTestPersistContext } from "../../../../../features/tests/reducers/test-persist.context";
import { Trash2 } from "lucide-react";
import { useDeleteManagerTestsByTestIdMutation } from "../../../../../features/tests/legacy/test.api-gen";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import TestEditForm from "./components/TestEditForm";

type Tab = "detail" | "questions";

export default function ManagerTestEditMain() {
	const navigate = useNavigate();
	const [tab, setTab] = useState<Tab>("detail");
	const [snackbar, setSnackbar] = useState<{
		snackOpen: boolean;
		snackMessage: string;
		snackSeverity: 'error' | 'info' | 'success' | 'warning'
	}>({
		snackOpen: false,
		snackMessage: '',
		snackSeverity: 'info'
	});
	const { snackOpen, snackMessage, snackSeverity } = snackbar;

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, snackOpen: false });
	};

	const { fields, dispatch } = useTestPersistContext();

	const [deleteTest] = useDeleteManagerTestsByTestIdMutation();
	const handleDeleteTest = async () => {
		try {
			const res = await deleteTest({ testId: 1 });
			if (res.error) {
				setSnackbar({
					snackOpen: true,
					snackMessage: "Failed to delete test",
					snackSeverity: "error"
				});
				return;
			}
			setSnackbar({
				snackOpen: true,
				snackMessage: "Test deleted successfully",
				snackSeverity: "success"
			});
			navigate(paths.manager.tests.ROOT);
		} catch (error) {
			setSnackbar({
				snackOpen: true,
				snackMessage: "Failed to delete test",
				snackSeverity: "error"
			});
		}
	};

	return (
		<>
			<LeftLayoutTemplate
				header={{
					title: "Edit your test",
					description: "You can edit your test here!",
				}}
				left={
					<div className="h-fit lg:h-[96vh] w-full flex flex-col gap-4 p-6 shadow-primary bg-white rounded-lg">
						<TabButton
							onClick={() => setTab("detail")}
							isActive={tab === "detail"}
							label="Details"
						/>
						<TabButton
							onClick={() => setTab("questions")}
							isActive={tab === "questions"}
							label="Questions"
						/>

						<hr className="border-primary-toned-300 mt-auto my-4" />

						<button
							className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
							onClick={handleDeleteTest}>
							<Trash2 size={20} />
							<span>Delete Test</span>
						</button>
					</div>
				}
			>
				{tab === "detail" && (
					<TestEditForm
						onChange={({ key, value }) => dispatch({
							type: "UPDATE_TEST_FIELDS",
							payload: {
								[key]: value,
							}
						})}
						testFields={fields}
					/>
				)}
				{tab === "questions" && <EditTestQuestions />}
			</LeftLayoutTemplate>

			<Snackbar
				open={snackOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackSeverity}>
					{snackMessage}
				</Alert>
			</Snackbar>
		</>
	);
}

function TabButton({
	onClick,
	isActive,
	label,
}: {
	onClick: () => void;
	isActive: boolean;
	label: string;
}) {
	return (
		<button
			className={`font-semibold py-2 px-4 rounded-lg ${isActive ? "bg-primary text-white " : "bg-white text-primary border-primary border"} `}
			onClick={onClick}
		>
			{label}
		</button>
	);
}