export type Paged<T> = {
    data: T[];
    page: number;
    totalPage: number;
    perPage: number;
}