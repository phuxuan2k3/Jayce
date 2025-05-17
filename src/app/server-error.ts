import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { parseQueryError } from "../helpers/fetchBaseQuery.error";

export class FetchError extends Error {
	constructor(error: FetchBaseQueryError | SerializedError | unknown) {
		super(parseQueryError(error) || "An unknown error occurred");
		this.name = "FetchError";
	}
}