import { GetManagerTestsApiArg } from "../legacy/test.api-gen";

export type FilterProps = Omit<GetManagerTestsApiArg, "x-user-id">;
