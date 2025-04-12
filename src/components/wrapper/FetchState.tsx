import { ReactNode } from "react"
import Alert from '@mui/material/Alert';
import React from "react";
import { toErrorMessage } from "../../helpers/fetchBaseQuery.error";
import SkeletonLoading from "../ui/loading/SkeletonLoading";

// Type for components that can receive an error message
type ErrorComponent = React.ComponentType<{ message: string }>;

type Props = {
	children: ReactNode;
	isLoading: boolean;
	error?: unknown;
	loadingNode?: ReactNode;
	errorNode?: ErrorComponent | ReactNode;
}

export default function FetchState({ isLoading, error, children, loadingNode, errorNode }: Props) {
	const errorMessage = toErrorMessage(error);
	if (isLoading) {
		return <>
			{loadingNode || (
				<SkeletonLoading />
			)}
		</>
	}
	if (errorMessage) {
		return <>
			{errorNode == null ?
				<Alert severity="error">{errorMessage}</Alert> :
				typeof errorNode === 'function' ?
					<>
						{React.createElement(errorNode, { message: errorMessage })}
					</> :
					errorNode
			}
		</>;
	}
	return children;
}