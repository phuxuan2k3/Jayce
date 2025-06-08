import { ReactNode } from "react"
import Alert from '@mui/material/Alert';
import React from "react";
import { parseQueryError } from "../../helpers/fetchBaseQuery.error";
import SkeletonLoading from "../ui/loading/SkeletonLoading";
import { FetchStateQuery } from "../../app/types";

// Type for components that can receive an error message
type ErrorComponent = React.ComponentType<{ message: string }>;

type Props<T> = {
	queryState: FetchStateQuery<T>;
	children?: ReactNode;
	childrenFactory?: (data: T) => ReactNode;
	loadingNode?: ReactNode;
	errorNode?: ErrorComponent | ReactNode;
}

export default function FetchStateCover<T>({
	queryState,
	children,
	childrenFactory,
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
	if (queryState.data == null) {
		return null;
	}
	if (childrenFactory) {
		return childrenFactory(queryState.data);
	}
	return children;
}