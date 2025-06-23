import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type FetchState<T = any> = {
	isLoading: boolean;
	error?: FetchBaseQueryError | SerializedError;
	data?: T;
};

