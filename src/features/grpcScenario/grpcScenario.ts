import { ekko } from './api/ekko';
import * as empty from './google/protobuf/empty';
import { Metadata } from 'grpc-web';
import { backendEndpoint } from "../../app/env"
import store, { RootState } from "../../app/redux/store";
import { useSelector } from 'react-redux';

const Empty = empty.google.protobuf.Empty;

const client = new ekko.EkkoClient(backendEndpoint);
const clientChrono = new ekko.ChronobreakClient(backendEndpoint);

export const grpcListScenario = (
	bm_ids: number[],
	pageIndex: number = 0,
	pageSize: number = 10,
	search_content?: string,
	is_favorite?: boolean,
	is_finished?: boolean
): Promise<ekko.ListScenarioResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.ListScenarioRequest();
		request.page_index = pageIndex;
		request.page_size = pageSize;
		if (search_content !== undefined) request.search_content = search_content;
		if (is_favorite !== undefined) request.is_favorite = is_favorite;
		if (is_finished !== undefined) request.is_finished = is_finished;
		const state = store.getState();
		const token = state.auth.tokens;
		request.bm_ids = [token?.user_id || 0];

		const metadata: Metadata = { Authorization: `Bearer ${token?.access_token}` };
		console.log('list scenario', token)
		client.ListScenario(request, metadata, (err, response) => {
			if (err) reject(err);
			else resolve(response);
		});
	});
};
export const grpcCreateScenario = (
	name: string,
	description: string,
	field_ids: number[],
	questions: ekko.ScenarioQuestion[]
): Promise<ekko.CreateScenarioResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.CreateScenarioRequest();
		request.name = name;
		request.description = description;
		request.field_ids = field_ids;
		request.questions = questions;
		const state = store.getState();
		const token = state.auth.tokens;
		// request.bm_ids = [token?.user_id||0];

		const metadata: Metadata = { Authorization: `Bearer ${token?.access_token}` };
		console.log('create scenario', token)
		client.CreateScenario(request, metadata, (err: Error | null, response: ekko.CreateScenarioResponse) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};
export const grpcUpdateScenario = (
	id: number,
	name: string,
	description: string,
	fields: ekko.Field[],
	questions: ekko.ScenarioQuestion[]
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.UpdateScenarioRequest();
		request.id = id;
		request.name = name;
		request.description = description;
		request.fields = fields;
		request.questions = questions;
		client.UpdateScenario(request, null, (err: Error | null, response: Emty) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
export const grpcDeleteScenario = (ids: number[]): Promise<void> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.DeleteScenarioRequest();
		request.ids = ids;
		client.DeleteScenario(request, null, (err: Error | null, response: empty.google.protobuf.Empty) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
export const grpcFavoriteScenario = (id: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.FavoriteScenarioRequest();
		request.id = id;
		client.FavoriteScenario(request, null, (err: Error | null, response: empty.google.protobuf.Empty) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
export const grpcListAttempt = (
	scenario_id: number,
	page_index: number = 0,
	page_size: number = 10,
	sort_method?: ekko.SortMethod[]
): Promise<ekko.ListAttemptResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.ListAttemptRequest();
		request.scenario_id = scenario_id;
		request.page_index = page_index;
		request.page_size = page_size;
		if (sort_method) {
			request.sort_method = sort_method;
		}
		client.ListAttempt(request, null, (err: Error | null, response: ekko.ListAttemptResponse) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};

export const grpcGetAttempt = (id: number): Promise<ekko.GetAttemptResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.GetAttemptRequest();
		request.id = id;
		client.GetAttempt(request, null, (err: Error | null, response: ekko.GetAttemptResponse) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};
export const grpcSubmitAnswer = (
	scenario_id: number,
	answers: { question_id: number; answer: string }[]
): Promise<ekko.SubmitAnswerResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.SubmitAnswerRequest();
		request.scenario_id = scenario_id;
		request.answers = answers.map(item => {
			const submitted = new ekko.SubmitAnswerRequest.SubmittedAnswer();
			submitted.question_id = item.question_id;
			submitted.answer = item.answer;
			return submitted;
		});
		client.SubmitAnswer(request, null, (err: Error | null, response: ekko.SubmitAnswerResponse) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};
export const grpcListAllSubmission = (
	scenario_id: number,
	page_index: number = 0,
	page_size: number = 10,
	sort_method?: ekko.SortMethod[]
): Promise<ekko.ListAllSubmissionResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.ListAllSubmissionRequest();
		request.scenario_id = scenario_id;
		request.page_index = page_index;
		request.page_size = page_size;
		if (sort_method) {
			request.sort_method = sort_method;
		}
		client.ListAllSubmission(request, null, (err: Error | null, response: ekko.ListAllSubmissionResponse) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};

export const grpcListField = (
	ids: number[],
	page_index: number = 0,
	page_size: number = 10,
	search_content?: string,
): Promise<ekko.ListFieldResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.ListFieldRequest();
		request.ids = ids;
		request.page_index = page_index;
		request.page_size = page_size;
		if (search_content !== undefined) {
			request.search_content = search_content;
		}
		clientChrono.ListField(
			request,
			null,
			(err: Error | null, response: ekko.ListFieldResponse) => {
				if (err) reject(err);
				else resolve(response);
			}
		);
	});
};

export const grpcChronoListScenario = (
	bm_ids: number[],
	page_index: number = 0,
	page_size: number = 10,
	search_content?: string,
	is_favorite?: boolean,
	is_finished?: boolean,
	sort_methods?: ekko.SortMethod[],
): Promise<ekko.ListScenarioResponse> => {
	return new Promise((resolve, reject) => {
		const request = new ekko.ListScenarioRequest();
		request.bm_ids = bm_ids;
		request.page_index = page_index;
		request.page_size = page_size;
		if (search_content !== undefined) request.search_content = search_content;
		if (is_favorite !== undefined) request.is_favorite = is_favorite;
		if (is_finished !== undefined) request.is_finished = is_finished;
		if (sort_methods !== undefined) request.sort_methods = sort_methods;
		console.log('chrono')
		clientChrono.ListScenario(
			request,
			null,
			(err: Error | null, response: ekko.ListScenarioResponse) => {
				if (err) reject(err);
				else resolve(response);
			}
		);
	});
};
