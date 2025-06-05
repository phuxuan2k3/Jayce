import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export type FetchState<T = any> = {
	isLoading: boolean;
	error?: FetchBaseQueryError | SerializedError | null;
	data?: T;
}