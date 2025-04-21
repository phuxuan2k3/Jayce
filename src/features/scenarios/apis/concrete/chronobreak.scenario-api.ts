import chronobreakApi from "../base/chronobreak.api";
import {
	ListFieldRequest, ListFieldResponse,
	ListScenarioRequest, ListScenarioResponse,
	GetScenarioRequest, GetScenarioResponse
} from "../../types";

const chronobreakAPI = chronobreakApi.injectEndpoints({
	endpoints: (builder) => ({
		listField: builder.mutation<ListFieldResponse, ListFieldRequest>({
			query: (body) => ({
				url: '/field/list',
				method: 'POST',
				body,
			}),
		}),
		listScenario: builder.mutation<ListScenarioResponse, ListScenarioRequest>({
			query: (body) => ({
				url: '/scenario/noauth/list',
				method: 'POST',
				body,
			}),
		}),
		getScenario: builder.mutation<GetScenarioResponse, GetScenarioRequest>({
			query: (body) => ({
				url: '/scenario',
				method: 'POST',
				body,
			}),
		}),
		getRandomScenario: builder.query<GetScenarioResponse, void>({
			query: () => ({
				url: '/scenario/random',
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: true,
});

export const {
	useListFieldMutation,
	useListScenarioMutation,
	useGetScenarioMutation,
	useGetRandomScenarioQuery,
} = chronobreakAPI;