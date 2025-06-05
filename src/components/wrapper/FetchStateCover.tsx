import { ReactNode } from "react"
import Alert from '@mui/material/Alert';
import React from "react";
import { parseQueryError } from "../../helpers/fetchBaseQuery.error";
import SkeletonLoading from "../ui/loading/SkeletonLoading";

type RTKQueryState<T> = {
	isLoading: boolean;
	error?: unknown;
	data?: T;
}

// Type for components that can receive an error message
type ErrorComponent = React.ComponentType<{ message: string }>;

type Props<T> = {
	queryState: RTKQueryState<T>;
	children: ReactNode;
	loadingNode?: ReactNode;
	errorNode?: ErrorComponent | ReactNode;
}

export default function FetchStateCover<T>({
	queryState,
	children,
	loadingNode,
	errorNode,
}: Props<T>) {
	const { isLoading, error } = queryState;
	const errorMessage = parseQueryError(error);
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full w-full">
				{loadingNode || (
					<SkeletonLoading />
				)}
			</div>
		);
	}
	if (errorMessage) {
		return <>
			{errorNode == null ?
				(
					<Alert severity="error">
						{errorMessage}
					</Alert>
				) : typeof errorNode === 'function' ?
					<div className="flex items-center justify-center h-full w-full">
						{React.createElement(errorNode, { message: errorMessage })}
					</div>
					: errorNode
			}
		</>;
	}
	return children;
}