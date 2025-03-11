import { TextField, InputAdornment } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { GetTestsApiArg } from "../../api/test.api-gen";

type Props = {
	setFilters: React.Dispatch<React.SetStateAction<GetTestsApiArg>>;
}

export default function Header({ setFilters }: Props) {
	const handleApplySearchInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setFilters((prev) => ({
			...prev,
			searchName: e.target.value
		}));
	};

	return (
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
				Review this list of #number of tests# interview questions and answers verified by hiring managers and candidates.
			</span>
		</header>
	)
}
