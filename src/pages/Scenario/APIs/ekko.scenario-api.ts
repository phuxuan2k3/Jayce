import ekkoApi from "../../../features/Scenario/ekko.api";
import {
    CreateFieldRequest, CreateFieldResponse,
    UpdateFieldRequest, DeleteFieldRequest,
    CreateScenarioRequest, CreateScenarioResponse,
    UpdateScenarioRequest, DeleteScenarioRequest,
    ListScenarioRequest, ListScenarioResponse,
    FavoriteScenarioRequest,
    ListAttemptRequest, ListAttemptResponse,
    GetAttemptRequest, GetAttemptResponse,
    SubmitAnswerRequest, SubmitAnswerResponse,
    ListAllSubmissionRequest, ListAllSubmissionResponse,
    RatingScenarioRequest
} from "./types";

const ekkoAPI = ekkoApi.injectEndpoints({
    endpoints: (builder) => ({
        createField: builder.mutation<CreateFieldResponse, CreateFieldRequest>({
            query: (body) => ({
                url: '/field/create',
                method: 'POST',
                body
            })
        }),
        updateField: builder.mutation<void, UpdateFieldRequest>({
            query: (body) => ({
                url: '/field/update',
                method: 'POST',
                body
            })
        }),
        deleteField: builder.mutation<void, DeleteFieldRequest>({
            query: (body) => ({
                url: '/field/delete',
                method: 'POST',
                body
            })
        }),
        createScenario: builder.mutation<CreateScenarioResponse, CreateScenarioRequest>({
            query: (body) => ({
                url: '/scenario/create',
                method: 'POST',
                body
            })
        }),
        updateScenario: builder.mutation<void, UpdateScenarioRequest>({
            query: (body) => ({
                url: '/scenario/update',
                method: 'POST',
                body
            })
        }),
        deleteScenario: builder.mutation<void, DeleteScenarioRequest>({
            query: (body) => ({
                url: '/scenario/delete',
                method: 'POST',
                body
            })
        }),
        listScenario: builder.mutation<ListScenarioResponse, ListScenarioRequest>({
            query: (body) => ({
                url: '/scenario/list',
                method: 'POST',
                body
            })
        }),
        favoriteScenario: builder.mutation<void, FavoriteScenarioRequest>({
            query: (body) => ({
                url: '/scenario/favorite',
                method: 'POST',
                body
            })
        }),
        ratingScenario: builder.mutation<void, RatingScenarioRequest>({
            query: (body) => ({
                url: '/scenario/rating',
                method: 'POST',
                body
            })
        }),
        listAttempt: builder.mutation<ListAttemptResponse, ListAttemptRequest>({
            query: (body) => ({
                url: '/attempt/list',
                method: 'POST',
                body
            })
        }),
        getAttempt: builder.mutation<GetAttemptResponse, GetAttemptRequest>({
            query: (body) => ({
                url: '/attempt/get',
                method: 'POST',
                body
            })
        }),
        submitAnswer: builder.mutation<SubmitAnswerResponse, SubmitAnswerRequest>({
            query: (body) => ({
                url: '/submit',
                method: 'POST',
                body
            })
        }),
        listAllSubmission: builder.mutation<ListAllSubmissionResponse, ListAllSubmissionRequest>({
            query: (body) => ({
                url: '/submission/list',
                method: 'POST',
                body
            })
        })
    }),
    overrideExisting: true,
});

export const {
    useCreateFieldMutation,
    useUpdateFieldMutation,
    useDeleteFieldMutation,
    useCreateScenarioMutation,
    useUpdateScenarioMutation,
    useDeleteScenarioMutation,
    useListScenarioMutation,
    useFavoriteScenarioMutation,
    useRatingScenarioMutation,
    useListAttemptMutation,
    useGetAttemptMutation,
    useSubmitAnswerMutation,
    useListAllSubmissionMutation
} = ekkoAPI;