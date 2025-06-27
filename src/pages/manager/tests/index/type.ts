import { QuerySortValues } from "../../../../infra-test/types/query";

export type Filter = {
	page: number;
	perPage: number;
	searchTitle?: string;
	sortCreatedAt?: QuerySortValues;
	sortTitle?: QuerySortValues;
}