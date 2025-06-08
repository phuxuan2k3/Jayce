import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export type FetchStateQuery<T = any> = {
	isLoading: boolean;
	error?: FetchBaseQueryError | SerializedError | null;
	data?: T;
}

export type FetchStateMutate<T = any> = {
	isLoading: boolean;
	isSuccess: boolean;
	error?: FetchBaseQueryError | SerializedError | null;
	data?: T;
}

