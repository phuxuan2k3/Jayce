import { GetManagerTestsApiArg } from "../api/test.api-gen";

export type FilterProps = Omit<GetManagerTestsApiArg, "x-user-id">;
