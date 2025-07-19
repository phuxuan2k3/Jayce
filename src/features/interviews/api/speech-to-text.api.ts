import { createApi } from "@reduxjs/toolkit/query/react";
import serviceBaseQueryWithReauth from "../../../app/serviceBaseQueryReAuth";
import { url } from "../../../app/env";

const speechToTextApi = createApi({
	reducerPath: 'speechToText',
	baseQuery: serviceBaseQueryWithReauth(url.tahmkench),
	endpoints: (builder) => ({
		transcribe: builder.mutation<{
			transcript: string;
		}, {
			audio: string;
			language: string;
		}>({
			query: (req) => ({
				url: '/transcribe',
				method: 'POST',
				body: req,
				// headers: {
				// 	'Content-Type': 'multipart/form-data',
				// },
			}),
		}),
	}),
});

export const {
	useTranscribeMutation
} = speechToTextApi;

export default speechToTextApi;
