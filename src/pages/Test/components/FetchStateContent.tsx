import { ReactNode } from "react"
import { toErrorMessage } from "../../../helpers/fetchBaseQuery.error";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

type FetchStateContentProps = {
	children: ReactNode;
	isLoading: boolean;
	error?: unknown;
	skeletonHeight?: number;
	skeletonAmount?: number;
}

export default function FetchStateContent({ children, isLoading, error, skeletonHeight, skeletonAmount }: FetchStateContentProps,) {
	if (isLoading) {
		return (
			<>
				<Stack spacing={1}>
					{Array.from({ length: skeletonAmount || 1 }).map((_, index) => (
						<Skeleton key={index} variant="rounded" height={skeletonHeight || 120} />
					))}
				</Stack>
			</>
		);
	}
	if (error) {
		return (
			<Alert severity="error">{toErrorMessage(error)}</Alert>
		);
	}
	return children;
}