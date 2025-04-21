import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export enum SortType {
  SORT_TYPE_UNKNOWN = 0,
  SORT_TYPE_ASC = 1,
  SORT_TYPE_DESC = 2,
}

export interface SortMethod {
  name: string;
  type: SortType;
}

export enum SubmissionStatus {
  SUBMISSION_STATUS_UNKNOWN = 0,
  SUBMISSION_STATUS_IN_PROGRESS = 1,
  SUBMISSION_STATUS_FAILED = 2,
  SUBMISSION_STATUS_SUCCESS = 3,
}

export enum PublicationStatus {
  PUBLICATION_STATUS_UNKNOWN = 0,
  PUBLICATION_STATUS_DRAFT = 1,
  PUBLICATION_STATUS_PUBLISHED = 2,
}

export interface BaseData {
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Answer {
  question_id: number;
  answer: string;
  relevance: number;
  clarity_completeness: number;
  accuracy: number;
  overall: number;
  status: SubmissionStatus;
  base_data: BaseData;
}

export interface Attempt {
  id: number;
  scenario_id: number;
  answers: Answer[];
  base_data: BaseData;
  attempt_number: number;
}

export interface Submission {
  id: number;
  scenario_id: number;
  candidate_id: number;
  attempts: Attempt[];
}

export interface Field {
  id: number;
  name: string;
  base_data: BaseData;
}

export interface Scenario {
  id: number;
  name: string;
  description: string;
  base_data: BaseData;
  rating: number;
  fields: Field[];
  total_participant: number;
  questions: Question[];
  total_question: number;
  owner_id: number;
}

export interface Question {
  id: number;
  criteria: string;
  hint: string;
  content: string;
  base_data: BaseData;
}

export interface ListAllSubmissionRequest {
  scenario_id: number;
  page_index: number;
  page_size: number;
  sort_method: SortMethod[];
  from?: string;
  to?: string;
  search_content: string;
}

export interface ListAllSubmissionResponse {
  submissions: Submission[];
  total_count: number;
  total_page: number;
  request: ListAllSubmissionRequest;
}

export interface ListAttemptRequest {
  scenario_id: number;
  page_index: number;
  page_size: number;
  sort_method: SortMethod[];
}

export interface ListAttemptResponse {
  attempts: Attempt[];
  total_count: number;
  total_page: number;
  request: ListAttemptRequest;
}

export interface GetAttemptRequest {
  id: number;
}

export interface SubmitAnswerRequest {
  scenario_id: number;
  answers: SubmittedAnswer[];
}

export interface SubmittedAnswer {
  question_id: number;
  answer: string;
}

export interface SubmitAnswerResponse {
  attempt: Attempt;
}

export interface GetAttemptResponse {
  attempt: Attempt;
}

export interface CreateFieldResponse {
  field: Field;
}

export interface CreateFieldRequest {
  name: string;
}

export interface UpdateFieldRequest {
  id: number;
  name: string;
}

export interface DeleteFieldRequest {
  ids: number[];
}

export interface ListFieldRequest {
  ids: number[];
  sort_methods: SortMethod[];
  page_index: number;
  page_size: number;
  search_content?: string;
}

export interface ListFieldResponse {
  fields: Field[];
  total_count: number;
  total_page: number;
  request: ListFieldRequest;
}

export interface CreateScenarioRequest {
  name: string;
  description: string;
  field_ids: number[];
  questions: ScenarioQuestion[];
}

export interface CreateScenarioResponse {
  scenario: Scenario;
}

export interface UpdateScenarioRequest {
  id: number;
  name: string;
  description: string;
  field_ids: number[];
  questions: ScenarioQuestion[];
}

export interface ScenarioQuestion {
  criteria: string;
  hint: string;
  content: string;
}

export interface DeleteScenarioRequest {
  ids: number[];
}

export interface ListScenarioRequest {
  bm_ids: number[];
  search_content?: string;
  sort_methods: SortMethod[];
  page_index: number;
  page_size: number;
  is_favorite?: boolean;
  is_finished?: boolean;
  field_ids: number[];
  from?: string;
  to?: string;
  min_rating: number;
  min_participant: number;
}

export interface ListScenarioResponse {
  scenario: Scenario[];
  total_count: number;
  total_page: number;
  request: ListScenarioRequest;
}

export interface GetScenarioRequest {
  id: number;
}

export interface GetScenarioResponse {
  scenario: Scenario;
}

export interface FavoriteScenarioRequest {
  id: number;
}

export interface RatingScenarioRequest {
  id: number;
  rating: number;
}