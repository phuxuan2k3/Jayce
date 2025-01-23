import { CircularProgress, Typography } from "@mui/material";

export default function LocalLoading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-full">
			<CircularProgress sx={{ my: 1 }} color='primary' />
			<Typography variant='body1' color='textSecondary'>Loading...</Typography>
		</div>
	)
}
