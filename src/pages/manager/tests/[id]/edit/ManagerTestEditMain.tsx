import { useState } from "react";
import EditTestQuestions from "./components/EditTestQuestions";
import { Snackbar, Alert } from "@mui/material";
import TestFieldsEditForm from "./components/TestFieldsEditForm";

type Tab = "detail" | "questions";

// TODO: handle error and loading states properly
export default function ManagerTestEditMain() {
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

	return (
		<div className="w-full flex-1 flex flex-col mt-16 text-center">
			<div className="">
				<div className="text-3xl font-bold">Edit your test</div>
				<div className="text-xl font-semibold pb-10">Edit some information for your test</div>
			</div>

			<div className="flex flex-row justify-center items-center space-x-4 mb-6">
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
			</div>

			<div className="w-full flex-1 flex flex-col items-center">
				{tab === "detail" && <TestFieldsEditForm />}
				{tab === "questions" && <EditTestQuestions />}
			</div>

			<Snackbar
				open={snackOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackSeverity}>
					{snackMessage}
				</Alert>
			</Snackbar>
		</div>
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